import { query } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc, getDocs, onSnapshot, where } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
// import { collection } from 'rxfire/firestore';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  userId: string;
  user: User = new User();

  firestore: Firestore = inject(Firestore);


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      console.log(this.userId);
      this.getUserData();
    })
  }

  async getUserData() {
    let ref = doc(this.firestore, 'users', this.userId);
    let docSnap = await getDoc(ref);
    let userData = docSnap.data();
    this.user = new User(userData);
  }

  getSingleDocRef(colId: string, docId: string) {
    return (doc(collection(this.firestore, colId), docId));
  }

  editUserDetail(){

  }

  editAddressDetail(){
    
  }



}
