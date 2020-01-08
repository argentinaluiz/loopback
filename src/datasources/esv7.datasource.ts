import {LifeCycleObserver, lifeCycleObserver, ValueOrPromise} from '@loopback/core';
import config from './base-esv7.config';
import {juggler} from "@loopback/repository";

@lifeCycleObserver('datasource')
export class Esv7Datasource extends juggler.DataSource
    implements LifeCycleObserver {
    static dataSourceName = 'esv7';

    constructor() {
        super(config);
    }

    /**
     * Disconnect the datasource when application is stopped. This allows the
     * application to be shut down gracefully.
     */
    stop(): ValueOrPromise<void> {
        return super.disconnect();
    }
}

