import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class Status {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsDate()
  timestamp: Date;
}
