export class Task {
    title: string;
    dueDate: any;
    priority: string;
    status: string;


      // Definiere die verfügbaren Statusoptionen
  public STATUS_TODO = 'todo';
  public STATUS_PROGRESS = 'progress';
  public STATUS_FEEDBACK = 'feedback';
  public STATUS_DONE = 'done';

  constructor(obj?: any){
    this.title = obj? obj.title : '';
    this.dueDate = obj? obj.dueDate : '';
    this.priority = obj? obj.priority : '';
    this.status = obj? obj.status : '';
}


public toJSON(){
    // const priorityString = this.getPriorityString();
    // const statusString = this.getStatusString();
    return{
        title: this.title,
        dueDate: this.dueDate,
        priority: this.priority,
        status: this.status,
    }
}

// private getPriorityString(): string {
//     if (this.priority.low) {
//       return "low";
//     } else if (this.priority.middle) {
//       return "middle";
//     } else if (this.priority.high) {
//       return "high";
//     } else {
//       return ""; // Gibt eine leere Zeichenkette zurück, wenn keine Priorität ausgewählt ist
//     }
//   }

//   private getStatusString(): string {
//     if (this.status.todo) {
//       return "todo";
//     } else if (this.status.progress) {
//       return "progress";
//     } else if (this.status.feedback) {
//       return "feedback";
//     } else if (this.status.done) {
//         return "done";
//     } else {
//         return ""; // Gibt eine leere Zeichenkette zurück, wenn keine Priorität ausgewählt ist
//       }
//   }

}