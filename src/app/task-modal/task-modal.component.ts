import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { createNewTask } from './task.service';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent implements OnInit {
  taskForm: FormGroup;
  currentStatus: string = 'open';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskModalComponent>
  ) {
    this.taskForm = this.fb.group({
      entity_name: ['', Validators.required],
      createdAt: ['', Validators.required],
      time_of_task: ['24:00', Validators.required],
      task_type: ['call', Validators.required], // Set default value to 'call'
      contact_person: ['', Validators.required],
      phone_number: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      status: ['open', Validators.required],
      note: [''],
    });
  }
  close(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.taskForm.patchValue({
      time_of_task: '12:00', // Setting default value to '12:00'
    });
  }

  setStatus(status: string) {
    this.currentStatus = status;
    this.taskForm.get('status')?.setValue(status);
  }

  onSubmit() {
    console.log(this.taskForm);

    if (this.taskForm.valid) {
      console.log(this.taskForm.value);
      createNewTask(this.taskForm.value);
      this.close()
    } else {
      console.log('Form is not valid');
      this.taskForm.markAllAsTouched();
    }
  }

  task = {
    entity_name: '',
    date: '',
    time_of_task: '',
    task_type: '',
    contact_person: '',
    phone_number: '',
    status: '',
    note: '',
  };
}
