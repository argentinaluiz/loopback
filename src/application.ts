import {BootMixin} from '@loopback/boot';
import {Application, ApplicationConfig} from '@loopback/core';
import {RestExplorerBindings} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {
  //getJsonSchema,
  //getModelSchemaRef,
  RestBindings,
  RestComponent,
  RestServer,
  //RestTags,
} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
//import {Ajv, ValidationError} from 'ajv';
import ValidatorsComponent from './components/validators.component';
import {
  RestExplorerComponent,
  ModelsComponent,
  RabbitmqComponent,
} from './components';
//import {ValidatorService} from './services';
//import {Category, Video} from './models';
import {ApiResourceProvider} from './providers/api-resource.provider';
//import {CrudRestComponent} from '@loopback/rest-crud';
//import {BaseRepository} from './repositories/base.repository';
//import {difference} from 'lodash';
//import {getModelRelations} from '@loopback/repository';
import {AuthenticationComponent} from '@loopback/authentication';
import {
  JWTAuthenticationComponent,
  SECURITY_SCHEME_SPEC,
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import { JWTService } from './services';

export class LoopbackTestApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(Application)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    options.rest.sequence = MySequence;
    this.component(RestComponent);
    const restServer = this.getSync<RestServer>('servers.RestServer');
    restServer.static('/', path.join(__dirname, '../public'));

    //Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    this.component(ModelsComponent);
    this.component(RabbitmqComponent);
    this.component(ValidatorsComponent);
    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(options.jwt.secret);
    this.bind(TokenServiceBindings.TOKEN_SERVICE).toClass(JWTService);
    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.bind(RestBindings.SequenceActions.SEND).toProvider(
      ApiResourceProvider,
    );
    // this.booters(RabbitmqBooter);

    //this.service(ModelsSyncService);
    //this.component(RabbitMQComponent);
    //this.component(CrudRestComponent);
  }

  /*async boot() {
        await super.boot();
        //@ts-ignore
        console.log(getJsonSchema(Video));
        //console.log(this.getSync('repositories.CategoryRepository').entityClass);

        // //console.log(this.find('*.*'));
        // // @ts-ignore
        // const validator = this.getSync('services.ValidatorService');
        // try {
        //     // @ts-ignore
        //     console.log(this.getSync('repositories.CategoryRepository').entityClass);
        //     // @ts-ignore
        //     await validator.validate({
        //         // @ts-ignore
        //         entityClass: this.getSync('repositories.CategoryRepository').entityClass,
        //         data: {
        //             name: ''
        //         },
        //     })
        // }catch (e){
        //     console.error(e);
        // }
        //  try {
        //      //    // @ts-ignore
        //      // await validator.validate({
        //      //     entityClass: Category,
        //      //     data: {
        //      //         name: ''
        //      //     },
        //      //     options: {partial: true}
        //      // })
        //  }catch (e) {
        //      console.error(e);
        //  }

    }*/
}
