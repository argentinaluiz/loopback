import {Category, CategoryRelations} from '../models';
import {inject} from '@loopback/core';
import {Esv7Datasource} from '../datasources';
import {BaseRepository} from './base.repository';

export class CategoryRepository extends BaseRepository<
  Category,
  typeof Category.prototype.id,
  CategoryRelations
> {
  constructor(@inject('datasources.esv7') dataSource: Esv7Datasource) {
    super(Category, dataSource);
  }
}
