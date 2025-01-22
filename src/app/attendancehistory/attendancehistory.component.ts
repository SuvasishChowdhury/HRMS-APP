import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Attendance } from '../attendance';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-attendancehistory',
  templateUrl: './attendancehistory.component.html',
  styleUrl: './attendancehistory.component.css'
})
export class AttendancehistoryComponent {
  attendance: Attendance[] | null = null;
    public attnListForPagination : Attendance[] = [];
    totalItems = 0;
    pageSize = 10;
    currentPage = 0;
    $event = PageEvent;
  constructor(private service:DataService){}

  ngOnInit(){
    const eId = Number(localStorage.getItem('employeeId'));
    this.service.getAttendanceHistory(eId)
    .subscribe({
      next:(attn) =>{
        this.attendance = attn;
        this.totalItems = attn.length;
        this.attnListForPagination = attn.slice(this.currentPage*this.pageSize,
          this.currentPage*this.pageSize + this.pageSize
        );
      }
    });
  }

    pageChanged(event: PageEvent) {
      this.attnListForPagination =  this.attendance!.slice(event.pageIndex*event.pageSize,
        event.pageIndex*event.pageSize + event.pageSize);
    }
    public selectedatten(id : number){
      this.service.setSelectedEmpId(id);
    }

}
