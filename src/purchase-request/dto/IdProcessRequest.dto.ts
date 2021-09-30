import { IsNotEmpty, MaxLength } from 'class-validator';

export class PurchaseRequestIdDto {
  @IsNotEmpty()
  @MaxLength(20)
  id: string;
}
