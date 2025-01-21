import { NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    EmployeelistComponent,
    EmployeeinfoComponent,
    LoginComponent,
    LogoutComponent,
    LayoutComponent,
    DashboardComponent,
    AttendancehistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule
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
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
