import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {ModelSyncInterface, SyncOptions} from "../model-sync.interface";
import {repository} from "@loopback/repository";
import {CategoryRepository, VideoRepository} from "../../../repositories";
import {SmallCategory} from "../../../models";

@bind({scope: BindingScope.TRANSIENT})
export class VideoCategorySync implements ModelSyncInterface {
    constructor(
        @repository(VideoRepository) public repo: VideoRepository,
        @repository(CategoryRepository) public categoryRepo: CategoryRepository,
    ) {

    }

    async sync(options: SyncOptions) {
        const categoryKeys: SmallCategory = {id: '', name: '', is_active: true};
        const categories = await this.categoryRepo.searchIn(
            options.data.relation_ids.map(id => ({id})),
            {
                fields: Object.keys(categoryKeys),
            }
        );
        if (options.action === 'synced') {
            await this.repo.updateById(options.data.id, {categories})
        }

        if(options.action === 'attached'){
            await this.repo.addMany(options.data.id, {relation: 'categories', data: categories})
        }
    }
}
