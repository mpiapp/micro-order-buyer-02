import { Body, Controller, HttpStatus, Param, Query } from '@nestjs/common';
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

@ApiTags('Template Purchase Request')
@Controller('template')
export class TemplateController {
  constructor(
    private readonly Items: TemplateItemsService,
    private readonly TemplateMaster: TemplateService,
    private readonly Config: ConfigService,
  ) {}

  @MessagePattern('Template-Save')
  async TemplateCreate(
    @Body() params: TemplateCreateDto,
  ): Promise<ITemplateCreateAndUpdateResponse> {
    try {
      const save = await this.TemplateMaster.createTemplate(params);
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

  @MessagePattern('Template-Update')
  async TemplateDelete(@Param('id') id: string): Promise<BaseResponse> {
    try {
      await this.TemplateMaster.deleteTemplate(id);
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

  @MessagePattern('Template-Add-Item')
  async TemplateAddItem(
    @Query('id') id: string,
    @Body() product: ItemTemplateDto,
  ): Promise<BaseResponse> {
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

  @MessagePattern('Template-Update-Item')
  async TemplateUpdateItem(
    @Query('id') id: string,
    @Body() product: ItemTemplateDto,
  ): Promise<BaseResponse> {
    try {
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

  @MessagePattern('Template-Remove-Item')
  async TemplateRemoveItem(
    @Query('id') id: string,
    @Body() product: ItemTemplateDto,
  ): Promise<BaseResponse> {
    try {
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

  @MessagePattern('Template-List-Data')
  async TemplateGetList(
    @Query('id') id: string,
  ): Promise<ITemplateSearchAndListResponse> {
    try {
      const getAll = await this.TemplateMaster.listTemplate(id);
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

  @MessagePattern('Template-Get-Data-By-Id')
  async TemplateGetById(
    @Query('id') id: string,
  ): Promise<ITemplateCreateAndUpdateResponse> {
    try {
      const getById = await this.TemplateMaster.getByIdTemplate(id);
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

  @MessagePattern('Template-Search-Data')
  async TemplateSearch(
    @Query('search') _search: string,
  ): Promise<ITemplateSearchAndListResponse> {
    try {
      const search = await this.TemplateMaster.searchTemplate(_search);
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
