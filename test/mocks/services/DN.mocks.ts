import { sampleDeliveryNote } from '../sample/Delivery-Note/sample.mock';

export const mockDeliveryNoteService = {
  create: jest.fn().mockImplementation((dto) => {
    return dto;
  }),
  find: jest.fn().mockReturnValue([sampleDeliveryNote]),
  findById: jest.fn().mockReturnValue(sampleDeliveryNote),
  aggregate: jest.fn().mockReturnValue([sampleDeliveryNote]),
};
