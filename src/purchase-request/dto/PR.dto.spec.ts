import { validate } from 'class-validator';
import { PurchaseRequestCreateDto } from './CreatePurchaseRequest.dto';
import { Status } from './Status.dto';

describe('Create PR Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new PurchaseRequestCreateDto();
  });

  it('validate element PR DTO', async () => {
    classes.id = null;
    classes.user_id = null;
    classes.buyer_id = null;
    classes.date = 'date';
    classes.status = 'is array status';
    classes.products = 'is array product';

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(6);
    });
  });
});

describe('Create Status Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new Status();
  });

  it('validate element Status DTO', async () => {
    classes.name = null;
    classes.timestamp = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(2);
    });
  });
});
