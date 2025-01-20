import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { AuthGuard } from './auth.guard';
import path from 'path';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
