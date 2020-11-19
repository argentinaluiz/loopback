import {stringify} from 'qs';
import {classToPlain, Exclude, Expose} from 'class-transformer';
import {RequestContext} from '@loopback/rest';

export class Pagination<T = any> {
  results: T[];

  count: number;

  limit: number;

  offset: number;

  @Exclude()
  baseUrl: string;

  constructor({
    results,
    count,
    limit,
    offset,
  }: {
    results;
    count;
    limit;
    offset?;
  }) {
    this.results = results;
    this.count = count;
    this.limit = limit;
    this.offset = offset;
  }

  @Expose()
  get previous_url() {
    let previous: string | null = null;
    if (this.offset > 0 && this.count) {
      previous = `${this.baseUrl}?${stringify({
        filter: {
          limit: this.limit,
          ...(this.offset - this.limit >= 0 && {offset: this.offset}),
        },
      })}`;
    }
    return previous;
  }

  @Expose()
  get next_url() {
    let next: string | null = null;
    if (this.offset + this.limit < this.count) {
      next = `${this.baseUrl}?${stringify({
        filter: {
          limit: this.limit,
          offset: this.offset + this.limit,
        },
      })}`;
    }
    return next;
  }

  toArray(reqContext: RequestContext) {
    this.baseUrl = `${reqContext.requestedBaseUrl}${reqContext.request.url}`.split(
      '?',
    )[0];
    return classToPlain(this);
  }
}
