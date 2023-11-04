import { Component, OnInit, inject } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';

import { NgFor } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';



import { Task } from 'src/models/task.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { CrudServiceService } from '../services/crud-service.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  task: Task = new Task();
  tasks = [];
  dueDates = [];
  filteredTasks = [];
  unsubTask;

  checked = false;
  searchQuery: string;
  dueDate;



  constructor(
    public crud: CrudServiceService,
    public dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.unsubTask = this.subTaskList();


  }

  ngOnDestroy() {
    this.unsubTask;
  }

  subTaskList() {
    return onSnapshot(this.crud.getTaskRef(), (list) => {
      this.tasks = []
      this.filteredTasks = [];
      this.dueDates = []

      list.forEach(element => {
        // const taskData = { ...element.data(), id: element.id };
        const taskData = element.data();
        this.tasks.push(taskData);
        this.filteredTasks.push(taskData);
      });


      // this.converteDueDate();

      console.log(this.tasks);
      this.getDatum()
    })


  }

  getDatum() {
    this.filteredTasks.forEach(element => {
      let datum;
      let timestamp = new Date (element.dueDate);
      console.log(timestamp);
      let day = timestamp.getDate();
      let month = timestamp.getMonth() + 1;
      let year = timestamp.getFullYear();
      datum = `${day}.${month}.${year}`;
      console.log(datum);
      
      this.dueDates.push(datum)
    });
    console.log(this.dueDates);
  }

  openDialogAddTask() {
    this.dialog.open(DialogAddTaskComponent);
  }


  filterData() {
    this.filteredTasks = this.tasks.filter(input => {
      return (
        input.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });

  }


  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'low':
        return 'low';
      case 'medium':
        return 'medium';
      case 'high':
        return 'high';
      default:
        return '';
    }
  }


  openDialogEditTask(i){

  }

  deleteTask(i){

  }


}