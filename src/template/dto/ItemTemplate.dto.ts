import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Items } from './../../items/dto/Items.dto';

export class ItemTemplateDto extends Items {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id?: string;
}
