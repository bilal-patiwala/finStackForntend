import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../task-table/task.service';
import { CommonModule } from '@angular/common';
import { changeStatus } from '../task-table/task.service';

@Component({
  selector: 'app-task-options-modal',
  styleUrls: ['./task-options-modal.component.css'],
  templateUrl: './task-options-modal.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class TaskOptionsModalComponent {
  task: Task;
  @Output() editClicked = new EventEmitter<void>();
  @Output() deleteClicked = new EventEmitter<void>();


  constructor(
    public dialogRef: MatDialogRef<TaskOptionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
  ) {
    this.task = data;
  }

  close(): void {
    this.dialogRef.close();
  }

  editTask(): void {
    this.editClicked.emit();
    console.log('Editing task:', this.task);
    this.dialogRef.close();
  }

  duplicateTask(): void {
    console.log('Duplicating task:', this.task);
    this.dialogRef.close();
  }

  changeStatusToClosed(): void {
    changeStatus(this.task)
    console.log('Changing status to closed:', this.task);
    this.dialogRef.close();
  }

  deleteTask(): void {
    console.log('Delete button clicked');
    this.deleteClicked.emit();
    this.dialogRef.close();
  }
}
