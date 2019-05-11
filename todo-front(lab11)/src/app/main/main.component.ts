import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITaskList} from "../models/TaskList";
import {ProviderService} from "../services/provider.service";
import {ITask} from "../models/Task";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy{

  public tasklists: ITaskList[] = [];
  public loading = false;
  public  tasks: ITask[] = [];
  public  task: ITask;

  public interval;
  constructor(private provider: ProviderService) { }

  ngOnInit() {
   this.provider.getTaskLists().then(res => {
      this.tasklists = res;
      setTimeout(() => {
        this.loading = true;
      }, 2000);
    });

  }


  getTasks(taskList: ITaskList) {
    this.provider.getTasks(taskList.id).then(res => {
      this.tasks = res;
    });
  }

  getTask(task: ITask) {
    this.provider.getTask(task.id).then(res => {
      this.task = res;
    });
  }




  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
