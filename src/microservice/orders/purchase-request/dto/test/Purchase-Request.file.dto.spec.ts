import { classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { PRCreateDto } from '../CreatePR.dto';
import { ItemPRDto } from '../Items.dto';
import { StatusDto } from '../Status.dto';
import { PRUpdateDto } from '../UpdatePR.dto';

describe('Create PR Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new PRCreateDto();
  });

  it('validate element PR DTO', async () => {
    classes.id = null;
    classes.createdBy = null;
    classes.buyerId = null;
    classes.addressId = null;
    classes.date = 'date';
    classes.statuses = 'is array status';
    classes.items = 'is array product';

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(8);
    });
  });

  it('validate Date PR DTO', async () => {
    const date = new Date();
    classes.date = date;

    const plainClass = classToPlain(classes);
    expect(plainClass).toEqual(classes);
  });
});

describe('Create Status Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new StatusDto();
  });

  it('validate element Status DTO', async () => {
    classes.name = null;
    classes.timestamp = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(3);
    });
  });

  it('validate Date Status DTO', async () => {
    const date = new Date();
    classes.timestamp = date;

    const plainClass = classToPlain(classes);
    expect(plainClass).toEqual(classes);
  });
});

describe('Create Items Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new ItemPRDto();
  });

  it('validate element Items DTO', async () => {
    classes.productId = null;
    classes.quantity = null;
    classes.price = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(18);
    });
  });
});

describe('Create UpdatePR Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new PRUpdateDto();
  });

  it('validate element UpdatePR DTO', async () => {
    classes.statuses = null;
    classes.total = null;
    classes.items = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});
