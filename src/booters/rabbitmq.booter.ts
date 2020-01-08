import {BaseArtifactBooter} from "@loopback/boot";
import {inject} from "@loopback/context";
import {CoreBindings} from "@loopback/core";
import {ApplicationWithServices} from "@loopback/service-proxy";
import {BootBindings} from "@loopback/boot";
import RabbitmqComponent from "../components/rabbitmq.component";

export class RabbitmqBooter extends BaseArtifactBooter {
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
        this.app.component(RabbitmqComponent);
    }
}
