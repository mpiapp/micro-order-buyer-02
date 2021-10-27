import { validate } from 'class-validator';
import { GRNItems } from '../Items.dto';

describe('Delivery Note Create DTO', () => {
  let classes;
  beforeEach(() => {
    classes = new GRNItems();
  });

  it('validate element GRN Item DTO', async () => {
    classes.productId = null;
    classes.quantity = null;
    classes.received = null;
    classes.price = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(4);
    });
  });
});
