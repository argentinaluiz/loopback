import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {ModelSyncInterface, SyncOptions} from "./model-sync.interface";
import {repository} from "@loopback/repository";
import {CastMemberRepository} from "../../repositories";
import {BaseModelSyncService} from "./base-model-sync.service";

@bind({scope: BindingScope.TRANSIENT})
export class CastMemberSyncService extends BaseModelSyncService implements ModelSyncInterface {
    constructor(
        @repository(CastMemberRepository) public repo: CastMemberRepository
    ) {
        super();
    }

    async sync(options: SyncOptions) {
        await this.defaultSync(this.repo, options);
    }


    /*
     * Add service methods here
     */
}
