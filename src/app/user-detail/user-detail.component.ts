import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, docData } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user.class';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogDeleteUserComponent } from '../dialog-delete-user/dialog-delete-user.component';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  userId: string;
  user: User = new User();
  firestore: Firestore = inject(Firestore);


  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      console.log(this.userId);
      this.getUserData();
    })
  }

  getUserData() {
    let ref = doc(this.firestore, 'users', this.userId);
    docData(ref).subscribe((userData: any) => {
      console.log(userData);
      this.user = new User(userData);
    })
  }

  getSingleDocRef(colId: string, docId: string) {
    return (doc(collection(this.firestore, colId), docId));
  }

  editUserDetail() {
    let dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editAddressDetail() {
    let dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  deleteUser() {
    let dialog = this.dialog.open(DialogDeleteUserComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }



}
