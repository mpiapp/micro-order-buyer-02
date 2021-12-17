import { BasePaginateResponse } from './../../../../../config/interfaces/response.pagination.base.interface';
import { Template } from './../../../../../database/schema/template.schema';

export interface ITemplatePaginateResponse extends BasePaginateResponse {
  data: Template[] | null;
}
