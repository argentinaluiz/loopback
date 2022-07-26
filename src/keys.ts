import {CoreBindings} from '@loopback/core';
import {BindingKey} from '@loopback/context';
import {JsonSchema} from '@loopback/repository-json-schema';

export namespace AppBindings {
  export const MODELS = BindingKey.create<Array<any>>('models');
  export const MODEL_SCHEMAS = BindingKey.create<{[key: string]: JsonSchema}>(
    'model.schemas',
  );
}

export namespace RabbitmqBindings {
  export const CONFIG = CoreBindings.APPLICATION_CONFIG.deepProperty(
    'rabbitmq',
  );
}

export namespace JwtBindings {
  export const CONFIG = CoreBindings.APPLICATION_CONFIG.deepProperty<
    {secret: string, algorithms: string[]}
  >('jwt');
}
