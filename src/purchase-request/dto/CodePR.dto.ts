import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CodePRDto {
  @ApiProperty()
  @IsNotEmpty()
  code: string;
}
