import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Shift } from '../shift';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrl: './shift.component.css'
})
export class ShiftComponent {
  public shiftList : Shift[] | null = null;
  public shiftListForPagination : Shift[] = [];
  totalItems = 0;
  pageSize = 10;
  currentPage = 0

  $event = PageEvent;
  constructor(private service: DataService){}

  ngOnInit(): void{
    this.service.getShift().subscribe
    ({
      next : (data) =>{
        this.shiftList = data;
        this.totalItems = data.length;
        this.shiftListForPagination = data.slice(this.currentPage*this.pageSize,
          this.currentPage*this.pageSize + this.pageSize
        )
      }
    })
  }

  selectedShift(id : Number){

  }

  pageChanged(event: PageEvent){
    this.shiftListForPagination = this.shiftList!.slice(event.pageIndex* event.pageSize,
      event.pageIndex*event.pageSize + event.pageSize
    );
  }
}
