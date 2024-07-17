import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '../interfaces/task.interface';

@Pipe({
  name: 'completed',
  standalone: true,
  pure: false,
})
export class CompletedPipe implements PipeTransform {

  transform(tasks: ITask[], completed: boolean): ITask[] {
    if(!tasks) {
      return [];
    }
    return tasks.filter(task => task.completed === completed);
  }

}
