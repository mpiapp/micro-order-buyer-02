import { IsNotEmpty } from 'class-validator';

export class CodePRDto {
  @IsNotEmpty()
  code: string;
}
