import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {MatDialog, matDialogAnimations, MatDialogModule} from "@angular/material/dialog";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { EmployeeinfoComponent } from './employeeinfo/employeeinfo.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';
import { LogoutComponent } from './logout/logout.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { isPlatformBrowser } from '@angular/common';
import { AttendancehistoryComponent } from './attendancehistory/attendancehistory.component';
import { ShiftComponent } from './shift/shift.component';
import { AttendanceprocessComponent } from './attendanceprocess/attendanceprocess.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

// import { CalendarModule } from "primeng/calendar";

@NgModule({
  declarations: [
    AppComponent,
    EmployeelistComponent,
    EmployeeinfoComponent,
    LoginComponent,
    LogoutComponent,
    LayoutComponent,
    DashboardComponent,
    AttendancehistoryComponent,
    ShiftComponent,
    AttendanceprocessComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule, 
    MatDatepickerModule
  ],
  providers: [
    {
      provide: 'LOCAL_STORAGE',
      useFactory: (platformId: Object) => {
        return isPlatformBrowser(platformId) ? localStorage : null;
      },
      deps: [PLATFORM_ID],
    },
    provideClientHydration(),
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true},
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
