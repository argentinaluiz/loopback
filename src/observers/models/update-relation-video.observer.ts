import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  //CategoryRepository,
  FeaturedVideoRepository,
  //GenreRepository,
  VideoRepository,
} from '../../repositories';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class UpdateRelationVideoObserver implements LifeCycleObserver {
  constructor(
    @repository(VideoRepository) public repo: VideoRepository,
    @repository(FeaturedVideoRepository)
    public featuredVideoRepo: FeaturedVideoRepository,
  ) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    this.repo.modelClass.observe(
      'after save',
      async ({where, data, isNewInstance, ...other}) => {
        if (isNewInstance) {
          return;
        }

        console.log(other, data);

        const entity = {id: where.id, ...data};

        await this.featuredVideoRepo.updateAll(
          {
            video: entity,
          },
          {
            and: [{['video.id' as any]: where.id}],
          },
        );
        return;
      },
    );
  }

  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
