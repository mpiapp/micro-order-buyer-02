import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from './../config/configuration';
import { Helper } from './helper.utils';

const sampleDataHelper = {
  code: 'KPJ-01-01',
  items: [
    {
      productId: expect.any(String),
      price: 10000,
      quantity: 1,
    },
    {
      productId: expect.any(String),
      price: 10000,
      quantity: 1,
    },
    {
      productId: expect.any(String),
      price: 10000,
      quantity: 1,
    },
  ],
  total: 20000,
};

describe('Helper Service', () => {
  let services: Helper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
        }),
      ],
      providers: [Helper],
    }).compile();

    services = module.get<Helper>(Helper);
  });

  it('should be defined', () => {
    expect(services).toBeDefined();
  });

  it('should SUM', () => {
    expect(services.SUM(sampleDataHelper)).toBe(30000);
  });

  it('should SUM Validate Error', () => {
    try {
      services.sumValidate(sampleDataHelper);
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should SUM Validate Success ', () => {
    try {
      sampleDataHelper.total = 30000;
      services.sumValidate(sampleDataHelper);
    } catch (error) {
      expect(error).toBe(error);
    }
  });

  it('should generate number', () => {
    expect(services.GenerateNumber(sampleDataHelper.code, '00000')).toEqual(
      `${sampleDataHelper.code}-00001`,
    );
  });

  it('should pad number', () => {
    expect(services.padNumber('9', 4, '0')).toEqual(`0009`);
  });

  it('should pad number > width ', () => {
    expect(services.padNumber('19', 1, '0')).toEqual(`19`);
  });
});
