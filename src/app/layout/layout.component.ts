import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Employee } from '../employee';
import { DataService } from '../data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  employee : Employee | null = null;

  constructor(@Inject(PLATFORM_ID) private plartformId: object, private service: DataService){}
  ngOnInit(){
    if(isPlatformBrowser(this.plartformId)){
      const eId = Number(localStorage.getItem('employeeId'));
      console.log(eId);
      this.service.getEmployee(eId)
      .subscribe(x=>this.employee = x);
      console.log(this.employee);

    }
    console.log(this.employee);
  }
}
