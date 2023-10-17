import { Component, inject } from '@angular/core';
import { Firestore, deleteDoc, doc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-delete-user',
  templateUrl: './dialog-delete-user.component.html',
  styleUrls: ['./dialog-delete-user.component.scss']
})
export class DialogDeleteUserComponent {
  userId: string;
  user: User = new User();
  firestore: Firestore = inject(Firestore);


  constructor(
  public dialogRef: MatDialogRef<DialogDeleteUserComponent>,
  private router: Router){}

  async deleteUser(){
    await deleteDoc(doc(this.firestore, "users", this.userId))
    .then(()=> {
      this.closeDialog();
      this.router.navigate(['user']);
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
