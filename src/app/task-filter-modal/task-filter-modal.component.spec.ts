import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFilterModalComponent } from './task-filter-modal.component';

describe('TaskFilterModalComponent', () => {
  let component: TaskFilterModalComponent;
  let fixture: ComponentFixture<TaskFilterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFilterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskFilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
