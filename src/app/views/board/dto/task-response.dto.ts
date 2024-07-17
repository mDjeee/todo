import { ITask } from '../interfaces/task.interface';

export interface TaskResponse {
  count: number;
  next: any | null;
  previous: any | null;
  results: ITask[];
}
