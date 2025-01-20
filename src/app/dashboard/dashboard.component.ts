import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Dashboardinfo } from '../dashboardinfo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public dashboard : Dashboardinfo | null = null;
  constructor(private service: DataService){}

  ngOnInit(){
    const empId = Number(localStorage.getItem('employeeId'));
    this.service.getDashbordInfo(empId)
    .subscribe({
      next: (db) => {
        this.dashboard = db;
        console.log(db);
      }
    })
  }
}
