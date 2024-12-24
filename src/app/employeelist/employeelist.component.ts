import { Component } from '@angular/core';
import { Employee } from '../employee';
import { DataService } from '../data.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrl: './employeelist.component.css'
})
export class EmployeelistComponent {
  public employeeList : Employee[] = [];
  public employeeListForPagination : Employee[] = [];
  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  $event = PageEvent;
  
  constructor(private service : DataService){}

  ngOnInit(){
    this.service.getEmployeeList()
      .subscribe(res=> this.employeeList = res
      );
      this.service.getEmployeeList()
      .subscribe(res=> this.totalItems = res.length
      );
      this.service.getEmployeeList()
      .subscribe(res=>this.employeeListForPagination = res.slice(this.currentPage*this.pageSize,
        this.currentPage*this.pageSize + this.pageSize));
  }

  // items = this.service.getEmployeeListByPagination(this.currentPage, this.pageSize); // Fetch data for the current page
  
  pageChanged(event: PageEvent) {
    this.employeeListForPagination =  this.employeeList.slice(event.pageIndex*event.pageSize,
      event.pageIndex*event.pageSize + event.pageSize);
  }
  public selectedEmp(id : number){
    this.service.setSelectedEmpId(id);
  }
}
