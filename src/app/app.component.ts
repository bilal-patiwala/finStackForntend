import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskTableComponent } from './task-table/task-table.component';
import { Overlay, PositionStrategy, ConnectedPosition } from '@angular/cdk/overlay';

import {
  MatDialog,
  MatDialogConfig,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TaskTableComponent,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'finStackForntend';
  taskModalRef: MatDialogRef<TaskModalComponent> | null = null;
  constructor(private dialog: MatDialog) {}

  openTaskModal(event: MouseEvent): void {
    if (this.taskModalRef) {
      this.taskModalRef?.close();
      this.taskModalRef = null;
    } else {
      const buttonRect = (event.target as HTMLElement).getBoundingClientRect();
      const dialogWidth = 500;
      const dialogConfig: MatDialogConfig = {
        width: `${dialogWidth}px`,
        position: {
          left: `${buttonRect.left+100}px`,
          top: `${buttonRect.top-500}px`,
        },
        hasBackdrop: false,
        panelClass: 'mat-dialog-position-fixed',
      };

      const dialogRef = this.dialog.open(TaskModalComponent, dialogConfig);
      //

      this.taskModalRef = dialogRef;
    }
  }
}
