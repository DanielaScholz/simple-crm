import { Component, inject } from '@angular/core';
import { Firestore} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { CrudServiceService } from '../../services/crud-service.service';

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
    public crud: CrudServiceService,
    public dialogRef: MatDialogRef<DialogDeleteUserComponent>,
    private router: Router) { }

  deleteUser() {
    this.crud.deleteUser(this.userId)
      .then(() => {
        this.closeDialog();
        this.router.navigate(['user']);
      })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
