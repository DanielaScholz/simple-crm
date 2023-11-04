import { Component, OnInit, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Order, User } from 'src/models/user.class';
import { CrudServiceService } from '../../services/crud-service.service';

@Component({
  selector: 'app-dialog-edit-order',
  templateUrl: './dialog-edit-order.component.html',
  styleUrls: ['./dialog-edit-order.component.scss']
})
export class DialogEditOrderComponent implements OnInit {
  loading = false;
  userId: string;
  user: User; 
  order: Order;
  firestore: Firestore = inject(Firestore);

  allOrders: { amount: number; price: number; item: string; }[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogEditOrderComponent>,
    public crud: CrudServiceService
    ) { }

  ngOnInit(): void {
    this.allOrders = this.user.orders;
  }

  updateOrder(){
    this.loading = true;
    this.crud.update(this.userId, {orders: this.allOrders })
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
