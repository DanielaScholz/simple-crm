import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, docData, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Order, User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-add-order',
  templateUrl: './dialog-add-order.component.html',
  styleUrls: ['./dialog-add-order.component.scss']
})
export class DialogAddOrderComponent implements OnInit{

  loading = false;
  userId: string;
  user: User = new User();  
  order: Order = new Order();
  firestore: Firestore = inject(Firestore);

  newOrder: Array<any> = [];


  constructor(
    private route: ActivatedRoute,
    public dialogRef: MatDialogRef<DialogAddOrderComponent>) { }


    ngOnInit(): void {
      
    }


  addOrder(){ 
    this.newOrder.push(this.order.toJSON());
    console.log('dialog-add-order', this.newOrder);
    this.saveOrder(this.newOrder);
  }
  

  async saveOrder(newOrder) {
    await updateDoc(this.getSingleDocRef('users', this.userId), {orders: newOrder}).catch(
      (err) => { console.log(err); })
      .then(() =>{
        this.loading = false;
        this.dialogRef.close();
      })

  }

  
  getSingleDocRef(colId: string, docId: string) {
    return (doc(collection(this.firestore, colId), docId));
  }

}
