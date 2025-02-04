import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceprocessComponent } from './attendanceprocess/attendanceprocess.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private dialog: MatDialog) {}

  openPopup() {
    this.dialog.open(AttendanceprocessComponent);
  }
}