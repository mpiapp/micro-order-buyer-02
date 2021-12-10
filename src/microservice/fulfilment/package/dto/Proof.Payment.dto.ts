import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProofOfPaymentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fileUrl: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uploader: string;
}
