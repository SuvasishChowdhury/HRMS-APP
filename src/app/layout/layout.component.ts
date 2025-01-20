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

  constructor(@Inject(PLATFORM_ID) private plartformId: object,
              @Inject('LOCAL_STORAGE') private localStorage: Storage | null,
              private service: DataService){}
  ngOnInit(){
    if(this.localStorage){
      const eId = Number(this.localStorage.getItem('employeeId'));
      console.log(eId);
      this.service.getEmployee(eId)
      .subscribe(x=>this.employee = x);
      console.log(this.employee);

    }
    console.log(this.employee);
  }
}
