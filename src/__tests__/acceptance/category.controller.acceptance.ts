import '../../bootstrap';
import {Client, expect} from '@loopback/testlab';
import {LoopbackTestApplication} from '../..';
import {clearDb} from '../helpers/database.helpers';
import {setupApplication} from './test-helper';

describe('CategoryController', () => {
  let app: LoopbackTestApplication;
  let client: Client;
  beforeEach(clearDb);
  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes GET /categories', async () => {
    const res = await client.get('/categories').expect(200);
    expect(res.body).to.containDeep({
      results: [],
      count: 0,
    });
  });
});
