import { TemplateCreateDto } from './../../../../src/template/dto/CreateTemplate.dto';
import { sampleItem } from '../Products/sample.item.mock';

export const SampleTemplateCreateOld = {
  name: 'Template A',
  buyerId: '617364617364617364617344',
  items: [sampleItem, sampleItem],
  statuses: [
    {
      name: 'Draft',
      timestamp: new Date('2021-10-10 20:00'),
    },
  ],
  createdBy: '615fc7256dce435b915538ec',
};

export const SampleTemplateUpdate = {
  name: 'Template A',
  id: expect.any(String),
  vendors: [
    {
      vendorId: expect.any(String),
      packages: [
        {
          items: [sampleItem, sampleItem],
          total: 0,
        },
      ],
    },
  ],
  total: 0,
};

export const SampleTemplateCreate: TemplateCreateDto = {
  name: 'Template A',
  buyerId: '617364617364617364617344',
  vendors: [
    {
      vendorId: expect.any(String),
      packages: [
        {
          items: [sampleItem, sampleItem],
          total: 0,
        },
      ],
    },
  ],
  total: 0,
  createdBy: 'Xxx Object Id',
};
