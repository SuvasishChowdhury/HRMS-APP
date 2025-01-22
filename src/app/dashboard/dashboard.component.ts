import { Component, Inject } from '@angular/core';
import { DataService } from '../data.service';
import { DashboardVM } from '../dashboardinfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public dashboard : DashboardVM | null = null;
  constructor(private service: DataService,
    @Inject('LOCAL_STORAGE') private localStorage : Storage | null,
    private router : Router
  ){}

  ngOnInit(){
    if(this.localStorage){
      const empId = Number(localStorage.getItem('employeeId'));
      this.service.getDashbordInfo(empId)
      .subscribe({
        next: (db) => {
          this.dashboard = db;
          console.log(db);
          console.log(this.dashboard?.lastSevendDaysAttendance);
        }
      })
    }
  }
  routePage(){
    this.router.navigate(['layout/attendancehistory']);
  }
}
