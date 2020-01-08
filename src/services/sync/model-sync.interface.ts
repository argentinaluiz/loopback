export interface SyncOptions {
    model: string;
    action: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

export interface ModelSyncInterface {
    sync(options: SyncOptions)
}
