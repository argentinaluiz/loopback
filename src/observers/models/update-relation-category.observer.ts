import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  CategoryRepository,
  GenreRepository,
  VideoRepository,
} from '../../repositories';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class UpdateRelationCategoryObserver implements LifeCycleObserver {
  constructor(
    @repository(CategoryRepository) public repo: CategoryRepository,
    @repository(GenreRepository) public genreRepo: GenreRepository,
    @repository(VideoRepository) public videoRepo: VideoRepository,
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

        await this.genreRepo.updateMany({relation: 'categories', entity});
        await this.videoRepo.updateMany({relation: 'categories', entity});
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
