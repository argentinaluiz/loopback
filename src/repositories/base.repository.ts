import {DefaultCrudRepository} from '@loopback/repository';
import {Entity} from "@loopback/repository/src/model";
import {Client} from 'es6';
import {merge} from 'lodash';

export abstract class BaseRepository<T extends Entity,
    ID,
    Relations extends object = {}> extends DefaultCrudRepository<T,
    ID,
    Relations> {
    async addMany(id, {relation, data}: { relation: string, data: Array<object> }) {
        const document = {
            index: this.dataSource.settings.index,
            refresh: true,
            body: {
                query: {
                    terms: {_id: [id]}
                },
                "script": {
                    "source": `
                        if ( !ctx._source.containsKey('${relation}') ) {
                            ctx._source['${relation}'] = [] 
                        } 
                        for(item in params['${relation}']){
                           if(ctx._source['${relation}'].find( i -> i.id == item.id ) == null ) {
                             ctx._source['${relation}'].add( item )
                           }
                        }
                    `,
                    "params": {
                        [relation]: data
                    }
                },
            },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const db: Client = (this.dataSource.connector as any).db;
        await db.update_by_query(document)
    }

    // async removeRelationFromOneDocument(id, {relation, ids}: { relation: string, ids: number[] }) {
    //     await this.removeRelation(
    //         { terms: {_id: [id]} },
    //         {relation, ids}
    //     )
    // }

    async removeRelation({relation, ids}: { relation: string, ids: number[] }, filter = null) {
        const query = merge({
            bool: {
                must: [
                    {
                        nested: {
                            path: relation,
                            query: {
                                exists: {
                                    field: relation
                                }
                            }
                        }
                    },
                ]
            }
        }, filter);
        const document = {
            index: this.dataSource.settings.index,
            refresh: true,
            body: {
                query: query,
                script: {
                    source: `
                        if (ctx._source.containsKey('${relation}')) { 
                            for(id in params['ids']){
                                ctx._source['${relation}'].removeIf(i -> i.id == id)
                            }
                        }
                    `,
                    params: {ids}
                },
            },
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const db: Client = (this.dataSource.connector as any).db;
        await db.update_by_query(document)
    }

    async searchIn(values, options) {
        const results = await this.modelClass['all']({
            where: {
                "or": values
            },
            ...options
        });
        return results;
    }

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
