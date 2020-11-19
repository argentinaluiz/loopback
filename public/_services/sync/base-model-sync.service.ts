import {SyncOptions} from './model-sync.interface';
import {omit, pick} from 'lodash';

export abstract class BaseModelSyncService {
  async defaultSync(repo, options: SyncOptions) {
    const {id} = options.data;
    const data = pick(
      options.data,
      Object.keys(repo.modelClass.definition.properties),
    );
    switch (options.action) {
      case 'created':
        await repo.create(data);
        break;
      case 'updated':
        await repo.updateById(id, omit(data, 'id'));
        break;
      case 'deleted':
        await repo.deleteById(id);
        break;
    }
  }
}
