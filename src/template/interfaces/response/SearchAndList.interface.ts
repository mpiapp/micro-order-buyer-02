import { BaseResponse } from '../../../config/interfaces/response.base.interface';
import { Template } from '../../schemas/template.schema';

export interface ITemplateSearchAndListResponse extends BaseResponse {
  data: Template[] | null;
}
