import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { BehaviorSubject, Observable } from 'rxjs';
import { JWTTokenResponse } from './jwttoken-response';
import { Login } from './login';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardVM } from './dashboardinfo';
import { Attendance } from './attendance';
import { Shift } from './shift';

const appUrl = 'http://hrapi.beacontech.xyz/api'; 
// const appUrl = 'https://localhost:7133/api'; 

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public employee: Employee[] = [];

  private selectedItemSubject = new BehaviorSubject<number | null>(null);
  selectedItem$ = this.selectedItemSubject.asObservable();

  constructor(private http: HttpClient) { }

  public getEmployeeList() : Observable<Employee[]>{
    return this.http.get<Employee[]>(`${appUrl}/hrms`);
  }
  public getEmployeeListByPagination(cp:number,ps:number) : Observable<Employee[]>{
    return this.http.get<Employee[]>(`${appUrl}/hrms/${cp},${ps}`);
  }
  public setSelectedEmpId(id: number){
    this.selectedItemSubject.next(id);
  }

  public getEmployee(id: number) : Observable<Employee>{
    return this.http.get<Employee>(`${appUrl}/hrms/${id}`);
  }
  public getLoginInfo(login:Login) : Observable<JWTTokenResponse>{
    return this.http.post<JWTTokenResponse>(`${appUrl}/authentication/login/`,login);
  }
  public getEmployeeById(id: number){
    this.getEmployeeList().subscribe(s=> this.employee == s);
    return this.employee.find(item=> item.id == id);
  }
  public getShift() : Observable<Shift[]>{
    return this.http.get<Shift[]>(`${appUrl}/hrms/shift`);
  }
  public getDashbordInfo(id: number): Observable<DashboardVM>{
    return this.http.get<DashboardVM>(`${appUrl}/hrms/dashboard/${id}`)
  }

  public getAttendanceHistory(id: number): Observable<Attendance[]>{
    return this.http.get<Attendance[]>(`${appUrl}/hrms/attendancehistory/${id}`)
  }
  
}
