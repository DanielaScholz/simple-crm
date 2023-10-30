import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})

export class CrudServiceService {
  firestore: Firestore = inject(Firestore);
  user: User = new User();

  allOrders: { amount: number; price: number; item: string; }[] = [];



  constructor(public route: ActivatedRoute) {}



  getUserRef() {
    return collection(this.firestore, 'users');
  }

  getSingleDocRef(collId: string, userId: string) {
    return (doc(collection(this.firestore, collId), userId));
  }

  
  getUserById(userId:string) {
    const userIdRef = doc(this.firestore, 'users', userId);    
    return docData(userIdRef, { idField: 'id' });
  }

  async update(userId:string, list:any){
    await updateDoc(this.getSingleDocRef('users', userId), list).catch(
      (err) => { console.log(err); }
      );
  }

  async save(json){
    await addDoc(this.getUserRef(), json)
  }

  async deleteUser(userId:string){
    await deleteDoc(doc(this.firestore, 'users', userId))
  }

}
