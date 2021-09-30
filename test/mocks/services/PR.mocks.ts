import { PurchaseRequestCreateDto } from 'src/purchase-request/dto/CreatePurchaseRequest.dto';
import { PurchaseRequestIdDto } from 'src/purchase-request/dto/IdPurchaseRequest.dto';
import { PurchaseRequestUpdateDto } from 'src/purchase-request/dto/UpdatePurchaseRequest.dto';

export const mockPurchaseRequest = {
  create: jest
    .fn()
    .mockImplementation((param: PurchaseRequestCreateDto) => param),
  findByIdAndUpdate: jest
    .fn()
    .mockImplementation(
      (id: PurchaseRequestIdDto, param: PurchaseRequestUpdateDto) => {
        return {
          ...param,
          id,
        };
      },
    ),
  delete: jest.fn().mockImplementation((id: PurchaseRequestIdDto) => {
    return { id };
  }),
};
