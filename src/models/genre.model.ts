import {Entity, model, property} from '@loopback/repository';
import {SmallCategory} from './category.model';

export class SmallGenre {
  id: string;
  name: string;
  is_active: boolean;
}

@model()
export class Genre extends Entity {
  @property({
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 1,
      maxLength: 255,
    },
  })
  name: string;

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

  @property({
    type: 'object', //bug
    jsonSchema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            exists: ['Category', 'id'],
          },
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 255,
          },
          is_active: {
            type: 'boolean',
          },
        },
        required: ['id', 'name', 'is_active'],
      },
      uniqueItems: true,
    },
  })
  categories: Array<SmallCategory>;

  constructor(data?: Partial<Genre>) {
    super(data);
  }
}

export interface GenreRelations {
  // describe navigational properties here
}

export type GenreWithRelations = Genre & GenreRelations;
