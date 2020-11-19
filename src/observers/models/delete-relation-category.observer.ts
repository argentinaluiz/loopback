import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CategoryRepository} from '../../repositories';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class DeleteRelationCategoryObserver implements LifeCycleObserver {
  constructor(
    @repository(CategoryRepository) public repo: CategoryRepository,
  ) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    this.repo.modelClass.observe('after delete', async ({where}) => {
      await this.repo.removeMany({
        relation: 'categories',
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
