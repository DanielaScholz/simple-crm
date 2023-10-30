import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Order, User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-order',
  templateUrl: './dialog-edit-order.component.html',
  styleUrls: ['./dialog-edit-order.component.scss']
})
export class DialogEditOrderComponent {
  loading = false;
  userId: string;
  user: User = new User();  
  order: Order = new Order();
  firestore: Firestore = inject(Firestore);

  newOrder: any  = [];  

  constructor(public dialogRef: MatDialogRef<DialogEditOrderComponent>) { }



  updateOrder(){
    
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
