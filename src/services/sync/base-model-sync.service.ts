import {omit, pick} from 'lodash';
import {BaseRepository} from '../../repositories/base.repository';
import {Message} from 'amqplib';
import {ValidatorService} from '../validator.service';
import {EntityNotFoundError} from '@loopback/repository';

export class BaseModelSyncService {
  constructor(public validateService: ValidatorService) {}

  async sync(repo: BaseRepository<any, any>, {data, message}) {
    const {id} = data;
    const action = this.getAction(message);
    const entity = await this.createEntity(data, repo);
    console.log(action, entity, message.fields.routingKey);

    switch (action) {
      case 'created':
        await this.validateService.validate({
          data: entity,
          entityClass: repo.entityClass,
        });
        await repo.create(entity);
        break;
      case 'updated':
        // eslint-disable-next-line no-case-declarations
        const exists = await repo.exists(id);
        if (exists) {
          await this.validateService.validate({
            data: entity,
            entityClass: repo.entityClass,
            options: {partial: true},
          });

          await repo.updateById(id, omit(entity, 'id'));
        } else {
          await this.validateService.validate({
            data: entity,
            entityClass: repo.entityClass,
          });
          await repo.create(entity);
        }

        break;
      case 'deleted':
        await repo.deleteById(id);
        break;
    }
  }

  async createEntity(data, repo) {
    return pick(data, Object.keys(repo.modelClass.definition.properties));
  }

  getModel(message: Message) {
    return message.fields.routingKey.split('.').slice(1)[0];
  }

  getAction(message: Message) {
    return message.fields.routingKey.split('.').slice(2)[0];
  }

  async syncRelation({relation, id, data, repo, repoRelation, message}) {
    console.log(relation, data, message.fields.routingKey);
    const fields = Object.keys(
      repo.modelClass.definition.properties[relation].jsonSchema.items
        .properties,
    );
    const collection = await repoRelation.find({
      where: {
        or: data.map((idRelation) => ({id: idRelation})),
      },
      fields,
    });

    if (!collection.length) {
      const error = new EntityNotFoundError(repoRelation.entityClass, data);
      error.name = 'EntityNotFound';
      throw error;
    }

    if (this.getAction(message) === 'synced') {
      await repo.updateById(id, {[relation]: collection});
    }

    if (this.getAction(message) === 'attached') {
      await repo.addMany(id, {relation, data: collection});
    }
  }
}
