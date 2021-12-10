import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ItemPRDto } from 'src/microservice/orders/purchase-request/dto/Items.dto';

export class GRNItems extends ItemPRDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  received: number;
}
