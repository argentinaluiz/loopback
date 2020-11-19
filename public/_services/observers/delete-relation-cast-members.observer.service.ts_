import {bind, BindingScope} from '@loopback/core';
import {ObserverInterface} from "./observer.interface";
import {repository} from "@loopback/repository";
import {CastMemberRepository} from "../../repositories";

@bind({scope: BindingScope.TRANSIENT})
export class DeleteRelationCastMembersObserver implements ObserverInterface{
    constructor(
        @repository(CastMemberRepository) public repo: CastMemberRepository
    ) {
    }

    async handle({where}, next) {
        await this.repo.removeRelation({relation: 'cast_members', ids: [where.id]});
        next();
    }


}
