import {Component} from '@loopback/core';
import {
  DeleteRelationCastMemberObserver,
  DeleteRelationCategoryObserver,
  DeleteRelationGenreObserver,
} from '../observers';
import ModelBooter from '../booters/model.booter';
import {ModelSchemasProvider} from '../providers/model-schemas.provider';
import {AppBindings} from '../keys';
import {UpdateRelationVideoObserver} from '../observers/models/update-relation-video.observer';
import {UpdateRelationCategoryObserver} from '../observers/models/update-relation-category.observer';

export class ModelsComponent implements Component {
  lifeCycleObservers = [
    DeleteRelationCategoryObserver,
    DeleteRelationGenreObserver,
    DeleteRelationCastMemberObserver,
    UpdateRelationCategoryObserver,
    UpdateRelationVideoObserver,
  ];

  booters = [ModelBooter];

  providers = {
    [AppBindings.MODEL_SCHEMAS.key]: ModelSchemasProvider,
  };
}
