import {bind, BindingScope, service} from '@loopback/core';
import {ModelSyncInterface, SyncOptions} from './model-sync.interface';
import {CategorySyncService} from './category-sync.service';
import {VideoSyncService} from './video/video-sync.service';
import {GenreSyncService} from './genre-sync.service';
import {CastMemberSyncService} from './cast-member-sync.service';

@bind({scope: BindingScope.TRANSIENT})
export class RootSyncService implements ModelSyncInterface {
  modelsMap = {
    category: 'categorySync',
    genre: 'genreSync',
    cast_member: 'castMemberSync',
    video: 'videoSync',
    video_categories: 'videoSync',
  };

  constructor(
    @service(CategorySyncService) public categorySync: CategorySyncService,
    @service(GenreSyncService) public genreSync: GenreSyncService,
    @service(CastMemberSyncService)
    public castMemberSync: CastMemberSyncService,
    @service(VideoSyncService) public videoSync: VideoSyncService,
  ) {}

  async sync(options: SyncOptions) {
    if (options.model in this.modelsMap) {
      const syncService: ModelSyncInterface = this[
        this.modelsMap[options.model]
      ];
      await syncService.sync(options);
    }
  }

  /*
   * Add service methods here
   */
}
