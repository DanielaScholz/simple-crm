import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/models/task.class';
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})

export class CrudServiceService {
  firestore: Firestore = inject(Firestore);
  user: User = new User();
  task: Task = new Task();

  allOrders: { amount: number; price: number; item: string; }[] = [];
  allTasks: Task[] = [];

  constructor(public route: ActivatedRoute) { }

  getRef(coll: string) {
    return collection(this.firestore, coll)
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }

  getTaskRef() {
    return collection(this.firestore, 'tasks');
  }

  getNoteRef() {
    return collection(this.firestore, 'notes');
  }

  getSingleDocRef(collId: string, userId: string) {
    return (doc(collection(this.firestore, collId), userId));
  }

  getUserById(userId: string) {
    const userIdRef = doc(this.firestore, 'users', userId);
    return docData(userIdRef, { idField: 'id' });
  }


  //UPDATE-methode
  async update(userId: string, list: any) {
    await updateDoc(this.getSingleDocRef('users', userId), list).catch(
      (err) => { console.log(err); }
    );
  }

  async updateTask(id: string, list: any) {
    await updateDoc(this.getSingleDocRef('tasks', id), list).catch(
      (err) => { console.log(err); }
    );
  }

  async updateNote(id: string, list: any) {
    await updateDoc(this.getSingleDocRef('notes', id), list).catch(
      (err) => { console.log(err); }
    );
  }

  //SAVE-methode
  async save(json) {
    await addDoc(this.getUserRef(), json);
  }

  async saveTask(json) {
    await addDoc(this.getTaskRef(), json);
  }

  async saveNote(json) {
    await addDoc(this.getNoteRef(), json)
  }

  //DELETE-methode
  async deleteUser(userId: string) {
    await deleteDoc(doc(this.firestore, 'users', userId))
  }

}
