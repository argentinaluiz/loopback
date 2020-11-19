import {inject, Provider} from '@loopback/context';
import {Send, Response, OperationRetval, RequestContext} from '@loopback/rest';
import {Pagination} from '../utils/pagination';

/**
 * Provides the function for parsing args in requests at runtime.
 *
 * @returns The handler function that will parse request args.
 */
export class ApiResourceProvider implements Provider<Send> {
  constructor(@inject.context() public context: RequestContext) {}

  value() {
    // Use the lambda syntax to preserve the "this" scope for future calls!
    return (response: Response, result: OperationRetval) => {
      this.action(response, result);
    };
  }

  action(response: Response, result: OperationRetval) {
    if (result) {
      response.json(
        result instanceof Pagination ? result.toArray(this.context) : result,
      );
    }
    response.end();
  }
}
