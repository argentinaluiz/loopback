import {bind, BindingScope, inject, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CastMemberRepository} from '../../repositories';
import {BaseModelSyncService} from './base-model-sync.service';
import {rabbitmqSubscribe} from '../../decorators';
import {ResponseMessage} from '../../servers';
import {ValidatorService} from '../validator.service';

@bind({scope: BindingScope.SINGLETON})
export class CastMemberSyncService extends BaseModelSyncService {
  constructor(
    @repository(CastMemberRepository) public repo: CastMemberRepository,
    @service(ValidatorService) public validateService: ValidatorService,
  ) {
    super(validateService);
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/cast_member',
    routingKey: 'model.cast_member.*',
  })
  async handler({data, message}: ResponseMessage) {
    await this.sync(this.repo, {data, message});
  }

  /*
   * Add service methods here
   */
}
