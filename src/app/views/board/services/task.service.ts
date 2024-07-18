import { inject, Injectable } from '@angular/core';
import { ITask } from '../interfaces/task.interface';
import { HttpClient } from '@angular/common/http';
import { TaskResponse } from '../dto/task-response.dto';
import { Observable } from 'rxjs';
import { IUpdateTaskDto } from '../dto/task-request.dto';
import { TasksStore } from '../store/tasks.store';
import { CookieService } from '../../../core/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  limit: number = 10;
  count: number = 0;
  offset: number = 0;

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getTasks(): Observable<TaskResponse> {
    this.updateLimit();
    const skip = this.offset ? `&offset=${this.offset}` : ''
    return this.http.get<TaskResponse>(`/api/todo/?limit=${this.limit}${skip}`);
  }

  updateTaskOnDrag(taskId: string, task: IUpdateTaskDto): Observable<ITask> {
    return this.http.put<ITask>(`/api/todo/${taskId}/`, task);
  }

  remove(taskId: string): Observable<ITask> {
    return this.http.delete<ITask>(`/api/todo/${taskId}/`);
  }

  add(task: IUpdateTaskDto): Observable<ITask> {
    return this.http.post<ITask>('/api/todo/', task);
  }

  save(response: TaskResponse) {
    this.cookieService.set('count', response.count);
    this.cookieService.set('next', response.next);
    this.cookieService.set('previous', response.previous);
  }

  updateLimit(){
    this.count = +(this.cookieService.get('count') ?? 0);
    this.offset = +(this.cookieService.get('offset') ?? 0);
    this.limit = +(this.cookieService.get('pageSize') ?? 10);
  }
}
