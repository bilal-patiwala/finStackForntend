import { Component, OnInit } from '@angular/core';
import { Task, TaskService, getAllTask, changeStatus } from './task.service';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { TaskOptionsModalComponent } from '../task-options-modal/task-options-modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, MatDialogModule, TaskOptionsModalComponent, FormsModule],
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

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  taskskeys(): Array<string> {
    console.log(Object.keys(this.groupedTasks));
    return Object.keys(this.groupedTasks).reverse();
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks() {
    this.tasks = await getAllTask();
    console.log(this.tasks);
    this.groupTasksByDate();
  }

  totalTaskOpen(dateString: string) {
    return this.groupedTasks[dateString].filter((t: Task) => t.status == 'Open')
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
    this.tasks.forEach((task) => {
      if (!this.groupedTasks[task.date]) {
        this.groupedTasks[task.date] = [];
      }
      this.groupedTasks[task.date].push(task);
    });
    console.log(this.groupedTasks);
    
  }

  toggleEditMode(task: Task) {
    this.editModeTasks[task.id] = !this.editModeTasks[task.id];
  }

  save(task: Task) {
    this.editModeTasks[task.id] = !this.editModeTasks[task.id];
  }

  changeStatusToClosed(task:Task){
    changeStatus(task)
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
          top: `${buttonRect.bottom - 250}px`,
          left: `${buttonRect.right - 250}px`,
        },
      };

      const dialogRef = this.dialog.open(
        TaskOptionsModalComponent,
        dialogConfig
      );

      dialogRef.componentInstance.editClicked.subscribe(() => {
        this.toggleEditMode(task);
      });

      this.optionsModalRefs[modalId] = dialogRef;

      dialogRef.afterClosed().subscribe(() => {
        this.optionsModalRefs[modalId] = null;
      });
    }
  }
}
