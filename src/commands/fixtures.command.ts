import {LoopbackTestApplication} from '../application';
import {Esv7Datasource} from '../datasources';
import {ValidatorService} from '../services';
import fixtures from '../fixtures';
import * as config from '../../config';
import {BaseRepository} from '../repositories/base.repository';
import {default as chalk} from 'chalk';

export class FixturesCommand {
  static command = 'fixtures';
  static description = 'Fixtures data in database';

  app: LoopbackTestApplication;

  constructor() {}

  async run() {
    console.log(chalk.green('Fixture data'));
    await this.bootApp();
    console.log(chalk.green('Delete all documents'));
    await this.deleteAllDocuments();
    const validator: ValidatorService = this.app.getSync(
      'services.ValidatorService',
    );

    for (const fixture of fixtures) {
      const repository = this.getRepository(fixture.model) as BaseRepository<
        any,
        any
      >;
      await validator.validate({
        data: fixture.fields,
        entityClass: repository.entityClass,
      });
      await repository.create(fixture.fields);
    }

    console.log(chalk.green('Documents generated'));
  }

  async bootApp() {
    this.app = new LoopbackTestApplication(config);
    await this.app.boot();
  }

  async deleteAllDocuments() {
    const datasource: Esv7Datasource = this.app.getSync('datasources.esv7');
    await datasource.deleteAllDocuments();
  }

  getRepository<T>(name): T {
    return this.app.getSync(`repositories.${name}Repository`);
  }
}
