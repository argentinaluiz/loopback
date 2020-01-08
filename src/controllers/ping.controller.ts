import {Request, RestBindings, get, ResponseObject} from '@loopback/rest';
import {inject} from '@loopback/context';
import {Category, Video} from "../models";
import {repository} from "@loopback/repository";
import {CategoryRepository, VideoRepository} from "../repositories";
import {service} from "@loopback/core";
import {RootSyncService} from "../services";

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
    description: 'Ping Response',
    content: {
        'application/json': {
            schema: {
                type: 'object',
                properties: {
                    greeting: {type: 'string'},
                    date: {type: 'string'},
                    url: {type: 'string'},
                    headers: {
                        type: 'object',
                        properties: {
                            'Content-Type': {type: 'string'},
                        },
                        additionalProperties: true,
                    },
                },
            },
        },
    },
};

/**
 * A simple controller to bounce back http requests
 */
export class PingController {
    constructor(
        @inject(RestBindings.Http.REQUEST) private req: Request,
        @repository(VideoRepository) public repo: VideoRepository,
        @repository(CategoryRepository) public categoryRepo: CategoryRepository,
        @service(RootSyncService) public myService: RootSyncService
    ) {
    }

    // Map to `GET /ping`
    @get('/ping', {
        responses: {
            '200': PING_RESPONSE,
        },
    })
    async ping() {
        // await this.repo.create({id: 'video-1', title: 'video 1'});
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //console.log(this.repo.modelClass.definition.properties);
        //console.log(await this.categoryRepo.deleteById('teste'));
        // const observe = this.categoryRepo.modelClass as any;
        // observe.observe('after save', async function (...args) {
        //     console.log('after save',args);
        // })
        //
        // observe.observe('after delete', async function (...args) {
        //     console.log('after delete',args);
        // })
        // await this.categoryRepo.deleteById('category-10.8059114432349221');
        // await this.categoryRepo.updateById('category-1',{
        //     name: 'category 11111', 'created_at': '2010-10-10', 'updated_at': '2010-10-10'
        // });
        // await this.categoryRepo.create({
        //     id: 'category-1'+Math.random(), name: 'category 1', 'created_at': '2010-10-10', 'updated_at': '2010-10-10'
        // });
        // await this.categoryRepo.create({
        //     id: 'category-2', name: 'category 2', 'created_at': '2010-10-10', 'updated_at': '2010-10-10'
        // });
        // await this.myService.sync({
        //         action: 'synced',
        //         data: {
        //             id: 'video-1', 'relation_ids': ['category-1', 'category-2']
        //         },
        //         model: 'video_categories'
        //     }
        // )

        // await this.repo.modelClass['all']({
        //     fields: ['title'],
        //     where: {
        //         // "terms": {
        //         //     "_id": [ "0.4055179195192027" ]
        //         // }
        //         "or": [
        //             {"id": "0.4055179195192027"},
        //             {"id": "teste1"}
        //         ]
        //     }
        // })
        // await this.repo.create({
        //     id: Math.random() + "",
        //     title: 'teste',
        //     categories: [
        //         {name: 'teste'}
        //     ]
        // });
        // try {
        //     await this.repo.addMany(
        //         '0.21300750154247305',
        //         {
        //             relation: 'categories',
        //             data: [
        //                 {id: 4, name: 'teste'},
        //                 {id: 5, name: 'teste'},
        //                 {id: 6, name: 'teste'},
        //             ]
        //         }
        //     );
        // } catch (e) {
        //     console.log(e);
        // }
        // const result = await this.repo.find();
        // return result;
        // await this.repo.create({
        //   id: 'teste1',
        //   title: 'teste'
        // });
        // // Reply with a greeting, the current time, the url, and request headers
        // return {
        //   greeting: 'Hello from LoopBack',
        //   date: new Date(),
        //   url: this.req.url,
        //   headers: Object.assign({}, this.req.headers),
        // };
    }
}
