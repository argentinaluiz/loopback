import {Entity, model, property} from '@loopback/repository';
import {getJsonSchema} from '@loopback/repository-json-schema';
import {Video} from './video.model';

console.dir(getJsonSchema(Video), {depth: 7});

const schema = getJsonSchema(Video);

//console.log(schema);

const videoSchema = {
  ...schema,
  properties: {
    ...schema.properties,
    id: {
      ...(schema as any).properties.id,
      exists: ['Video', 'id'],
    },
  },
};

@model()
export class FeaturedVideo extends Entity {
  @property({
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'object',
    required: true,
    jsonSchema: videoSchema,
  })
  video: Video;

  @property({
    type: 'number',
    required: true,
  })
  order: number;

  @property({
    type: 'boolean',
    required: false,
    default: true,
  })
  is_active: boolean;

  @property({
    type: 'date',
    required: true,
  })
  created_at: string;

  @property({
    type: 'date',
    required: true,
  })
  updated_at: string;

  // @property({
  //   type: 'date',
  //   required: false,
  // })
  // deleted_at: string | null = null;

  constructor(data?: Partial<FeaturedVideo>) {
    super(data);
  }
}

export interface FeaturedVideoRelations {
  // describe navigational properties here
}

export type FeaturedVideoWithRelations = FeaturedVideo & FeaturedVideoRelations;
