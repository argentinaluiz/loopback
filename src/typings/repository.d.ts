import {JSONSchema7} from '@types/json-schema';
import {JsonSchema, JsonSchemaWithExtensions} from '@loopback/repository';
declare module '@types/json-schema' {
  export interface JSONSchema7 {
    exists?: string[];
  }
}

declare module '@loopback/repository' {
  export interface JsonSchemaWithExtensions extends JsonSchema {
    exists?: string[];
  }
}
