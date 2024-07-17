import { Component, inject, OnInit } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { TasksStore } from './store/tasks.store';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { ITask } from './interfaces/task.interface';
import { CompletedPipe } from './pipes/completed.pipe';
import { IUpdateTaskDto } from './dto/task-request.dto';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { TaskComponent } from './components/task/task.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    JsonPipe,
    CompletedPipe,
    MatProgressBar,
    NgIf,
    NgClass,
    MatIcon,
    MatButton,
    MatInput,
    TaskComponent
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  store = inject(TasksStore);

  drop(event: CdkDragDrop<ITask[]>) {

    const taskId = event.item.element.nativeElement.id;
    const updateTask = event.previousContainer.data.find((task: ITask) => task.id === taskId);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.store.updateOnDrag(updateTask);
      this.store.updateTask(taskId, updateTask as IUpdateTaskDto);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getAllTasks();
  }

  async getAllTasks() {
    await this.store.loadAll();
  }
}
