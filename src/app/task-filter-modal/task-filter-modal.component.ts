import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-filter-modal.component.html',
  styleUrl: './task-filter-modal.component.css'
})
export class TaskFilterModalComponent {
  @Output() filterApplied = new EventEmitter<any>();

  filters = {
    call: false,
    meeting: false,
    videoCall: false
  };

  applyFilter() {
    this.filterApplied.emit(this.filters);
  }
}
