export const listStatus = [
  { id: 1, name: 'open', next: ['submitted', 'cancelled'] },
  { id: 2, name: 'completed', next: [] },
  { id: 3, name: 'submitted', next: ['completed'] },
];
