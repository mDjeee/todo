import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/task.interface';
import { HttpClient } from '@angular/common/http';
import { TaskResponse } from '../dto/task-response.dto';
import { Observable } from 'rxjs';
import { IUpdateTaskDto } from '../dto/task-request.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks(): Observable<TaskResponse> {
    return this.http.get<TaskResponse>('/api/todo/');
  }

  updateTaskOnDrag(taskId: string, task: IUpdateTaskDto): Observable<ITask> {
    return this.http.put<ITask>(`/api/todo/${taskId}/`, task);
  }

  remove(taskId: string): Observable<ITask> {
    return this.http.delete<ITask>(`/api/todo/${taskId}/`);
  }
}
