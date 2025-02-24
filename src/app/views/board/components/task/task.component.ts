import { Component, inject, Input } from '@angular/core';
import { ITask } from '../../interfaces/task.interface';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() task!: ITask;
  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(TaskDialogComponent, {
      data: this.task
    });
  }

  openConfirmDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      data: this.task.id
    })
  }
}
