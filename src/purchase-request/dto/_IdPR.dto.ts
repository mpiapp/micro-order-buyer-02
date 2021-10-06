import { IsNotEmpty, IsString } from 'class-validator';

export class PRIdDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
