import {Entity, model, property} from '@loopback/repository';
import {SmallCategory} from "./category.model";
import {SmallGenre} from "./genre.model";
import {SmallCastMember} from "./cast-member.model";

@model()
export class Video extends Entity {
  @property({
    id: true, generated: false
  })
  id: string;


  @property({
    type: 'string',
    required: true,
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
  })
  opened: boolean = false;

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
  })
  thumb_file_url: number;

  @property({
    type: 'string',
    required: false,
  })
  banner_file_url: number;

  @property({
    type: 'string',
    required: false,
  })
  trailer_file_url: number;

  @property({
    type: 'string',
    required: false,
  })
  video_file_url: number;


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

  @property.array({}, { required: false})
  categories: Array<SmallCategory>;

  @property.array({}, { required: false})
  genres: Array<SmallGenre>;

  @property.array({}, { required: false})
  cast_members: Array<SmallCastMember>;

  constructor(data?: Partial<Video>) {
    super(data);
  }
}

export interface VideoRelations {
  // describe navigational properties here
}

export type VideoWithRelations = Video & VideoRelations;
