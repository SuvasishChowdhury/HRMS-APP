import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { AuthGuard } from './auth.guard';
import path from 'path';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeinfoComponent } from './employeeinfo/employeeinfo.component';
import { AttendancehistoryComponent } from './attendancehistory/attendancehistory.component';
import { ShiftComponent } from './shift/shift.component';
import { AttendanceprocessComponent } from './attendanceprocess/attendanceprocess.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },         // Login page
  {
    path: 'layout',                                     // Layout as parent route
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },   // Child components
      { path: 'employeelist', component: EmployeelistComponent },
      { path: 'employeeinfo', component: EmployeeinfoComponent },
      { path: 'attendancehistory', component: AttendancehistoryComponent },
      { path: 'shift', component: ShiftComponent },
      { path: 'attendanceprocess', component: AttendanceprocessComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
