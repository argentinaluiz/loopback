import {bind, BindingScope} from '@loopback/core';
import {ObserverInterface} from "./observer.interface";
import {repository} from "@loopback/repository";
import {CategoryRepository} from "../../repositories";

@bind({scope: BindingScope.TRANSIENT})
export class DeleteRelationCategoriesObserver implements ObserverInterface{
    constructor(
        @repository(CategoryRepository) public repo: CategoryRepository
    ) {
    }

    async handle({where}, next) {
        await this.repo.removeRelation({relation: 'categories', ids: [where.id]});
        next();
    }


}
