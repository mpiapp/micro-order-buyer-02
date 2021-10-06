import { PRIdDto } from './../../../src/purchase-request/dto/_IdPR.dto';
import { PRCreateDto } from './../../../src/purchase-request/dto/CreatePR.dto';
import { PRUpdateDto } from './../../../src/purchase-request/dto/UpdatePR.dto';

export const mockPurchaseRequest = {
  create: jest.fn().mockImplementation((param: PRCreateDto) => param),
  findByIdAndUpdate: jest
    .fn()
    .mockImplementation((id: PRIdDto, param: PRUpdateDto) => {
      return {
        ...param,
        id,
      };
    }),
  delete: jest.fn().mockImplementation((id: PRIdDto) => {
    return { id };
  }),
};
