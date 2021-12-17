import { Body, Controller, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from './../../../config/interfaces/response.base.interface';
import { TemplateCreateDto } from './dto/CreateTemplate.dto';
import { ITemplateCreateAndUpdateResponse } from './interfaces/response/CreateAndUpdate.interface';
import { ITemplateSearchAndListResponse } from './interfaces/response/SearchAndList.interface';
import { TemplateService } from './services/template.service';
import { IncomingMessage } from './../../../config/interfaces/Income.interface';
import { TemplateUpdateDto } from './dto/UpdateTemplate.dto';
import { TBasePaginate } from './../../../config/type/BasePaginate.type';
import { ITemplatePaginateResponse } from './interfaces/response/Paginate.interface';

@ApiTags('Template Purchase Request')
@Controller('template')
export class TemplateController {
  constructor(
    private readonly TemplateMaster: TemplateService,
    private readonly Config: ConfigService,
  ) {}

  @MessagePattern('template.save')
  async TemplateCreate(
    @Body() message: IncomingMessage<TemplateCreateDto>,
  ): Promise<ITemplateCreateAndUpdateResponse> {
    try {
      const save = await this.TemplateMaster.createTemplate(message.value);
      return {
        status: HttpStatus.CREATED,
        message: this.Config.get<string>('messageBase.Template.save.Success'),
        data: save,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Template.save.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('template.update')
  async TemplateUpdate(
    @Body() message: IncomingMessage<TemplateUpdateDto>,
  ): Promise<BaseResponse> {
    try {
      await this.TemplateMaster.updateTemplate(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Template.update.Success'),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Template.update.Failed'),
        errors: error,
      };
    }
  }

  @MessagePattern('template.delete')
  async TemplateDelete(
    @Body() message: IncomingMessage<string>,
  ): Promise<BaseResponse> {
    try {
      await this.TemplateMaster.deleteTemplate(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Template.delete.Success'),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Template.delete.Failed'),
        errors: error,
      };
    }
  }

  @MessagePattern('template.get.all')
  async TemplateGetList(
    @Body() message: IncomingMessage<string>,
  ): Promise<ITemplateSearchAndListResponse> {
    try {
      const getAll = await this.TemplateMaster.listTemplate(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Template.All.Success'),
        data: getAll,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Template.All.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('template.get.by.id')
  async TemplateGetById(
    @Body() message: IncomingMessage<string>,
  ): Promise<ITemplateCreateAndUpdateResponse> {
    try {
      const getById = await this.TemplateMaster.getByIdTemplate(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Template.One.Success'),
        data: getById,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Template.One.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('template.get.items')
  async TemplateItems(
    @Body() message: IncomingMessage<string>,
  ): Promise<ITemplateCreateAndUpdateResponse> {
    try {
      const getById = await this.TemplateMaster.getItems(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Template.One.Success'),
        data: getById,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Template.One.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('template.search')
  async TemplateSearch(
    @Body() message: IncomingMessage<string>,
  ): Promise<ITemplateSearchAndListResponse> {
    try {
      const search = await this.TemplateMaster.searchTemplate(message.value);
      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Template.Search.Success'),
        data: search,
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Template.Search.Failed'),
        data: null,
        errors: error,
      };
    }
  }

  @MessagePattern('template.paginate')
  async TemplatePaginate(
    @Body() message: IncomingMessage<TBasePaginate>,
  ): Promise<ITemplatePaginateResponse> {
    const { skip, limit } = message.value;
    const getData = await this.TemplateMaster.getPaginate({
      ...message.value,
      skip: Number(skip),
      limit: Number(limit),
    });
    if (!getData) {
      return {
        count: 0,
        page: Number(skip),
        limit: Number(limit),
        data: null,
      };
    }
    const { data, metadata } = getData[0];
    return {
      count: metadata[0] ? metadata[0].total : 0,
      page: Number(skip),
      limit: Number(limit),
      data: data,
    };
  }
}
