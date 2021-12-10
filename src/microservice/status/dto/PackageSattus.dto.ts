import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { TStatusPackageLevel } from '../interfaces/type/StatusPackageLevel.type';
import { VendorStatusDto } from './VendorStatus.dto';

export class PackageStatusDto
  extends VendorStatusDto
  implements TStatusPackageLevel
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  packageId: string;
}
