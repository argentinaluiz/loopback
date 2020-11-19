import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {param, get, getModelSchemaRef, RequestContext} from '@loopback/rest';
import {CastMember} from '../models';
import {CastMemberRepository} from '../repositories';

import {inject} from '@loopback/context';
import {getPaginationSchema} from '../schemas/pagination.schema';

const castMembersSchema = getPaginationSchema(CastMember);

export class CastMemberController {
  constructor(
    @repository(CastMemberRepository)
    public castMemberRepository: CastMemberRepository,
    @inject.context() public context: RequestContext,
  ) {}

  @get('/cast-members/count', {
    responses: {
      '200': {
        description: 'CastMember model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(CastMember) where?: Where<CastMember>,
  ): Promise<Count> {
    return this.castMemberRepository.count(where);
  }

  @get('/cast-members', {
    responses: {
      '200': {
        description: 'Array of CastMember model instances',
        content: {
          'application/json': {
            schema: castMembersSchema,
          },
        },
      },
    },
  })
  async find(
    @param.filter(CastMember) filter?: Filter<CastMember>,
  ): Promise<any> {
    return this.castMemberRepository.paginate(filter);
  }

  @get('/cast-members/{id}', {
    responses: {
      '200': {
        description: 'CastMember model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CastMember),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CastMember, {exclude: 'where'})
    filter?: FilterExcludingWhere<CastMember>,
  ): Promise<CastMember> {
    return this.castMemberRepository.findById(id, filter);
  }
}
