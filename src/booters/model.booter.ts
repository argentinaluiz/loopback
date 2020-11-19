import {CoreBindings} from '@loopback/core';
import {BaseArtifactBooter, BootBindings} from '@loopback/boot';
import {inject} from '@loopback/context';
import {ApplicationWithServices} from '@loopback/service-proxy';
import {AppBindings} from '../keys';

export default class ModelBooter extends BaseArtifactBooter {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    public app: ApplicationWithServices,
    @inject(BootBindings.PROJECT_ROOT)
    projectRoot: string,
  ) {
    super(projectRoot, {
      dirs: ['models'],
      extensions: ['.model.js'],
      nested: true,
    });
  }

  async load() {
    await super.load();
    console.log(AppBindings.MODELS.key);
    this.app.bind(AppBindings.MODELS.key).to(this.classes);
  }
}
