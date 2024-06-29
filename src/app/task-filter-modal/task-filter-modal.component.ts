import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-filter-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-filter-modal.component.html',
  styleUrl: './task-filter-modal.component.css'
})
export class TaskFilterModalComponent {
  @Output() filterApplied = new EventEmitter<any>();
constructor(public dialogref:MatDialogRef<TaskFilterModalComponent>){

}
  filters = {
    call: false,
    meeting: false,
    videoCall: false
  };

  applyFilter() {
    this.filterApplied.emit(this.filters);
  }
}
