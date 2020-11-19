import {bind, inject, Provider} from '@loopback/context';
//import {getJsonSchema} from '@loopback/repository-json-schema';
//import {AppBindings} from '../keys';
import {Binding, CoreBindings} from '@loopback/core';
import {BaseRepository} from '../repositories/base.repository';
import {difference} from 'lodash';
import {RestTags} from '@loopback/rest';
import {ValidationError, KeywordDefinition} from 'ajv';
import {ApplicationWithServices} from '@loopback/service-proxy';

interface DefaultKeywordDefinition extends KeywordDefinition {
  name: string;
}

/**
 * Provides the function for parsing args in requests at runtime.
 *
 * @returns The handler function that will parse request args.
 */
@bind.provider({
  tags: [RestTags.AJV_KEYWORD],
})
export class ValidatorsProvider implements Provider<any> {
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private app: ApplicationWithServices,
  ) {}

  value() {
    console.log('asdfasdf');
    return [
      Binding.bind<DefaultKeywordDefinition>('ajv.keywords.exists')
        .to({
          name: 'exists',
          validate: async ([model, field], value) => {
            const values = Array.isArray(value) ? value : [value];
            const repository: BaseRepository<any, any> = this.app.getSync(
              `repositories.${model}Repository`,
            );
            //console.log(values, field, model);
            const rows = await repository.find({
              where: {
                or: values.map((v) => ({[field]: v})),
              },
              fields: [field] as any,
            });
            if (rows.length !== values.length) {
              const valuesNotExist = difference(
                values,
                rows.map((c) => c[field]),
              );
              const errors = valuesNotExist.map((v) => ({
                message: `The value ${v} for ${model} not exists`,
              }));
              throw new ValidationError(errors as any);
            }
            return true;
          },
          async: true,
        })
        .tag(RestTags.AJV_KEYWORD),
    ];
  }
}
