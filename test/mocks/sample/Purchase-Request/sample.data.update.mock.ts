import { PRUpdateDto } from 'src/purchase-request/dto/UpdatePR.dto';
import { sampleItem } from '../Products/sample.item.mock';

export const SampleUpdate: PRUpdateDto = {
  id: expect.any(String),
  items: [sampleItem, sampleItem, sampleItem],
  total: 4320000,
  statuses: [
    {
      id: expect.any(String),
      name: 'Open',
      timestamp: new Date('2021-10-10 20:00'),
    },
  ],
};
