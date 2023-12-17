export class Task {
    checked: boolean;
    title: string;
    dueDate: any;
    priority: string;
    status: string;

    public STATUS_TODO = 'todo';
    public STATUS_PROGRESS = 'progress';
    public STATUS_FEEDBACK = 'feedback';
    public STATUS_DONE = 'done';

    constructor(obj?: any) {
        this.checked = obj ? obj.checked : false;
        this.title = obj ? obj.title : '';
        this.dueDate = obj ? obj.dueDate : '';
        this.priority = obj ? obj.priority : '';
        this.status = obj ? obj.status : '';
    }


    public toJSON() {
        return {
            checked: this.checked,
            title: this.title,
            dueDate: this.dueDate,
            priority: this.priority,
            status: this.status,
        }
    }
}