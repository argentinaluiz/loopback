import {LoopbackTestApplication} from '../..';
import {
  //createRestAppClient,
  givenHttpServerConfig,
  Client,
} from '@loopback/testlab';
import supertest from 'supertest';
import config from '../../../config';
import {RestBindings} from '@loopback/rest';
import {testdb} from '../helpers/database.helpers';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    port: 9000,
  });
  /*console.log(restConfig);
  process.exit(0);*/

  const app = new LoopbackTestApplication({
    ...config,
    rest: restConfig,
  });
  /*console.log(app.getSync(RestBindings.SERVER).rootUrl, 'asdfasdfsadf');
  process.exit(0);*/
  await app.boot();
  await app.start();

  app.bind('datasources.esv7').to(testdb);

  const client = supertest('http://127.0.0.1:9000');

  return {app, client};
}

export interface AppWithClient {
  app: LoopbackTestApplication;
  client: Client;
}
