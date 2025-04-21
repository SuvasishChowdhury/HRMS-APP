import { ApplicationRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // ✅ Import dayGrid plugin
import interactionPlugin from '@fullcalendar/interaction'; // ✅ Import interaction plugin
import { Calendar, CalendarOptions, DayCellMountArg } from '@fullcalendar/core';
import { DataService } from '../data.service';
import { CalendarVM, WeekendDay } from '../calendar';
import { take } from 'rxjs';


@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  calendarOptions: any = null;
  month : number = 0;
  year : number = 0;
  events = new Array();
  
  calendar: CalendarVM[] | null = [];
  weekendDay: number[] | null  = [];
  constructor(private service:DataService,
    private appRef: ApplicationRef
  ){}


  ngOnInit(){
    this.month = (new Date().getMonth() + 1); 
    this.year = new Date().getFullYear();
    this.service.getCalendarInfo(4,this.month, this.year)
    .subscribe({
      next:(ref)=>{
        console.log(ref);
        this.calendar = ref;
        for(const j of ref){
          for (const i of j.holiDay) {
            this.events.push({
                event_id: 1,
                title: i.hoildayName,
                description: i.description,
                start: i.fromDate,
                end: i.toDate,
                backgroundColor: '#0073b7', //Blue
                borderColor: '#0073b7' //Blue
            });
          };
          for (const i of j.offDay) {
              this.events.push({
                  event_id: 2,
                  title: i.title,
                  description: i.description,
                  start: i.applicableDate,
                  end: i.applicableDate,
                  backgroundColor: '#00a65a', //Success (green)
                  borderColor: '#00a65a' //Success (green)
              });
          };
          this.weekendDay = j.weekendDay;
        }
        this.calendarEvents(this.events);
      }
    });
  }
  
  calendarEvents(event: any){
    this.events = event;
    console.log(event);
    console.log(this.events);
    console.log(this.calendar);
    console.log(this.weekendDay);
    this.appRef.isStable.pipe(take(1)).subscribe(() => {
      this.calendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        firstDay: 6,
        businessHours: [
          {
            daysOfWeek: this.weekendDay, // ✅ Friday (5) and Saturday (6)
            startTime: '00:00', // ✅ Full day
            endTime: '23:59',
          }
        ],
        selectable: true, // ✅ Allows date selection
        editable: true, // ✅ Allows dragging/resizing events
        events : this.events,
        dayCellDidMount: (info: DayCellMountArg) => {
          if (this.weekendDay?.includes(info.date.getDay())) {
            info.el.style.backgroundColor = 'rgba(255, 99, 71, 0.3)'; // Light red background
          }
        }
      };
    });
  }
  // handleEventClick(info: any) {
  //   alert('Event: ' + info.event.title);
  // }
}
