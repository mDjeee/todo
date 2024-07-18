import { Component, Inject, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksStore } from '../../store/tasks.store';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatButton
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  store = inject(TasksStore);

  constructor(
    private dialog: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public taskId: string
    ) {
  }

  close() {
    this.dialog.close();
  }

  confirm() {
    this.store.remove(this.taskId);
    this.dialog.close();
  }
}
