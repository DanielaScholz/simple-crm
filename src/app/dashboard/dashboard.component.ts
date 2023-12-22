import { Component, OnInit, inject } from '@angular/core';
import { CrudServiceService } from '../services/crud-service.service';
import { Task } from 'src/models/task.class';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  task: Task = new Task;
  selected: Date | null; //select Date on calender-widget
  users = [];
  allOrders = [];
  allTasks = [];
  dueDates = [];
  // countries = [];
  totalSales: number;

  unsubTask;
  unsubUser;

  name: string;

  constructor(
    public crud: CrudServiceService,
    public auth: AuthService) {}


  ngOnInit(): void {
    this.unsubTask = this.subTaskList();
    this.unsubUser = this.subUserList();
    this.getLoginName();    
  }


  ngOnDestroy() {
    this.unsubTask();
    this.unsubUser();
  }


  subTaskList() {
    return onSnapshot(this.crud.getTaskRef(), (list) => {
      this.allTasks = []
      this.dueDates = []

      list.forEach(element => {
        const taskData = { ...element.data(), idField: element.id };
        this.allTasks.push(taskData);
      });
      this.converteDueDate()
    })
  }


  subUserList() {
    return onSnapshot(this.crud.getUserRef(), (list) => {
      this.users = [];
      this.allOrders = [];
      // this.countries = [];

      list.forEach((element) => {
        const userData = { ...element.data(), idField: element.id };
        this.users.push(userData);
        // this.checkIfTwiceCountries(this.countries, userData['country']);
        this.allOrders.push(userData['orders']);
      })
      this.getSales()
    })
  }


  getSales() {
    this.totalSales = 0;
    this.allOrders.forEach(array => {
      if (array.length > 0) {
        array.forEach(obj => {
          let price = obj.price;
          let amount = obj.amount;
          this.totalSales += price *amount;
        })
      }
    });
  }


  converteDueDate() {
    this.allTasks.forEach(element => {
      let datum;
      let timestamp = new Date(element.dueDate);
      let day = timestamp.getDate();
      let month = timestamp.getMonth() + 1;
      let year = timestamp.getFullYear();
      datum = `${day}.${month}.${year}`;
      this.dueDates.push(datum)
    });
  }


  updateCheckboxValue($event: any, i: number) {
    this.crud.updateTask(this.allTasks[i].idField, { checked: $event.checked })
  }


  getLoginName(){
   this.name = localStorage.getItem('name');
  }
  

  // checkIfTwiceCountries(array: string[], value: string) {
  //   if (array.indexOf(value) === -1) {
  //     array.push(value);
  //   }
  // }

}
