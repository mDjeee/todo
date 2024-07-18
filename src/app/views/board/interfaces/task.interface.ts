export interface ITask {
  id: string;
  title: string;
  completed: boolean;
  user: number;
  created_at: string;
  updated_at: string;
}

export interface BoardState {
  tasks: ITask[],
  loading: boolean,
  count: number,
}
