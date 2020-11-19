import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {param, get, getModelSchemaRef, RequestContext} from '@loopback/rest';
import {Genre} from '../models';
import {GenreRepository} from '../repositories';

import {inject} from '@loopback/context';
import {getPaginationSchema} from '../schemas/pagination.schema';

const genresSchema = getPaginationSchema(Genre);

export class GenreController {
  constructor(
    @repository(GenreRepository)
    public genreRepository: GenreRepository,
    @inject.context() public context: RequestContext,
  ) {}

  @get('/genres/count', {
    responses: {
      '200': {
        description: 'Genre model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Genre) where?: Where<Genre>): Promise<Count> {
    return this.genreRepository.count(where);
  }

  @get('/genres', {
    responses: {
      '200': {
        description: 'Array of Genre model instances',
        content: {
          'application/json': {
            schema: genresSchema,
          },
        },
      },
    },
  })
  async find(@param.filter(Genre) filter?: Filter<Genre>): Promise<any> {
    return this.genreRepository.paginate({
      where: {
        and: [{['categories.is_active' as any]: true}],
      },
    });
  }

  @get('/genres/{id}', {
    responses: {
      '200': {
        description: 'Genre model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Genre),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Genre, {exclude: 'where'})
    filter?: FilterExcludingWhere<Genre>,
  ): Promise<Genre> {
    return this.genreRepository.findById(id, filter);
  }
}
