import { validate } from 'class-validator';
import { ItemTemplateDto } from '../ItemTemplate.dto';

describe('Create PR Dto', () => {
  let classes;
  beforeEach(() => {
    classes = new ItemTemplateDto();
  });

  it('validate element DTO', async () => {
    validate(classes).then((errors) => {
      expect(errors.length).toEqual(18);
    });
  });
});
