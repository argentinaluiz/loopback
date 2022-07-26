import {bind, /* inject, */ BindingScope, inject} from '@loopback/core';
import {validateRequestBody} from '@loopback/rest';
import {AppBindings} from '../keys';
//import {Category} from '../models';
import {getModelSchemaRef} from '@loopback/rest';
import {JsonSchemaOptions} from '@loopback/repository-json-schema';
import {RestBindings} from '@loopback/rest';
import {AjvFactory} from '@loopback/rest';

@bind({scope: BindingScope.SINGLETON})
export class ValidatorService {
  cache = new Map();

  constructor(
    // @inject(AppBindings.MODEL_SCHEMAS)
    // private modelSchemas
    @inject(RestBindings.AJV_FACTORY)
    private ajvFactory: AjvFactory,
  ) {}

  async validate<T extends object>({
    data,
    entityClass,
    options,
  }: {
    data;
    entityClass: Function & {prototype: T};
    options?: JsonSchemaOptions<T>;
  }) {
    const modelSchema = getModelSchemaRef(entityClass, options);
    if (!modelSchema) {
      const error = new Error('The parameter entityClass is not a entity');
      error.name = 'NotEntityClass';
      throw error;
    }
    const schemaRef = {$ref: modelSchema.$ref};
    const schemaName = Object.keys(modelSchema.definitions)[0];
    if (!this.cache.has(schemaName)) {
      console.log('ENTROU NO CACHE....');
      this.cache.set(schemaName, modelSchema.definitions[schemaName]);
    }
    const globalSchemas = {};
    this.cache.forEach((value, key) => {
      globalSchemas[key] = value;
    });

    await validateRequestBody(
      {value: data, schema: schemaRef, coercionRequired: true},
      {required: true, content: {}},
      globalSchemas,
      {ajvFactory: this.ajvFactory},
    );
  }

  /*
   * Add service methods here
   */
}
