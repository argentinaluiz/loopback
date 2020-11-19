import {getModelSchemaRef} from '@loopback/rest';
import {SchemaObject} from '@loopback/openapi-v3';

export function getPaginationSchema(entityClass): SchemaObject {
  return {
    type: 'object',
    title: `${entityClass.name}Collection`,
    properties: {
      count: {type: 'number'},
      next: {type: 'string', nullable: true},
      previous: {type: 'string', nullable: true},
      results: {
        type: 'array',
        items: getModelSchemaRef(entityClass),
      },
    },
  };
}
