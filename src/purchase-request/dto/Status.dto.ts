import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { IStatus } from '../interfaces/type/IStatus.interface';

export class StatusDto implements IStatus {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsDate()
  timestamp: Date;
}
