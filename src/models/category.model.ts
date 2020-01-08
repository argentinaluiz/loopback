import {Entity, model, property} from '@loopback/repository';

export interface SmallCategory {
  id: string;
  name: string;
  is_active: boolean;
}

@model()
export class Category extends Entity {

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

  constructor(data?: Partial<Category>) {
    super(data);
  }
}

export interface CategoryRelations {
  // describe navigational properties here
}

export type CategoryWithRelations = Category & CategoryRelations;
