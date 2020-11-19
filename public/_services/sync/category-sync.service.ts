import {bind, /* inject, */ BindingScope} from '@loopback/core';
import {ModelSyncInterface, SyncOptions} from './model-sync.interface';
import {repository} from '@loopback/repository';
import {CategoryRepository} from '../../../src/repositories';
import {BaseModelSyncService} from './base-model-sync.service';

@bind({scope: BindingScope.TRANSIENT})
export class CategorySyncService
  extends BaseModelSyncService
  implements ModelSyncInterface {
  constructor(@repository(CategoryRepository) public repo: CategoryRepository) {
    super();
  }

  async sync(options: SyncOptions) {
    await this.defaultSync(this.repo, options);
  }

  /*
   * Add service methods here
   */
}
