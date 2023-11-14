import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../customer/dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { CrudServiceService } from '../services/crud-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  users = [];
  filteredUsers = [];
  unsubUser;
  firestore: Firestore = inject(Firestore);
  searchQuery: string;

  constructor(
    public dialog: MatDialog,
    public crud: CrudServiceService) { }


  ngOnInit(): void {
    this.unsubUser = this.subUserList();
  }

  ngOnDestroy() {
    this.unsubUser();
  }

  subUserList() {
    return onSnapshot(this.crud.getUserRef(), (list) => {
      this.users = [];
      this.filteredUsers = [];
      list.forEach((element) => {
        const userData = { ...element.data(), id: element.id };
        this.users.push(userData);
        this.filteredUsers.push(userData);
      })
    })
  }


  openDialogAddUser() {
    this.dialog.open(DialogAddUserComponent);
  }


  filterData() {
    this.filteredUsers = this.users.filter(input => {
      return (
        input.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        input.lastName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        input.city.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    });
  }

}
