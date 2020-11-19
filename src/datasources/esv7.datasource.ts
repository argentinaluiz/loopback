import {
  inject,
  LifeCycleObserver,
  lifeCycleObserver,
  ValueOrPromise,
} from '@loopback/core';
import {Client} from 'es6';
import {juggler} from '@loopback/repository';
import baseEsv7Config from './base-esv7.config';

@lifeCycleObserver('datasource')
export class Esv7Datasource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'esv7';

  constructor(config = baseEsv7Config) {
    console.log(config);
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
