import {inject, Provider} from '@loopback/context';
import {getJsonSchema} from '@loopback/repository-json-schema';
import {AppBindings} from '../keys';
/**
 * Provides the function for parsing args in requests at runtime.
 *
 * @returns The handler function that will parse request args.
 */
export class ModelSchemasProvider implements Provider<any> {
  constructor(
    @inject(AppBindings.MODELS)
    private models,
  ) {}

  value() {
    console.log(this.models, 'teste');

    return this.models.reduce((result, model) => {
      const schema = getJsonSchema(model);
      if (Object.keys(schema).length) {
        result[model.name] = getJsonSchema(model);
      }
      return result;
    }, {});
  }
}
