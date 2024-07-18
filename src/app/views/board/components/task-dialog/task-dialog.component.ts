import { Component, Inject, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask } from '../../interfaces/task.interface';
import { MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CookieService } from '../../../../core/services/cookie.service';
import { TasksStore } from '../../store/tasks.store';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    MatCard,
    MatLabel,
    MatHint,
    MatInput,
    MatCardFooter,
    MatCardContent,
    MatCardTitle,
    MatButton,
    MatFormField,
    FormsModule,
    MatCardHeader
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent implements OnInit {
  store = inject(TasksStore);
  title: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: ITask,
    private dialog: MatDialogRef<TaskDialogComponent>,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    this.title = this.task?.title || '';
  }

  async confirm() {
    if(!this.title) {
      return;
    }
    if(this.task?.created_at) {
      await this.edit();
    } else {
      this.add();
    }
  }

  cancel() {
    this.dialog.close();
  }

  async add() {
    const user = +(this.cookieService.get('user_id') ?? 0);
    const completed = false;
    const requestBody = {
      user,
      completed,
      title: this.title
    };
    await this.store.addTask(requestBody);
    this.dialog.close();
  }

  async edit() {
    const task = {
      ...this.task,
      title: this.title
    }
    await this.store.updateTask(this.task.id, task);
    this.dialog.close();
  }
}
