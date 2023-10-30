import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { CrudServiceService } from '../services/crud-service.service';


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
  dateOfBirth: Date;

  constructor(
    public crud: CrudServiceService,
    public dialogRef: MatDialogRef<DialogEditUserComponent>){}

  saveChanges() {
    this.loading = true;
    this.crud.update(this.userId, this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
  }
}
