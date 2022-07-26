import {
  Entity,
  hasMany,
  //hasOne,
  model,
  property,
} from '@loopback/repository';
import {SmallCategory} from './category.model';
import {SmallGenre} from './genre.model';
import {CastMember, CastMemberType, SmallCastMember} from './cast-member.model';

@model()
export class Video extends Entity {
  //static relations = ['categories', 'genres', 'cast_members'];

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
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  year_launched: number;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  opened: boolean;

  @property({
    type: 'string',
    required: true,
  })
  rating: string;

  @property({
    type: 'number',
    required: true,
  })
  duration: number;

  @property({
    type: 'string',
    required: false,
    default: null,
    jsonSchema: {
      nullable: true,
      maxLength: 255,
    },
  })
  thumb_file_url: string;

  @property({
    type: 'string',
    required: false,
    default: null,
    jsonSchema: {
      nullable: true,
      maxLength: 255,
    },
  })
  banner_file_url: string;

  @property({
    type: 'string',
    required: false,
    default: null,
    jsonSchema: {
      nullable: true,
      maxLength: 255,
    },
  })
  banner_half_file_url: string;

  @property({
    type: 'string',
    required: false,
    default: null,
    jsonSchema: {
      maxLength: 255,
    },
  })
  trailer_file_url: string;

  @property({
    type: 'string',
    required: false,
    default: null,
    jsonSchema: {
      nullable: true,
      maxLength: 255,
    },
  })
  video_file_url: string;

  @property({
    type: 'boolean',
    required: false,
    default: true,
  })
  is_active: boolean;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  is_upload_complete: boolean;

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

  @property({
    type: 'object', //bug
    jsonSchema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            exists: ['Genre', 'id'],
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
  genres: Array<SmallGenre>;

  @hasMany(() => CastMember)
  @property({
    type: 'object', //bug
    jsonSchema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            exists: ['CastMember', 'id'],
          },
          name: {
            type: 'string',
            minLength: 1,
            maxLength: 255,
          },
          type: {
            type: 'number',
            enum: [CastMemberType.DIRECTOR, CastMemberType.ACTOR],
          },
        },
        required: ['id', 'name', 'type'],
      },
      uniqueItems: true,
    },
  })
  cast_members: Array<SmallCastMember>;

  constructor(data?: Partial<Video>) {
    super(data);
  }
}

export interface VideoRelations {
  // describe navigational properties here
}

export type VideoWithRelations = Video & VideoRelations;
