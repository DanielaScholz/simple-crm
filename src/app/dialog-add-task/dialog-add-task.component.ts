import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { CrudServiceService } from '../services/crud-service.service';
import { Firestore } from '@angular/fire/firestore';

// interface Priority {
//   value: string;
// }

// interface Status {
//   value: string;
// }


@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent {
  firestore: Firestore = inject(Firestore);


  loading = false;
  task: Task = new Task();
  dueDate: Date;
  minDate: Date;

  priorityStatus = ['low', 'medium', 'high'];
  // statusValue = ['todo', 'progress', 'feedback', 'done'];

  constructor(
    public crud: CrudServiceService,
    public dialogRef: MatDialogRef<DialogAddTaskComponent>) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const currentDay = new Date().getDate();
    this.minDate = new Date(currentYear, currentMonth - 1, currentDay);
  }


  saveTask() {
    this.task.dueDate = this.dueDate.getTime();
    this.loading = true;
    this.crud.saveTask(this.task.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
  }
}
