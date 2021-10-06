export const mockGenerate = {
  findOne: jest.fn().mockImplementation((code) => {
    return code;
  }),
};
