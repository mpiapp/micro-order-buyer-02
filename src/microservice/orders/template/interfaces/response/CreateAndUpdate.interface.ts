import { BaseResponse } from './../../../../../config/interfaces/response.base.interface';
import { Template } from './../../../../../database/schema/template.schema';

export interface ITemplateCreateAndUpdateResponse extends BaseResponse {
  data: Template | null;
}
