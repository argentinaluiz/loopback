import {FeaturedVideo, FeaturedVideoRelations} from '../models';
import {inject} from '@loopback/core';
import {Esv7Datasource} from '../datasources';
import {BaseRepository} from './base.repository';

export class FeaturedVideoRepository extends BaseRepository<
  FeaturedVideo,
  typeof FeaturedVideo.prototype.id,
  FeaturedVideoRelations
> {
  constructor(@inject('datasources.esv7') dataSource: Esv7Datasource) {
    super(FeaturedVideo, dataSource);
  }
}
