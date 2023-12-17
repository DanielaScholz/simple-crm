import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Task } from 'src/models/task.class';
import { CrudServiceService } from '../services/crud-service.service';
import { onSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  task: Task = new Task;
  allTasks = [];
  dueDates = [];

  unsubTask;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    eventClick: this.handleDateClick.bind(this), 
    weekends: true,
    events: []
  };

  constructor(
    public crud: CrudServiceService,
    private router: Router) { }


  ngOnInit(): void {
    this.unsubTask = this.subTaskList();
  }

  ngOnDestroy() {
    this.unsubTask();
  }

  subTaskList() {
    return onSnapshot(this.crud.getTaskRef(), (list) => {
      const events = [];
      list.forEach(element => {
        const taskData = { ...element.data(), idField: element.id };
        const taskTitle = element.data()['title'];
        const taskPriority = this.checkPriority(element.data()['priority']);
        const taskDate = this.converteTaskDate(element.data()['dueDate']);
        let taskChecked = element.data()['checked'];
    
        if (!taskChecked) {
          events.push({ title: taskTitle, date: taskDate, color: taskPriority }); 
        }

      });
      this.calendarOptions.events = events;
    })
  }

  checkPriority(priority: string) {
    if (priority === 'low') {
      return '#61D271'
    }
    if (priority === 'medium') {
      return '#FD612C'
    }
    if (priority === 'high') {
      return '#E8384F'
    }
    return '#0000ff';
  }

  converteTaskDate(timestamp) {
    const date = new Date(timestamp); 
    const year = date.getFullYear(); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0'); 
    const formattedDate = `${year}-${month}-${day}`; 
    return formattedDate;
  }

  handleDateClick(arg: any) {
    // console.log(arg)
    // console.log(arg.event._def.title);
    // console.log(arg.event._def.date);
    this.router.navigate(['/tasks']);
  }

}
