import {Esv7Datasource} from '../../datasources';
import baseEsv7Config from '../../datasources/base-esv7.config';

export const testdb = new Esv7Datasource({
  ...baseEsv7Config,
  index: 'videos_test',
});

export async function clearDb() {
  await testdb.deleteAllDocuments();
}
