import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {provideNativeDateAdapter} from '@angular/material/core';
import { Section } from '../section';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { Sisterconcern } from '../sisterconcern';
import { Shift } from '../shift';
import { Attnproc } from '../attnproc';
import moment from 'moment';

@Component({
  selector: 'app-attendanceprocess',
  templateUrl: './attendanceprocess.component.html',
  styleUrl: './attendanceprocess.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceprocessComponent {
  sectionlist : Section[] | null = null;
  shiftDD : Shift[] | null = null;
  public attProc : Attnproc = {
    sectionId: 0,
    shiftId: 0,
    fromDate: '',
    toDate: ''
  };
  sisterConcernDD : Sisterconcern[] | null = null;
  checkoutForm = this.formBuilder.group({
    fromDate: '',
    toDate: ''
  });
  $event = PageEvent;
  clipInMovieWatching: any;
  
  attenProcess = new FormGroup({
      sectionId: new FormControl(0, { validators : [Validators.required]}),
      shiftId: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', Validators.required)
  });
  constructor(private service: DataService,
    private formBuilder : FormBuilder
  ){}

  ngOnInit(){
    this.service.getSisterConcernList().subscribe(
      {
        next:(data)=>{
          this.sisterConcernDD = data;
        }
      }
    );
    this.service.getShift().subscribe(
      {
        next:(data)=>{
          this.shiftDD = data;
        }
      }
    );
  }
  onSubmit() {
    if(this.attenProcess.valid){
      this.attProc.sectionId = Number(this.attenProcess.value.sectionId);
      this.attProc.shiftId = Number(this.attenProcess.value.shiftId);
      this.attProc.fromDate = moment(this.attenProcess.value.fromDate).format("MM/DD/YYYY");
      this.attProc.toDate = moment(this.attenProcess.value.fromDate).format("MM/DD/YYYY");

      this.service.startAttendanceProcess(this.attProc).subscribe(
        {
          next: (res)=>{
            console.log(res);
          },
          error: (err) =>{
            console.log(err);
          }
        }
      );
    }
  }

  update() {
    
  }
  getSection(event: any) {
    console.log(event.target.value);
    const id = Number(event.target.value);
    if(id > 0){
      this.service.getSectionList(id).subscribe(
        {
          next:(data)=>{
            
            this.sectionlist = data;
          }
        }
      )
    }
  }
}
