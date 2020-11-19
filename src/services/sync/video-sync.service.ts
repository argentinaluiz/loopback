import {bind, BindingScope, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  CastMemberRepository,
  CategoryRepository,
  GenreRepository,
  VideoRepository,
} from '../../repositories';
import {BaseModelSyncService} from './base-model-sync.service';
import {rabbitmqSubscribe} from '../../decorators';
import {ResponseMessage} from '../../servers';
import {ValidatorService} from '../validator.service';

@bind({scope: BindingScope.SINGLETON})
export class VideoSyncService extends BaseModelSyncService {
  constructor(
    @repository(VideoRepository) public repo: VideoRepository,
    @repository(CategoryRepository) public categoryRepo: CategoryRepository,
    @repository(GenreRepository) public genreRepo: GenreRepository,
    @repository(CastMemberRepository)
    public castMemberRepo: CastMemberRepository,
    @service(ValidatorService) public validateService: ValidatorService,
  ) {
    super(validateService);
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/video',
    routingKey: 'model.video.*',
  })
  async handler({data, message}: ResponseMessage) {
    await this.sync(this.repo, {data, message});
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/video_categories',
    routingKey: 'model.video_categories.*',
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
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/video_genres',
    routingKey: 'model.video_genres.*',
  })
  async handlerGenres({data, message}: ResponseMessage) {
    await this.syncRelation({
      relation: 'genres',
      id: data.id,
      data: data.relation_ids,
      repo: this.repo,
      repoRelation: this.genreRepo,
      message,
    });
  }

  @rabbitmqSubscribe({
    exchange: 'amq.topic',
    queue: 'micro-catalog/sync-videos/video_cast_members',
    routingKey: 'model.video_cast_members.*',
  })
  async handlerCastMembers({data, message}: ResponseMessage) {
    await this.syncRelation({
      relation: 'cast_members',
      id: data.id,
      data: data.relation_ids,
      repo: this.repo,
      repoRelation: this.castMemberRepo,
      message,
    });
  }
}
