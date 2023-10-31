import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, docData, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Order, User } from 'src/models/user.class';
import { CrudServiceService } from '../services/crud-service.service';

@Component({
  selector: 'app-dialog-add-order',
  templateUrl: './dialog-add-order.component.html',
  styleUrls: ['./dialog-add-order.component.scss']
})
export class DialogAddOrderComponent implements OnInit {

  loading = false;
  userId: string;
  user: User = new User();
  order: Order = new Order();
  firestore: Firestore = inject(Firestore);

  allOrders: { amount: number; price: number; item: string; }[] = [];



  constructor(
    public crud: CrudServiceService,
    public dialogRef: MatDialogRef<DialogAddOrderComponent>) {
  }


  ngOnInit(): void {
    this.getUserById();
  }

  getUserById() {
    const userArr = this.crud.getUserById(this.userId)
    userArr.subscribe((user) => {
      console.log(user);
      this.user = new User(user);
      // (this.user.orders);
    })
  }


  addOrder() {
    this.crud.allOrders.push(this.order.toJSON())
    this.saveOrder();
  }


  saveOrder() {
    this.crud.update(this.userId, { orders: this.crud.allOrders })
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
  }

}
