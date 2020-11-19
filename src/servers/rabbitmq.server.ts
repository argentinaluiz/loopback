import {Context, inject} from '@loopback/context';
import {Application, CoreBindings, Server} from '@loopback/core';
import {Channel, ConfirmChannel, ConsumeMessage, Options} from 'amqplib';
import {
  AmqpConnectionManager,
  AmqpConnectionManagerOptions,
  ChannelWrapper,
  connect,
} from 'amqp-connection-manager';
import {MetadataInspector} from '@loopback/metadata';
import {
  RABBITMQ_SUBSCRIBE_DECORATOR,
  RabbitmqSubscribeMetadata,
} from '../decorators';
import {RabbitmqBindings} from '../keys';

export enum ResponseEnum {
  ACK,
  REQUEUE,
  NACK,
}

export interface RabbitmqConfig {
  uri: string;
  connOptions?: AmqpConnectionManagerOptions;
  exchanges?: {name: string; type: string; options?: Options.AssertExchange}[];
  defaultHandlerError?: ResponseEnum;
}

export interface ResponseMessage {
  data;
  message: ConsumeMessage;
  channel: ConfirmChannel;
}

export class RabbitmqServer extends Context implements Server {
  private _listening: boolean;
  private _conn: AmqpConnectionManager;
  private _channelManager: ChannelWrapper;

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) public app?: Application,
    @inject(RabbitmqBindings.CONFIG) public config?: RabbitmqConfig,
  ) {
    super(app);

    if (!this.config) {
      throw new Error('Rabbitmq config must be defined');
    }
  }

  async start(): Promise<void> {
    const {uri, connOptions} = this.config as RabbitmqConfig;
    this._conn = connect([uri], connOptions);
    this._channelManager = this.conn.createChannel();
    this.channelManager.on('connect', () =>
      console.log('Successfully connected a RabbitMQ channel'),
    );
    this.channelManager.on('error', (err, {name}) =>
      console.log(
        `Failed to setup a RabbitMQ channel - name: ${name} / error: ${err.message} ${err.stack}`,
      ),
    );
    await this.setupExchanges();
    await this.bindSubscribers();

    this._listening = true;
  }

  private async setupExchanges() {
    await this.channelManager.addSetup(async (channel) => {
      if (!this.config?.exchanges) {
        return;
      }
      await Promise.all(
        this.config.exchanges.map((x) =>
          channel.assertExchange(x.name, x.type, x.options),
        ),
      );
    });
  }

  private async bindSubscribers() {
    await Promise.all(
      this.getSubscribers().map(async (method) => {
        return this.channelManager.addSetup(async (channel) => {
          const {exchange, routingKey, queue, queueOptions} = method.metadata;
          const assertedQueue = await channel.assertQueue(
            queue ?? '',
            queueOptions ?? undefined,
          );
          const routingKeys = Array.isArray(routingKey)
            ? routingKey
            : [routingKey];

          await Promise.all(
            routingKeys.map((x) =>
              channel.bindQueue(assertedQueue.queue, exchange, x),
            ),
          );
          await this.consume({
            channel,
            method: method.method,
            queue: assertedQueue.queue,
          });
        });
      }),
    );
  }

  private getSubscribers(): {method; metadata: RabbitmqSubscribeMetadata}[] {
    const services = this.find('services.*');

    return services
      .map((binding) => {
        const metadata = MetadataInspector.getAllMethodMetadata<
          RabbitmqSubscribeMetadata
        >(RABBITMQ_SUBSCRIBE_DECORATOR, binding.valueConstructor!.prototype);
        if (!metadata) {
          return [];
        }
        const methods: {method; metadata: RabbitmqSubscribeMetadata}[] = [];
        for (const methodName in metadata) {
          const service = this.getSync(binding.key) as any;
          //service[methodName]({})
          methods.push({
            method: service[methodName].bind(service),
            metadata: metadata[methodName],
          });
        }
        return methods;
      })
      .reduce((collection: any, item: any) => {
        collection.push(...item);
        return collection;
      }, []);
  }

  private async consume({channel, method, queue}) {
    await channel.consume(queue, async (message) => {
      try {
        if (message == null) {
          throw new Error('Received null message');
        }
        let data: any = message.content;
        if (data) {
          try {
            data = JSON.parse(data.toString());
          } catch {
            data = undefined;
          }
          console.log(queue, data);
          const response = await method({data, message: message, channel});

          this.dispatchResponse(channel, message, response);
        }
      } catch (e) {
        console.error(e);
        if (!message) {
          return;
        }
        this.dispatchResponse(
          channel,
          message,
          this.config?.defaultHandlerError ?? ResponseEnum.NACK,
        );
      }
    });
  }

  private dispatchResponse(channel: Channel, message, response: ResponseEnum) {
    switch (response) {
      case ResponseEnum.ACK:
        channel.ack(message);
        break;
      case ResponseEnum.NACK:
        channel.nack(message, false, false);
        break;
      case ResponseEnum.REQUEUE:
        channel.nack(message, false, true);
        break;
      default:
        channel.ack(message);
        break;
    }
  }

  async stop(): Promise<void> {
    await this.conn.close();
    this._listening = false;
  }

  get listening(): boolean {
    return this._listening;
  }

  get conn(): AmqpConnectionManager {
    return this._conn;
  }

  get channelManager(): ChannelWrapper {
    return this._channelManager;
  }
}
