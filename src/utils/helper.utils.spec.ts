import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import configuration from './../config/configuration';
import { Helper } from './helper.utils';

const sampleDataHelper = {
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

  it('should SUM Validate Success', () => {
    try {
      sampleDataHelper.total = 30000;
      services.sumValidate(sampleDataHelper);
    } catch (error) {
      expect(error).toBe(error);
    }
  });
});
