import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})

export class CrudServiceService {
  firestore: Firestore = inject(Firestore);
  user: User = new User();


  constructor(public route: ActivatedRoute) {}







  getSingleDocRef(collId: string, userId: string) {
    return (doc(collection(this.firestore, collId), userId));
  }

  async update(userId:string, list:any){
    await updateDoc(this.getSingleDocRef('users', userId), list).catch(
      (err) => { console.log(err); }
      );
  }


  // await updateDoc(this.getSingleDocRef('users', this.userId), { orders: this.allOrders })


  // async updateUser(userId: string, user: any) {
  //   await updateDoc(this.getSingleDocRef('users', userId), user.toJSON()).catch(
  //     (err) => { console.log(err); }
  //   );
  // }


  // async updateNotes(userId: string, newNote: any) {
  //   await updateDoc(this.getSingleDocRef('users', userId), { notes: newNote }).catch(
  //     (err) => { console.log(err); }
  //   );
  // }







}
