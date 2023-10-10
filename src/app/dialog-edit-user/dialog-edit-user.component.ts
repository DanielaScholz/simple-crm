import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  user: User;
  userId: string;
  firestore: Firestore = inject(Firestore);

  loading= false;
  dateOfBirth: any = Date;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>){}



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
