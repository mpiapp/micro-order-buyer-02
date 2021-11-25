import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ApprovalOfPaymentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsNumber()
  @Min(0)
  nominal: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
