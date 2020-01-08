import {bind, BindingScope} from '@loopback/core';
import {ObserverInterface} from "./observer.interface";
import {repository} from "@loopback/repository";
import {GenreRepository} from "../../repositories";

@bind({scope: BindingScope.TRANSIENT})
export class DeleteRelationGenresObserver implements ObserverInterface{
    constructor(
        @repository(GenreRepository) public repo: GenreRepository
    ) {
    }

    async handle({where}, next) {
        await this.repo.removeRelation({relation: 'genres', ids: [where.id]});
        next();
    }


}
