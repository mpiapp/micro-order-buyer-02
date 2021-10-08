import { classToPlain } from 'class-transformer';
import { validate } from 'class-validator';
import { BuyerDto } from '../Buyer.dto';
import { CodePRDto } from '../CodePR.dto';
import { PRCreateDto } from '../CreatePR.dto';
import { HistoryDto } from '../History.dto';
import { ItemDto } from '../Items.dto';
import { SearchDto } from '../SearchPR.dto';
import { StatusDto } from '../Status.dto';
import { PRUpdateDto } from '../UpdatePR.dto';
import { PRIdDto } from '../_IdPR.dto';

describe('Create PR Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new PRCreateDto();
  });

  it('validate element PR DTO', async () => {
    classes.id = null;
    classes.user_id = null;
    classes.buyer_id = null;
    classes.date = 'date';
    classes.status = 'is array status';
    classes.products = 'is array product';

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(7);
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
      expect(errors.length).toEqual(2);
    });
  });

  it('validate Date History DTO', async () => {
    const date = new Date();
    classes.timestamp = date;

    const plainClass = classToPlain(classes);
    expect(plainClass).toEqual(classes);
  });
});

describe('Create Id PR Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new PRIdDto();
  });

  it('validate element Id DTO', async () => {
    classes.id = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});

describe('Create History Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new HistoryDto();
  });

  it('validate element History DTO', async () => {
    classes.title = null;
    classes.message = null;
    classes.timestamp = null;
    classes.userId = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(4);
    });
  });

  it('validate Date History DTO', async () => {
    const date = new Date();
    classes.timestamp = date;

    const plainClass = classToPlain(classes);
    expect(plainClass).toEqual(classes);
  });
});

describe('Create Items Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new ItemDto();
  });

  it('validate element Items DTO', async () => {
    classes.productId = null;
    classes.quantity = null;
    classes.price = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(3);
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
    classes.history = null;
    classes.items = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});

describe('Create CodePR Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new CodePRDto();
  });

  it('validate element UpdatePR DTO', async () => {
    classes.code = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});

describe('Buyer PR Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new BuyerDto();
  });

  it('validate element Buyer DTO', async () => {
    classes.buyerId = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});

describe('Buyer PR Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new SearchDto();
  });

  it('validate element Search DTO', async () => {
    classes.search = null;

    validate(classes).then((errors) => {
      expect(errors.length).toEqual(1);
    });
  });
});
