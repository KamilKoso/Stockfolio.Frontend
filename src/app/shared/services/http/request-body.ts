import { QueryParameters } from './query-parameters';
import { RequestData } from './request-data';

export interface RequestBody extends QueryParameters {
  body?: RequestData;
}
