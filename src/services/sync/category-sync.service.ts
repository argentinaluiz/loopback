import {bind, BindingScope, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CategoryRepository} from '../../repositories';
import {BaseModelSyncService} from './base-model-sync.service';
import {rabbitmqSubscribe} from '../../decorators';
import {ResponseMessage} from '../../servers';
import {ValidatorService} from '../validator.service';

@bind({scope: BindingScope.SINGLETON})
export class CategorySyncService extends BaseModelSyncService {
  constructor(
    @repository(CategoryRepository) public repo: CategoryRepository,
    @service(ValidatorService) public validateService: ValidatorService,
  ) {
    super(validateService);
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/category',
    routingKey: 'model.category.*',
  })
  async handler({data, message}: ResponseMessage) {
    console.log(data);
    await this.sync(this.repo, {data, message});
  }
}
