import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PRIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}
