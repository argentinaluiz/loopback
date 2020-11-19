import {bind, BindingScope, service} from '@loopback/core';
import {
  //  EntityNotFoundError,
  repository,
} from '@loopback/repository';
import {CategoryRepository, GenreRepository} from '../../repositories';
//import {Category, SmallCategory} from '../../models';
import {BaseModelSyncService} from './base-model-sync.service';
import {rabbitmqSubscribe} from '../../decorators';
import {ResponseMessage} from '../../servers';
import {ValidatorService} from '../validator.service';

@bind({scope: BindingScope.SINGLETON})
export class GenreSyncService extends BaseModelSyncService {
  constructor(
    @repository(GenreRepository) public repo: GenreRepository,
    @repository(CategoryRepository) public categoryRepo: CategoryRepository,
    @service(ValidatorService) public validateService: ValidatorService,
  ) {
    super(validateService);
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/genre',
    routingKey: 'model.genre.*',
  })
  async handler({data, message}) {
    if (this.getModel(message) !== 'genre') {
      return;
    }
    await this.sync(this.repo, {data, message});
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/genre_categories',
    routingKey: 'model.genre_categories.*',
  })
  async handlerCategories({data, message}: ResponseMessage) {
    await this.syncRelation({
      relation: 'categories',
      id: data.id,
      data: data.relation_ids,
      repo: this.repo,
      repoRelation: this.categoryRepo,
      message,
    });
    // const categoriesFields = Object.keys(this.repo.modelClass.definition.properties.categories.jsonSchema.items.properties);
    // const categories = await this.categoryRepo.find(
    //     {
    //         where: {
    //             or: data.relation_ids.map(id => ({id})),
    //         },
    //         // @ts-ignore
    //         fields: categoriesFields,
    //     }
    // );
    //
    // if(!categories.length){
    //     const error = new EntityNotFoundError(Category, data.relation_ids)
    //     error.name = 'EntityNotFound'
    //     throw error;
    // }
    //
    // if (this.modelSync.getAction(message) === 'synced') {
    //     await this.repo.updateById(data.id, {categories})
    // }
    //
    // if (this.modelSync.getAction(message) === 'attached') {
    //     await this.repo.addMany(data.id, {relation: 'categories', data: categories})
    // }
  }
}
