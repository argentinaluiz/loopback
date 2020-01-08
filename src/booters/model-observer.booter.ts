import {CoreBindings} from '@loopback/core';
import {BaseArtifactBooter, BootBindings} from "@loopback/boot";
import {inject} from "@loopback/context";
import {ApplicationWithServices} from "@loopback/service-proxy";

export default class ModelObserverBooter extends BaseArtifactBooter {

    events = [
        {model: 'CategoryRepository', event: 'after delete', listener: 'DeleteRelationCategoriesObserver'},
        {model: 'GenreRepository', event: 'after delete', listener: 'DeleteRelationGenresObserver'},
        {model: 'CastMemberRepository', event: 'after delete', listener: 'DeleteRelationCastMembersObserver'},
    ];

    constructor(
        @inject(CoreBindings.APPLICATION_INSTANCE)
        public app: ApplicationWithServices,
        @inject(BootBindings.PROJECT_ROOT)
            projectRoot: string,
    ) {
        super(projectRoot, {});
    }


    async load() {
        await super.load();
        this.events.forEach( event => {
            const action  = this.app.getSync(`services.${event.listener}`) as any;
            const repository = this.app.getSync(`repositories.${event.model}`) as any;
            repository.modelClass.observe(
                event.event,
                (context, next) => {
                    action.handle(context, next)
                }
            )
        })
    }
}
