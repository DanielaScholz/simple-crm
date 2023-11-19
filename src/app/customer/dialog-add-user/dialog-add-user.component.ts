import { Component, inject } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { CrudServiceService } from '../../services/crud-service.service';

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})

export class DialogAddUserComponent {
  user = new User();
  loading = false;
  firestore: Firestore = inject(Firestore);

  dateOfBirth: Date;
  minDate: Date;
  maxDate: Date;

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    public crud: CrudServiceService) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear, currentMonth - 1, currentDay);
  }

  
   saveUser() {
    console.log(this.dateOfBirth);    
    this.user.dateOfBirth = this.dateOfBirth.getTime();
    console.log(this.user.dateOfBirth);
    console.log(new Date(this.user.dateOfBirth));
    
    this.loading = true;
    this.crud.save(this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
  }

}
