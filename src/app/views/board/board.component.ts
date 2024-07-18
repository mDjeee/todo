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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { CookieService } from '../../core/services/cookie.service';

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
    TaskComponent,
    MatPaginator
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit {
  store = inject(TasksStore);
  dialog = inject(MatDialog);
  size = 10;
  count = 0;

  constructor(private cookieService: CookieService) {
  }

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
    this.count = +(this.cookieService.get('count') ?? 0);
    this.size = +(this.cookieService.get('pageSize') ?? 25);
  }

  async getAllTasks() {
    await this.store.loadAll();
  }

  add() {
    this.dialog.open(TaskDialogComponent, {    })
  }

  async pageEvent(event: any) {
    const { previousIndex, pageIndex, pageSize, length } = event;
    this.cookieService.set('previousIndex', previousIndex);
    this.cookieService.set('pageIndex', pageIndex);
    this.cookieService.set('pageSize', pageSize);
    this.cookieService.set('length', length);
    const offset = pageIndex * pageSize;
    this.cookieService.set('offset', offset);
    await this.getAllTasks();
  }
}
