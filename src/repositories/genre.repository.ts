import {Genre, GenreRelations} from '../models';
import {inject} from '@loopback/core';
import {Esv7Datasource} from '../datasources';
import {BaseRepository} from './base.repository';

export class GenreRepository extends BaseRepository<
  Genre,
  typeof Genre.prototype.id,
  GenreRelations
> {
  constructor(@inject('datasources.esv7') dataSource: Esv7Datasource) {
    super(Genre, dataSource);
  }
}
