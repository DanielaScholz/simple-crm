import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';
import { DialogAddOrderComponent } from '../dialog-add-order/dialog-add-order.component';
import { DialogEditOrderComponent } from '../dialog-edit-order/dialog-edit-order.component';
import { Observable } from 'rxjs';
import { CrudServiceService } from '../services/crud-service.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})

export class UserDetailComponent implements OnInit {
  firestore: Firestore = inject(Firestore);

  userId: string;
  dateOfBirth;
  user: User = new User();

  order: Order = new Order();
  newOrder;
  allOrders: { amount: number; price: number; item: string; }[] = [];

  newNote: string;
  notesList: string[] = [];



  constructor(
    public route: ActivatedRoute,
    public crud: CrudServiceService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      console.log(paramMap)
      this.userId = paramMap.get('id');
      this.getUserData(this.userId);
    })

    // this.route.params.subscribe((params) =>{
    //   this.userId = params['id'];
    //   this.getUserData(this.userId);
    // })
  }

  getUserData(userId) {
    let ref = doc(this.firestore, 'users', userId);
    docData(ref).subscribe((userData: any) => {
      console.log(userData);
      this.user = new User(userData);
      // this.order = new Order(this.user.orders); 
      this.checkIfNotes();     
      this.allOrders = this.user.orders;
      // this.crud.allOrders = this.user.orders;
      this.dateOfBirth = this.user.dateOfBirth
      this.converteDateOfBirth();
    })
  }

  checkIfNotes(){
    if (this.user.notes.length >= 1) {
      this.notesList = this.user.notes;
    }
  }

  getSingleDocRef(colId: string, docId: string) {
    return (doc(collection(this.firestore, colId), docId));
  }

  editUserDetail() {
    let dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editAddressDetail() {
    let dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  deleteUser() {
    let dialog = this.dialog.open(DialogDeleteUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  converteDateOfBirth() {
    let timestamp = new Date(this.user.dateOfBirth)
    let day = timestamp.getDate();
    let month = timestamp.getMonth() + 1;
    let year = timestamp.getFullYear();
    this.dateOfBirth = `${day}.${month}.${year}`;
  }

  //NOTES
  addNote() {
    if (this.newNote.trim() !== '') {
      this.notesList.push(this.newNote);
      this.newNote = ''; // Das Eingabefeld leeren
      this.crud.update(this.userId, {notes: this.notesList})
    }
  }

  deleteNote(i: number) {
    this.notesList.splice(i, 1);
    this.crud.update(this.userId, {notes: this.notesList})
  }

  //ORDER
  openDialogAddOrder() {
    let dialog = this.dialog.open(DialogAddOrderComponent);
    dialog.componentInstance.user = new User(this.order.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  openDialogEditOrder(i) {
    console.log(i)
    let dialog = this.dialog.open(DialogEditOrderComponent);
    dialog.componentInstance.user = new User(this.user.orders[i]);
    dialog.componentInstance.userId = this.userId;
  }

  deleteOrder(i:number) {
    this.allOrders.splice(i, 1);
    this.crud.update(this.userId, {orders: this.allOrders})
  }

}
