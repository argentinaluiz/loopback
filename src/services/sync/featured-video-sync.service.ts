import {bind, BindingScope, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {FeaturedVideoRepository, VideoRepository} from '../../repositories';
import {BaseModelSyncService} from './base-model-sync.service';
import {rabbitmqSubscribe} from '../../decorators';
import {ResponseMessage} from '../../servers';
import {ValidatorService} from '../validator.service';

@bind({scope: BindingScope.SINGLETON})
export class FeaturedVideoSyncService extends BaseModelSyncService {
  constructor(
    @repository(FeaturedVideoRepository) public repo: FeaturedVideoRepository,
    @repository(VideoRepository) public videoRepo: FeaturedVideoRepository,
    @service(ValidatorService) public validateService: ValidatorService,
  ) {
    super(validateService);
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/featured_video',
    routingKey: 'model.featured_video.*',
  })
  async handler({data, message}: ResponseMessage) {
    await this.sync(this.repo, {
      data,
      message,
    });
  }

  async createEntity(data, repo) {
    const entity = await super.createEntity(data, repo);
    const video = await this.videoRepo.findById(data.video_id);
    entity.video = video.toJSON();
    return entity;
  }

  /*
   * Add service methods here
   */
}
