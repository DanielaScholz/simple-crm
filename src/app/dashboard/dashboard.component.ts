import { Component, OnInit, inject } from '@angular/core';
import { CrudServiceService } from '../services/crud-service.service';
import { Task } from 'src/models/task.class';
import { Firestore, doc, docData, addDoc, collection, onSnapshot, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  task: Task = new Task;
  selected: Date | null;
  users = [];
  allOrders = [];
  allTasks = [];
  dueDates = [];
  countries = [];
  totalSales: number = 0;

  newNote;
  notesList = [];


  unsubTask;
  unsubUser;
  // unsubNote;


  name: string;


  constructor(
    public crud: CrudServiceService,
    public auth: AuthService) {}


  ngOnInit(): void {
    this.unsubTask = this.subTaskList();
    this.unsubUser = this.subUserList();
    this.getName();    
    // this.unsubNote = this.subNoteList();
  }

  ngOnDestroy() {
    this.unsubTask();
    this.unsubUser();
    // this.unsubNote();
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
      this.countries = [];

      list.forEach((element) => {
        const userData = { ...element.data(), idField: element.id };
        this.users.push(userData);
        this.checkIfTwiceCountries(this.countries, userData['country']);
        this.allOrders.push(userData['orders']);
      })
      this.getSales()
    })
  }


  getSales() {
    this.allOrders.forEach(array => {
      if (array.length > 0) {
        array.forEach(obj => {
          let price = obj.price;
          let amount = obj.amount;
          let total = price * amount;
          this.totalSales += total;
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


  checkIfTwiceCountries(array: string[], value: string) {
    if (array.indexOf(value) === -1) {
      array.push(value);
    }
  }

  updateCheckboxValue($event: any, i: number) {
    this.crud.updateTask(this.allTasks[i].idField, { checked: $event.checked })
  }

  getName(){
   this.name = localStorage.getItem('name');
  }


  //Note-Widget
  // saveNote() {
  //   if (this.newNote.trim() !== '') {
  //     this.notesList.push(this.newNote);
  //     this.newNote = '';
  //     this.crud.updateNote('noteOne', { note: this.notesList });  
  //   }
  // }

  // deleteNote(i: number) {
  //   this.notesList.splice(i, 1);
  //   this.crud.updateNote('noteOne', { note: this.notesList });

  // }


  // subNoteList() {
  //   let ref = doc(this.firestore, 'notes', 'noteOne');
  //   docData(ref).subscribe((list: any) => {
  //     console.log(list);

  //     this.notesList = list.note;

  //   })
  // }

}
