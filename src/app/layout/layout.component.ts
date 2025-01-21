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
  imgSrc: string | undefined;

  constructor(@Inject(PLATFORM_ID) private plartformId: object,
              @Inject('LOCAL_STORAGE') private localStorage: Storage | null,
              private service: DataService){}
  ngOnInit(): void{
    if(this.localStorage){
      const eId = Number(this.localStorage.getItem('employeeId'));
      this.service.getEmployee(eId)
      .subscribe({
        next: (emp) => {
          this.employee = emp;
          this.imgSrc = `data:image/png;base64,${this.employee.image}`;
        },
        error: (err) => {
          console.error('Error loading image:', err);
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.imgSrc) {
      URL.revokeObjectURL(this.imgSrc);
    }
  }
}
