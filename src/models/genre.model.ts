import {Entity, model, property} from '@loopback/repository';
import {SmallCategory} from "./category.model";

export interface SmallGenre {
  id: string;
  name: string;
  is_active: boolean;
}

@model()
export class Genre extends Entity {

  @property({
    id: true, generated: false
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'boolean',
    required: false,
  })
  is_active: boolean = true;

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

  constructor(data?: Partial<Genre>) {
    super(data);
  }
}

export interface GenreRelations {
  // describe navigational properties here
}

export type GenreWithRelations = Genre & GenreRelations;
