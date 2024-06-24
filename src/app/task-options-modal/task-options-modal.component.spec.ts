import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOptionsModalComponent } from './task-options-modal.component';

describe('TaskOptionsModalComponent', () => {
  let component: TaskOptionsModalComponent;
  let fixture: ComponentFixture<TaskOptionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskOptionsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskOptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
