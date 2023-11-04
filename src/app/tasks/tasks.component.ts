import { Component, OnInit, inject } from '@angular/core';
import { Task } from 'src/models/task.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { Firestore, collection, deleteDoc, doc, onSnapshot } from '@angular/fire/firestore';
import { CrudServiceService } from '../services/crud-service.service';
import { DialogEditTaskComponent } from '../dialog-edit-task/dialog-edit-task.component';

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
        console.log(element)
        const taskData = { ...element.data(), idField: element.id };
        this.tasks.push(taskData);
        this.filteredTasks.push(taskData);
      });
      this.converteDueDate()
    })
  }

  converteDueDate() {
    this.filteredTasks.forEach(element => {
      let datum;
      let timestamp = new Date(element.dueDate);
      let day = timestamp.getDate();
      let month = timestamp.getMonth() + 1;
      let year = timestamp.getFullYear();
      datum = `${day}.${month}.${year}`;
      this.dueDates.push(datum)
    });
  }

  filterData() {
    this.filteredTasks = this.tasks.filter(input => {
      return (
        input.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }

  openDialogAddTask() {
    this.dialog.open(DialogAddTaskComponent);
  }

  openDialogEditTask(i:number) {
    let dialog = this.dialog.open(DialogEditTaskComponent);
    dialog.componentInstance.task = new Task(this.tasks[i]);
    dialog.componentInstance.id = this.tasks[i].idField;
  }

  deleteTask(i: number) {
    deleteDoc(doc(this.firestore, 'tasks', this.tasks[i].idField));
  }



}