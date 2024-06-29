import { Component, OnInit } from '@angular/core';
import {
  Task,
  TaskService,
  getAllTask,
  changeStatus,
  deleteTask,
} from './task.service';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { TaskOptionsModalComponent } from '../task-options-modal/task-options-modal.component';
import { FormsModule } from '@angular/forms';
import { TaskFilterModalComponent } from '../task-filter-modal/task-filter-modal.component';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    TaskOptionsModalComponent,
    TaskFilterModalComponent,
    FormsModule,
  ],
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
})
export class TaskTableComponent implements OnInit {
  tasks: any[] = [];
  groupedTasks: any = {};
  editModeTasks: { [key: string]: boolean } = {};
  optionsModalRefs: {
    [key: string]: MatDialogRef<TaskOptionsModalComponent> | null;
  } = {};
  filteredTasks: any[] = [];
  filterModalRef:MatDialogRef<TaskFilterModalComponent>|null = null
  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  taskskeys(): Array<string> {
    return Object.keys(this.groupedTasks).reverse();
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await getAllTask();
    this.tasks = this.tasks.map((task) => ({
      ...task,
      task_time: task.task_time,
      task_type:
        task.task_type == 'Call'
          ? 'call'
          : task.task_type == 'Meeting'
          ? 'meeting'
          : 'videoCall',
      status: task.status.toLowerCase(),
    }));
    this.filteredTasks = [...this.tasks]; 
    this.groupTasksByDate();
  }

  totalTaskOpen(dateString: string) {
    return this.groupedTasks[dateString].filter((t: Task) => t.status == 'open')
      .length;
  }

  formatDate(datestring: string): string {
    const date = new Date(datestring);
    const diff =
      Math.floor(
        (date.getTime() - new Date().getTime()) / (24 * 60 * 60 * 1000)
      ) + 1;
    if (diff < 0) {
      return `${Math.abs(diff)} days ago`;
    } else if (diff > 0) {
      return `in ${diff} days`;
    }

    return `Today`;
  }

  groupTasksByDate(): void {
    this.tasks.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    this.tasks.forEach((task) => {
      if (!this.groupedTasks[task.date]) {
        this.groupedTasks[task.date] = [];
      }
      this.groupedTasks[task.date].push(task);
    });
  }

  toggleEditMode(task: Task) {
    this.editModeTasks[task.id] = !this.editModeTasks[task.id];
  }

  async save(task: Task) {
    console.log(task);
    let id = task.id;
    let curTask: any = task;
    console.log(curTask);
    
    let time = "" ;
    console.log(curTask.task_time.split(" "));
    
    if(curTask.task_time.split(" ").length==1){
      let [hours, minutes] = curTask.task_time.split(':').map(Number);
      const period = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      time = `${hours}:${minutes.toString().padStart(2, '0')} ${period}`
    }
    else{
      time=curTask.task_time
    }

    curTask = {
      ...curTask,
      time_of_task: time,
    };
    delete curTask['task_time'];
    delete curTask['id'];
    console.log(curTask);

    const response = await fetch(
      `https://finstackbackend.onrender.com/task/${task.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(curTask),
      }
    );
    const data = await response.json()
    console.log(data);
    
    this.editModeTasks[task.id] = !this.editModeTasks[task.id];
    if(data.status==200){
      window.location.reload()
    }
  }

  async changeStatusToClosed(task: Task) {
    changeStatus(task);
    // let index = this.tasks.find((i) => i.id == task.id);
    // this.tasks[index] = { ...task, status: 'closed' };
    // this.loadTasks();
    window.location.reload()
  }

  async deleteTask(task: Task) {
    console.log('Deleting task:', task);
    await deleteTask(task);
    window.location.reload()
  }

  openOptionsModal(task: Task, event: MouseEvent): void {
    const modalId = task.id.toString();

    if (this.optionsModalRefs[modalId]) {
      this.optionsModalRefs[modalId]?.close();
      this.optionsModalRefs[modalId] = null;
    } else {
      const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
      const dialogConfig: MatDialogConfig = {
        data: task,
        width: '250px',
        position: {
          top: `${-250}px`,
          left: `${buttonRect.left - 250}px`,
        },
        hasBackdrop: true,
        panelClass: ['custom-dialog-container', 'mat-dialog-position-fixed'],
      };

      const dialogRef = this.dialog.open(
        TaskOptionsModalComponent,
        dialogConfig
      );

      dialogRef.componentInstance.editClicked.subscribe(() => {
        this.toggleEditMode(task);
      });
      dialogRef.componentInstance.deleteClicked.subscribe(() => {
        this.deleteTask(task);
      });

      this.optionsModalRefs[modalId] = dialogRef;

      dialogRef.afterClosed().subscribe(() => {
        this.optionsModalRefs[modalId] = null;
      });
    }
  }
  openFilterModal(event: MouseEvent): void {
    if(this.filterModalRef){
      this.filterModalRef.close()
      this.filterModalRef=null
    }
    else{
      const dialogConfig: MatDialogConfig = {
        width: '250px',
        
        position: {
          top: `-200px`,
          left: `600px`,
        },
        hasBackdrop: true,
        panelClass: ['custom-dialog-container', 'mat-dialog-position-fixed'],
      };
  
      const dialogRef = this.dialog.open(TaskFilterModalComponent, dialogConfig);
  
      this.filterModalRef = dialogRef
      
      dialogRef.componentInstance.filterApplied.subscribe((filters: any) => {
        this.applyFilter(filters);
        dialogRef.close()
      });
    }
    


  }

  applyFilter(filters: any): void {
    this.filteredTasks = this.tasks.filter(task => {
      return (
        (filters.call && task.task_type === 'call') ||
        (filters.meeting && task.task_type === 'meeting') ||
        (filters.videoCall && task.task_type === 'videoCall')
      );
    });
    this.groupTasksByFilteredType();  
  }

  groupTasksByFilteredType(): void {
    this.groupedTasks = {};
    
    this.filteredTasks.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    this.filteredTasks.forEach((task) => {
      if (!this.groupedTasks[task.date]) {
        this.groupedTasks[task.date] = [];
      }
      this.groupedTasks[task.date].push(task);
    });
  }

}
