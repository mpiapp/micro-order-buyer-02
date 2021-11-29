import { BasePaginateResponse } from './../../../config/interfaces/response.pagination.base.interface';
import { Template } from './../../schemas/template.schema';

export interface ITemplatePaginateResponse extends BasePaginateResponse {
  data: Template[] | null;
}
