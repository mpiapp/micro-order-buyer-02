import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ICollectionId } from '../interfaces/_IdCollections.interface';

export class IdCollectionDto<T> implements ICollectionId<T> {
  @ApiProperty()
  @IsNotEmpty()
  id: T;
}
