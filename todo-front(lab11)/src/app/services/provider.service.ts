import { Injectable } from '@angular/core';
import {MainService} from './main.service';
import {HttpClient} from '@angular/common/http';
import {ITaskList} from "../models/TaskList";
import {ITask} from "../models/Task";

@Injectable({
  providedIn: 'root'
})
export class ProviderService extends MainService{

  constructor(http: HttpClient) {
        super(http);
   }

  getTaskLists(): Promise<ITaskList[]> {
    return this.get('http://localhost:8000/api/task_lists', {});
  }

  getTasks(id: number): Promise<ITask[]> {
    return this.get(`http://localhost:8000/api/task_lists/${id}/tasks`, {});
  }

  getTask(id: number): Promise<ITask> {
    return this.get(`http://localhost:8000/api/tasks/${id}`, {});
  }



}
