import { validate } from 'class-validator';
import { POCreateDto } from '../POCreate.dto';
import { PurchaseOrderItemDto } from '../POItem.dto';
describe('PO Item Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new PurchaseOrderItemDto();
  });

  it('validate element PO Item DTO', async () => {
    classes.productId = null;
    classes.payment_terms = null;
    classes.code_po = null;
    classes.package = null;
    classes.quantity = null;
    classes.price = null;
    classes.tax = null;
    classes.statuses = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(6);
    });
  });
});

describe('PO Item Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new POCreateDto();
  });

  it('validate element PO Item DTO', async () => {
    classes.code = null;
    classes.date = null;
    classes.buyerId = null;
    classes.items = null;
    classes.total = null;
    classes.statuses = null;
    classes.createdBy = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(7);
    });
  });
});
