export const sampleStatus = {
  id: expect.any(String),
  name: 'complete',
  timestamp: new Date('2020-10-10'),
};

export const sample_status = {
  id: expect.any(String),
  status: {
    name: 'Testing',
    timestamp: new Date(),
  },
};
