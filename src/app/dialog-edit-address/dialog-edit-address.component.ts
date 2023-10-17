import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  user: User;
  userId: string;
  firestore: Firestore = inject(Firestore);

  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) { }

  ngOnInit(): void {
  }

  saveChanges() {
    this.loading = true;
    this.updateUser(this.userId,this.user)
      .then(() => {
        this.loading = false;
        this.closeDialog();
      })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  getSingleDocRef(collId: string, userId: string) {
    return (doc(collection(this.firestore, collId), userId));
  }

  async updateUser(userId: string, user: any) {
    await updateDoc(this.getSingleDocRef('users', userId), user.toJSON()).catch(
      (err) => { console.log(err); }
    );
  }

}
