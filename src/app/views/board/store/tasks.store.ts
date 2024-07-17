import { BoardState } from '../interfaces/task.interface';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { TaskService } from '../services/task.service';
import { take } from 'rxjs';
import { IUpdateTaskDto } from '../dto/task-request.dto';

const initialState: BoardState = {
  tasks: [],
  loading: false
}

export const TasksStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (store, taskService = inject(TaskService)) => ({
      async loadAll() {
        patchState(store, { loading: true });
        taskService.getTasks()
          .pipe(take(1))
          .subscribe({
            next: ({ results: tasks }) => {
              patchState(store, {
                tasks,
                loading: false
              })
            }
          });
      },

      async updateTask(taskId: string, task: IUpdateTaskDto) {
        patchState(store, { loading: true });
        taskService.updateTaskOnDrag(taskId, task)
          .pipe(take(1))
          .subscribe({
            next: () => this.loadAll(),
            error: () => patchState(store, { loading: false })
          })
      },

      updateOnDrag(updatedTask: any){
        const updatedTasks = store.tasks().map(task => {
          if(task.id === updatedTask.id) {
            task.completed = !task.completed;
          }
          return task;
        });

        patchState(store, { tasks: updatedTasks })
      },

      remove(taskId: string) {
        patchState(store, { loading: true });
        taskService.remove(taskId)
          .pipe(take(1))
          .subscribe({
            next: () => this.loadAll(),
            error: () => patchState(store, { loading: false })
          })
      }
    })
  )
)
