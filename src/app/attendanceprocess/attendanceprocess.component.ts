import { Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-attendanceprocess',
  templateUrl: './attendanceprocess.component.html',
  styleUrl: './attendanceprocess.component.css'
})
export class AttendanceprocessComponent {

  constructor(private matDialog: MatDialog){}

  ngOnInit(): void{
    this.showPopup(1);
  }
  showPopup(Id : number){
    this.matDialog.open(AttendanceprocessComponent, {
        disableClose: true,
        width: "1200px",
        data: {
          Title: "im vuong le - dev VietNam",
          sepId:Id,
          Message: "test-dialog"
        },
      })
        .afterClosed()
        .subscribe((result) => {
          if (result == "Yes") {
            
          }
        });
}

}
