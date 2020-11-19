import {
  //  bind,
  Binding,
  Component,
  CoreBindings,
} from '@loopback/core';
import {RestTags} from '@loopback/rest';
import {ValidationError, KeywordDefinition} from 'ajv';
import {inject} from '@loopback/context';
import {ApplicationWithServices} from '@loopback/service-proxy';
import {difference} from 'lodash';
import {BaseRepository} from '../repositories/base.repository';
//import {ValidatorsProvider} from '../providers/validators.provider';

interface DefaultKeywordDefinition extends KeywordDefinition {
  name: string;
}

// @bind({
//     tags: RestTags.AJV_KEYWORD
// })
export default class ValidatorsComponent implements Component {
  bindings: Array<any> = [];

  // providers = {
  //     'teste11111': ValidatorsProvider
  // }

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    private app: ApplicationWithServices,
  ) {
    this.bindings = this.validators();
    console.log(this.bindings);
  }

  validators() {
    return [
      Binding.bind<DefaultKeywordDefinition>('ajv.keywords.exists')
        .to({
          name: 'exists',
          validate: async ([model, field], value) => {
            console.log('chegou aqui');
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
