import {
  //getModelRelations,
  JsonSchema,
  Model,
  WhereBuilder as LoopbackWhereBuilder,
} from '@loopback/repository';
import {getJsonSchema} from '@loopback/repository-json-schema';

export class WhereBuilder extends LoopbackWhereBuilder {
  isActive(modelCtor: typeof Model) {
    this.and({is_active: true});
    this.isActiveRelations(modelCtor);
    return this;
  }

  isActiveRelations(modelCtor: typeof Model) {
    const relations: string[] = Object.keys(modelCtor.definition.relations);
    if (relations.length) {
      return this;
    }
    const schema = getJsonSchema(modelCtor);

    const relationsFiltered = relations.filter((r) => {
      const jsonSchema = schema.properties?.[r] as JsonSchema;
      if (
        !jsonSchema ||
        (jsonSchema &&
          (jsonSchema as any).type !== 'array' &&
          (jsonSchema as any).type !== 'object')
      ) {
        return false;
      }

      const properties =
        (jsonSchema.items as any).properties || jsonSchema.properties;

      return Object.keys(properties).includes('is_active');
    });
    const whereStr = JSON.stringify(this.where);
    const regex = new RegExp(
      `(${relationsFiltered.map((r) => `${r}.*"`).join('|')})`,
      'g',
    );
    const matches = whereStr.match(regex);
    if (!matches) {
      return this;
    }
    const fields = matches.map((match) => {
      const relation = match.split('.')[0];
      return {[`${relation}.is_active`]: true};
    });
    this.and(fields);
    return this;
  }
}
