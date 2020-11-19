import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {param, get, getModelSchemaRef, RequestContext} from '@loopback/rest';
import {FeaturedVideo} from '../models';
import {FeaturedVideoRepository} from '../repositories';

import {inject} from '@loopback/context';
import {getPaginationSchema} from '../schemas/pagination.schema';
//import {merge} from 'lodash';

const featuredVideosSchema = getPaginationSchema(FeaturedVideo);

export class FeaturedVideoController {
  constructor(
    @repository(FeaturedVideoRepository)
    public featuredVideoRepository: FeaturedVideoRepository,
    @inject.context() public context: RequestContext,
  ) {}

  @get('/featured-videos/count', {
    responses: {
      '200': {
        description: 'FeaturedVideo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(FeaturedVideo) where?: Where<FeaturedVideo>,
  ): Promise<Count> {
    const w = this.featuredVideoRepository.whereIsActive(where);
    return this.featuredVideoRepository.count(w);
  }

  @get('/featured-videos', {
    responses: {
      '200': {
        description: 'Array of FeaturedVideo model instances',
        content: {
          'application/json': {
            schema: featuredVideosSchema,
          },
        },
      },
    },
  })
  async find(
    @param.filter(FeaturedVideo) filter?: Filter<FeaturedVideo>,
  ): Promise<any> {
    const f = this.featuredVideoRepository.filterIsActive(filter);
    return this.featuredVideoRepository.paginate(f);
  }

  @get('/featured-videos/{id}', {
    responses: {
      '200': {
        description: 'FeaturedVideo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(FeaturedVideo),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(FeaturedVideo, {exclude: 'where'})
    filter?: FilterExcludingWhere<FeaturedVideo>,
  ): Promise<FeaturedVideo> {
    const f = this.featuredVideoRepository.filterIsActive(filter);
    return this.featuredVideoRepository.findById(id, f);
  }
}
