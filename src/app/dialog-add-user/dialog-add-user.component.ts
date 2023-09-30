import { Component, inject } from '@angular/core';
import { Firestore, collection, doc, addDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.class';

import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})

export class DialogAddUserComponent {
  user = new User();
  dateOfBirth: any = Date;
  loading = false;
  firestore: Firestore = inject(Firestore);


  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new MyErrorStateMatcher();


  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {
    //const itemCollection = collection(this.firestore, 'items');
  }

  async saveUser() {
    this.user.dateOfBirth = this.dateOfBirth.getTime();
    //console.log('the user is:', this.user);
    this.loading = true;

    await addDoc(collection(this.firestore, 'users'), this.user.toJSON())
    .then((info:any) =>{
      this.loading = false;
      // console.log(info)
      // console.log(info.id)
      this.closeDialog();
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }


}
