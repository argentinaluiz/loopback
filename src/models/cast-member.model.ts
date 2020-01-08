import {Entity, model, property} from '@loopback/repository';

export interface SmallCastMember {
  id: string;
  name: string;
  type: number;
}

@model()
export class CastMember extends Entity {

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
    type: 'number',
    required: true,
  })
  type: number;

  @property({
    type: 'boolean',
    required: true,
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

  constructor(data?: Partial<CastMember>) {
    super(data);
  }
}

export interface CastMemberRelations {
  // describe navigational properties here
}

export type CastMemberWithRelations = CastMember & CastMemberRelations;
