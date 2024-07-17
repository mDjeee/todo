import { Component, Input } from '@angular/core';
import { ITask } from '../../interfaces/task.interface';
import { MatIcon } from '@angular/material/icon';

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
}
