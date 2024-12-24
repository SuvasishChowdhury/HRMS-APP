import { Component } from '@angular/core';
import { Employee } from '../employee';
import { DataService } from '../data.service';

@Component({
  selector: 'app-employeeinfo',
  templateUrl: './employeeinfo.component.html',
  styleUrl: './employeeinfo.component.css'
})
export class EmployeeinfoComponent {

  public empInfo : any;
  public employee : Employee = {
    id : 0,
    name : '',
    cardNo: '',
    fatherName: '',
    motherName: '',
    gender: '',
    dob: ''
  }
  constructor(private service : DataService){}

  ngOnInit() : void{
    this.service.selectedItem$.subscribe((id) => {
      if(id){
        this.service.getEmployee(id)
          .subscribe(res=> this.employee = res);
      }
    })
  }
}
