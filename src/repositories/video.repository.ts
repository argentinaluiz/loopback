import {Video, VideoRelations} from '../models';
import {inject} from '@loopback/core';
import {Esv7Datasource} from '../datasources';
import {BaseRepository} from './base.repository';
import {repository} from '@loopback/repository';
import {CategoryRepository} from './category.repository';

export class VideoRepository extends BaseRepository<
  Video,
  typeof Video.prototype.id,
  VideoRelations
> {
  constructor(
    @inject('datasources.esv7') dataSource: Esv7Datasource,
    @repository(CategoryRepository) public categoryRepo: CategoryRepository,
  ) {
    super(Video, dataSource);
    this.handleRelationsEvents();
  }

  private handleRelationsEvents() {
    //this.deleteById()
  }
}
