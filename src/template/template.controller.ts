import { Body, Controller, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { MessagePattern } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { BaseResponse } from './../config/interfaces/response.base.interface';
import { TemplateCreateDto } from './dto/CreateTemplate.dto';
import { ItemTemplateDto } from './dto/ItemTemplate.dto';
import { ITemplateCreateAndUpdateResponse } from './interfaces/response/CreateAndUpdate.interface';
import { ITemplateSearchAndListResponse } from './interfaces/response/SearchAndList.interface';
import { TemplateItemsService } from './services/template-items.service';
import { TemplateService } from './services/template.service';
import { IncomingMessage } from './../config/interfaces/Income.interface';

@ApiTags('Template Purchase Request')
@Controller('template')
export class TemplateController {
  constructor(
    private readonly Items: TemplateItemsService,
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

  @MessagePattern('template.add.item')
  async TemplateAddItem(
    @Body() message: IncomingMessage<ItemTemplateDto>,
  ): Promise<BaseResponse> {
    const { id, ...product } = message.value;
    const addQty = await this.Items.addItem(
      {
        $and: [
          {
            _id: new mongoose.Types.ObjectId(id),
            'items.productId': product.productId,
          },
        ],
      },
      { $inc: { 'items.$.quantity': product.quantity } },
    );
    if (!addQty.matchedCount) {
      await this.Items.addItem({ _id: id }, { $push: { items: product } });
      return {
        status: HttpStatus.CREATED,
        message: this.Config.get<string>('messageBase.Items.add.Success'),
        errors: null,
      };
    }

    return {
      status: HttpStatus.CREATED,
      message: this.Config.get<string>('messageBase.Items.add.Success'),
      errors: null,
    };
  }

  @MessagePattern('template.update.item')
  async TemplateUpdateItem(
    @Body() message: IncomingMessage<ItemTemplateDto>,
  ): Promise<BaseResponse> {
    try {
      const { id, ...product } = message.value;
      await this.Items.addItem(
        {
          $and: [
            {
              _id: new mongoose.Types.ObjectId(id),
              'items.productId': product.productId,
            },
          ],
        },
        { $inc: { 'items.$.quantity': product.quantity } },
      );

      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Items.update.Success'),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Items.update.Failed'),
        errors: error,
      };
    }
  }

  @MessagePattern('template.remove.item')
  async TemplateRemoveItem(
    @Body() message: IncomingMessage<ItemTemplateDto>,
  ): Promise<BaseResponse> {
    try {
      const { id, ...product } = message.value;
      await this.Items.removeItem(
        { _id: new mongoose.Types.ObjectId(id) },
        { $pull: { items: { productId: product.productId } } },
      );

      return {
        status: HttpStatus.OK,
        message: this.Config.get<string>('messageBase.Items.remove.Success'),
        errors: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        message: this.Config.get<string>('messageBase.Items.remove.Failed'),
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
}
