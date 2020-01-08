import {CastMember, CastMemberRelations} from '../models';
import {inject} from '@loopback/core';
import {Esv7Datasource} from "../datasources";
import {BaseRepository} from "./base.repository";

export class CastMemberRepository extends BaseRepository<
  CastMember,
  typeof CastMember.prototype.id,
  CastMemberRelations
> {
  constructor(
    @inject('datasources.esv7') dataSource: Esv7Datasource,
  ) {
    super(CastMember, dataSource);
  }
}
