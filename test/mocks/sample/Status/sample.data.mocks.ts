import { StatusDto } from './../../../../src/purchase-request/dto/Status.dto';

export const sampleStatus: StatusDto = {
  id: expect.any(String),
  name: 'complete',
  timestamp: new Date('2020-10-10'),
};
