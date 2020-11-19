import {
  DefaultCrudRepository,
  Where,
  //JsonSchema,
  //JsonSchemaWithExtensions,
  DataObject,
  DeepPartial,
} from '@loopback/repository';
import {Entity} from '@loopback/repository/src/model';
import {Client} from 'es6';
import {merge, pick} from 'lodash';
//import {stringify} from 'qs';
import {Filter} from '@loopback/repository/src/query';
import {Options} from '@loopback/repository/src/common-types';
import {Pagination} from '../utils/pagination';
import legacy from 'loopback-datasource-juggler';

export abstract class BaseRepository<
  T extends Entity,
  ID,
  Relations extends object = {}
> extends DefaultCrudRepository<T, ID, Relations> {
  async addMany(id, {relation, data}: {relation: string; data: Array<object>}) {
    const document = {
      index: this.dataSource.settings.index,
      refresh: true,
      body: {
        query: {
          terms: {_id: [id]},
        },
        script: {
          source: `
                        if ( !ctx._source.containsKey('${relation}') ) {
                            ctx._source['${relation}'] = []
                        }
                        for(item in params['${relation}']){
                           if(ctx._source['${relation}'].find( i -> i.id == item.id ) == null ) {
                             ctx._source['${relation}'].add( item )
                           }
                        }
                    `,
          params: {
            [relation]: data,
          },
        },
      },
    };
    const db: Client = (this.dataSource.connector as any).db;
    await db.update_by_query(document);
  }

  // async removeRelationFromOneDocument(id, {relation, ids}: { relation: string, ids: number[] }) {
  //     await this.removeRelation(
  //         { terms: {_id: [id]} },
  //         {relation, ids}
  //     )
  // }

  async updateMany(
    {relation, entity}: {relation: string; entity: any},
    filter = null,
  ) {
    const fields = Object.keys(
      this.modelClass.definition.properties[relation].jsonSchema.items
        .properties,
    );
    console.log(entity, fields);
    const data = pick(entity, fields);
    const query = merge(
      {
        bool: {
          must: [
            {
              nested: {
                path: relation,
                query: {
                  exists: {
                    field: relation,
                  },
                },
              },
            },
            {
              nested: {
                path: relation,
                query: {
                  term: {
                    [`${relation}.id`]: entity.id,
                  },
                },
              },
            },
          ],
        },
      },
      filter,
    );
    const document = {
      index: this.dataSource.settings.index,
      refresh: true,
      body: {
        query: query,
        script: {
          source: `
                       ctx._source['${relation}'].removeIf(i -> i.id == params['id']);
                       ctx._source['${relation}'].add(params['data'])
                    `,
          params: {id: entity.id, data},
        },
      },
    };
    const db: Client = (this.dataSource.connector as any).db;
    await db.update_by_query(document);
  }

  async removeMany(
    {relation, ids}: {relation: string; ids: number[]},
    filter = null,
  ) {
    const query = merge(
      {
        bool: {
          must: [
            {
              nested: {
                path: relation,
                query: {
                  exists: {
                    field: relation,
                  },
                },
              },
            },
            {
              nested: {
                path: relation,
                query: {
                  terms: {
                    [`${relation}.id`]: ids,
                  },
                },
              },
            },
          ],
        },
      },
      filter,
    );
    const document = {
      index: this.dataSource.settings.index,
      refresh: true,
      body: {
        query: query,
        script: {
          source: `
                        for(id in params['ids']){
                            ctx._source['${relation}'].removeIf(i -> i.id == id)
                        }
                    `,
          params: {ids},
        },
      },
    };
    const db: Client = (this.dataSource.connector as any).db;
    await db.update_by_query(document);
  }

  async paginate(
    filter?: Filter<T>,
    options?: Options,
  ): Promise<{count: number; results: (T & Relations)[]}> {
    const count = await this.count(filter?.where, options);
    const results = await this.find(filter, options);
    const defaultLimit = this.dataSource.settings.defaultSize;
    const limit = parseInt(filter?.limit ?? defaultLimit);
    const offset = parseInt(filter?.offset + '' ?? 0);
    return new Pagination({
      results,
      count: count.count,
      limit,
      offset,
    });
  }

  protected ensurePersistable<R extends T>(
    entity: R | DataObject<R>,
    options = {},
  ): legacy.ModelData<legacy.PersistedModel> {
    // FIXME(bajtos) Ideally, we should call toJSON() to convert R to data object
    // Unfortunately that breaks replaceById for MongoDB connector, where we
    // would call replaceId with id *argument* set to ObjectID value but
    // id *property* set to string value.
    /*
    const data: AnyObject =
      typeof entity.toJSON === 'function' ? entity.toJSON() : {...entity};
    */
    const data: DeepPartial<R> = new this.entityClass(entity);

    return data;
  }

  filterIsActive(filter?: Filter<T>): Filter<T> | undefined {
    if (!filter?.where) {
      return filter;
    }
    return merge(filter, {
      where: this.whereIsActive(filter.where),
    });
  }

  whereIsActive(where?: Where<T>): Where<T> | undefined {
    const hasIsActiveField = Object.keys(
      this.entityClass.definition.properties,
    ).includes('is_active');
    let newWhere = where;
    if (hasIsActiveField) {
      newWhere = merge(where, {
        and: [{is_active: true}],
      });
    }
    return merge(newWhere, this.whereRelationIsActive(where));
  }

  whereRelationIsActive(where?: Where<T>) {
    const relations: string[] = (this.entityClass as any).relations;
    if (!relations || !where) {
      return where;
    }
    const relationsFiltered = relations.filter((r) => {
      const jsonSchema = this.entityClass.definition.properties[r].jsonSchema;
      if (
        !jsonSchema ||
        (jsonSchema &&
          jsonSchema.type !== 'array' &&
          jsonSchema.type !== 'object')
      ) {
        return false;
      }

      const properties =
        (jsonSchema.items as any).properties || jsonSchema.properties;
      // jsonSchema.type === 'array'
      //   ? (jsonSchema?.items?.properties
      //   : jsonSchema.properties;

      return Object.keys(properties).includes('is_active');
    });
    const whereStr = JSON.stringify(where);
    const regex = new RegExp(
      `(${relationsFiltered.map((r) => `${r}.*"`).join('|')})`,
      'g',
    );
    const matches = whereStr.match(regex);
    if (!matches) {
      return where;
    }
    return matches.reduce((newWhere, match) => {
      const relation = match.split('.')[0];
      return merge(where, {
        and: [{[`${relation}.is_active`]: true}],
      });
    }, where);
  }

  // async searchIn(values, options) {
  //     const results = await this.modelClass['all']({
  //         where: {
  //             "or": values
  //         },
  //         ...options
  //     });
  //     return results;
  // }

  // async softDelete(id: string) {
  //     const esClient: Client = (this.dataSource.connector as any).db;
  //     await esClient.delete({
  //         index: this.dataSource.settings.index,
  //         id,
  //     } as any);
  //     const context = {
  //         Model: this.modelClass,
  //         where: {id},
  //     };
  //     return new Promise((resolve, reject) => {
  //         (this.modelClass as any).notifyObserversOf('after soft delete', context, function (err) {
  //             console.log(err);
  //             if (err) reject(err);
  //
  //             resolve();
  //         });
  //     })
  //
  // }
}
