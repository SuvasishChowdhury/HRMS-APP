import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceprocessComponent } from './attendanceprocess.component';

describe('AttendanceprocessComponent', () => {
  let component: AttendanceprocessComponent;
  let fixture: ComponentFixture<AttendanceprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttendanceprocessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttendanceprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
