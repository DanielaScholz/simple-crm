import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from 'src/models/task.class';
import { CrudServiceService } from '../services/crud-service.service';

@Component({
  selector: 'app-dialog-edit-task',
  templateUrl: './dialog-edit-task.component.html',
  styleUrls: ['./dialog-edit-task.component.scss']
})
export class DialogEditTaskComponent {
  loading = false;
  task: Task;
  id;
  priorityStatus = ['low', 'medium', 'high'];
  dueDate: Date;
  minDate: Date;



  constructor(
    public crud: CrudServiceService,
    public dialogRef: MatDialogRef<DialogEditTaskComponent>) { }


  updateTask() {
    this.loading = true;
    this.crud.updateTask(this.id, this.task.toJSON())
    .then(() => {
      this.loading = false;
      this.dialogRef.close();
    })

  }
}
