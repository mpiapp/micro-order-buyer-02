import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ISearch } from '../interfaces/type/ISearch.interface';

export class SearchDto implements ISearch {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  search: string;
}
