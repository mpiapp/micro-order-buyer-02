import { IHistory } from '../interfaces/type/Ihistory.interface';

export class HistoryDto implements IHistory {
  title: string;
  message: string;
  timestamp: Date;
  userId: string;
}
