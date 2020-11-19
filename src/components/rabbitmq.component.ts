import {Component} from '@loopback/core';
import {Constructor} from '@loopback/context';
import {Server} from '@loopback/core/src/server';
import {RabbitmqServer} from '../servers';

export class RabbitmqComponent implements Component {
  servers?: {
    [name: string]: Constructor<Server>;
  } = {
    RabbitmqServer,
  };
}
