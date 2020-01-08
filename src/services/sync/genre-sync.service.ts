import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {ModelSyncInterface, SyncOptions} from "./model-sync.interface";
import {repository} from "@loopback/repository";
import {CategoryRepository, GenreRepository} from "../../repositories";
import {SmallCategory} from "../../models";
import {BaseModelSyncService} from "./base-model-sync.service";

@bind({scope: BindingScope.TRANSIENT})
export class GenreSyncService extends BaseModelSyncService implements ModelSyncInterface {
    constructor(
        @repository(GenreRepository) public repo: GenreRepository,
        @repository(CategoryRepository) public categoryRepo: CategoryRepository
    ) {
        super();
    }

    async sync(options: SyncOptions) {
        if (options.model === 'genre') {
                await this.defaultSync(this.repo, options);
        } else {
            await this.syncRelations(options)
        }
    }

    private async syncRelations(options: SyncOptions) {
        if (options.model === 'genre_categories') {
            const categoryKeys: SmallCategory = {
                id: '',
                name: '',
                is_active: true
            };
            const categories = await this.categoryRepo.searchIn(
                options.data.relation_ids.map(id => ({id})),
                {
                    fields: Object.keys(categoryKeys),
                }
            );
            await this.repo.updateById(options.data.id, {categories})
        }
    }
}
