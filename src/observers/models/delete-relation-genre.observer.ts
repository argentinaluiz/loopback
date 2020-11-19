import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import {GenreRepository} from '../../repositories';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class DeleteRelationGenreObserver implements LifeCycleObserver {
  constructor(@repository(GenreRepository) public repo: GenreRepository) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    this.repo.modelClass.observe('after delete', async ({where}, next) => {
      await this.repo.removeMany({
        relation: 'genres',
        ids: [where.id],
      });
      return;
    });
  }

  /**
   * This method will be invoked when the application stops
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
