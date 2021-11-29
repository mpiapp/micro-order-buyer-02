import { GRNUpdateDto } from './../../../../src/grn/dto/Update.dto';
import { sampleItem } from '../Products/sample.item.mock';

export const sampleGRN: GRNUpdateDto = {
  code_good_received_note: 'GRN-001-001',
  receivedUserId: '1231212312412412312',
  items: [
    {
      ...sampleItem,
      received: null,
    },
    {
      ...sampleItem,
      received: null,
    },
    {
      ...sampleItem,
      received: null,
    },
  ],
};
