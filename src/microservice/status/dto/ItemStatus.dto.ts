import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TStatusItemLevel } from '../interfaces/type/StatusItemLevel.type';
import { PackageStatusDto } from './PackageSattus.dto';

export class ItemStatusDto
  extends PackageStatusDto
  implements TStatusItemLevel
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  itemsId: string;
}
