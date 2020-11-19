import {
  inject,
  LifeCycleObserver,
  lifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {Client} from 'es6';
import {juggler} from '@loopback/repository';

@lifeCycleObserver('datasource')
export class Esv7Datasource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'esv7';

  constructor(
    @inject('datasources.config.base-esv7', {optional: true})
    config,
  ) {
    super(config);
  }

  /**
   * Disconnect the datasource when application is stopped. This allows the
   * application to be shut down gracefully.
   */
  stop(): ValueOrPromise<void> {
    return super.disconnect();
  }

  async deleteAllDocuments() {
    const connector = (this as any).adapter;
    const client: Client = (this as any).adapter.db;
    await client.deleteByQuery({
      index: connector.settings.index,
      body: {
        query: {
          match_all: {},
        },
      },
    });
  }
}
