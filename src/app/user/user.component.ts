import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, doc, collectionData, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { docData } from 'rxfire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  // allUsers$;
  // allUser;

  users = [];
  unsubUser;


  firestore: Firestore = inject(Firestore);


  constructor(public dialog: MatDialog) {

    // this.allUsers$ = collectionData(this.getUserRef());
    // this.allUser = this.allUsers$.subscribe((list) => {
    //   this.users = [];
    //   list.forEach((element) => {
    //     const userData = { ...element.data(), id: element.id };
    //     this.users.push(userData);
    //     console.log(this.users);
    //     console.log('User ist:', element);
    //   });
    // })

  }

  ngOnInit(): void {
    this.unsubUser = this.subUserList();

    // this.allUsers$ = collectionData(this.coll);
    // console.log(this.allUsers$);
    // this.allUsers$.subscribe((data) => {
    //   console.log('data of observable', data);
    // })
  }

  ngOnDestroy(){
    //this.allUser.unsubscribe();
    this.unsubUser();
  }


  subUserList(){
  return onSnapshot(this.getUserRef(), (list) =>{
    this.users = [];

      list.forEach((element) =>{
        const userData = { ...element.data(), id: element.id };
        this.users.push(userData);
       // console.log(this.users);
        // console.log(element);
        // console.log(element.id);
        // console.log(element.data());
      })
    })
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  getSingleDocRef(userId: string) {
    return (doc(collection(this.firestore, 'users'), userId));
  }

  async updateUser(userId:string) {
    await updateDoc(this.getSingleDocRef(userId), this.user.toJSON()).catch(
      (err) => { console.log(err); }
    );
  }

  openDialogAddUser() {
    this.dialog.open(DialogAddUserComponent);
  }

}
