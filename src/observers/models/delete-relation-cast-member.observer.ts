import {lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CastMemberRepository} from '../../repositories';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class DeleteRelationCastMemberObserver implements LifeCycleObserver {
  constructor(
    @repository(CastMemberRepository) public repo: CastMemberRepository,
  ) {}

  /**
   * This method will be invoked when the application starts
   */
  async start(): Promise<void> {
    this.repo.modelClass.observe('after delete', async ({where}, next) => {
      await this.repo.removeMany({
        relation: 'cast_members',
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
