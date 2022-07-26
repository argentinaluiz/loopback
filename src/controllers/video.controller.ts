import {
  Count,
  CountSchema,
  EntityNotFoundError,
  Filter,
  FilterBuilder,
  //FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {param, get, getModelSchemaRef, RequestContext} from '@loopback/rest';
import {Video} from '../models';
import {VideoRepository} from '../repositories';

import {inject} from '@loopback/context';
import {getPaginationSchema} from '../schemas/pagination.schema';
import {WhereBuilder} from '../utils/query';
const videoSchema = getPaginationSchema(Video);

export class VideoController {
  constructor(
    @repository(VideoRepository)
    public videoRepository: VideoRepository,
    @inject.context() public context: RequestContext,
  ) {}

  @get('/videos/count', {
    responses: {
      '200': {
        description: 'Video model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Video) where?: Where<Video>): Promise<Count> {
    const w = this.buildWhere(where);
    return this.videoRepository.count(w);
  }

  @get('/videos', {
    responses: {
      '200': {
        description: 'Array of Video model instances',
        content: {
          'application/json': {
            schema: videoSchema,
          },
        },
      },
    },
  })
  async find(@param.filter(Video) filter?: Filter<Video>): Promise<any> {
    const f = this.buildFilter(filter);
    // console.dir(filter, {depth: 5});
    // console.dir(f, {depth: 5});
    // process.exit(1);

    return this.videoRepository.paginate(f);
  }

  @get('/videos/{id}', {
    responses: {
      '200': {
        description: 'Video model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Video),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Video, {exclude: 'where'}) filter?: Filter<Video>,
  ): Promise<Video> {
    const f = this.buildFilter(filter);
    const obj = await this.videoRepository.findById(id, f);

    if (!obj) {
      throw new EntityNotFoundError(Video, id);
    }

    return obj;
  }

  buildFilter(filter?: Filter) {
    const {where, ...other} = filter ?? {};
    const w = this.buildWhere(where);
    return new FilterBuilder({...other, where: w}).build();
  }

  buildWhere(where?: Where) {
    return new WhereBuilder(where).isActive(Video).build();
  }
}
