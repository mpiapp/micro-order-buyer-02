import { sampleItem } from '../Products/sample.item.mock';

export const sampleMoveItem = {
  from_package: expect.any(String),
  to_package: expect.any(String),
  items: [sampleItem, sampleItem],
};
