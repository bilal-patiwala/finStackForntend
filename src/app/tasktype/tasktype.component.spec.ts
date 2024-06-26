import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasktypeComponent } from './tasktype.component';

describe('TasktypeComponent', () => {
  let component: TasktypeComponent;
  let fixture: ComponentFixture<TasktypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasktypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasktypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
