import { classToPlain } from 'class-transformer';
import { DeliveryNoteCreateDto } from '../DeliveryNoteCreate.dto';

describe('Delivery Note Create DTO', () => {
  let classes;
  beforeEach(() => {
    classes = new DeliveryNoteCreateDto();
  });

  it('validate Date DTO', async () => {
    const date = new Date();
    classes.date = date;

    const plainClass = classToPlain(classes);
    expect(plainClass).toEqual(classes);
  });
});
