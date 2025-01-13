import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { BehaviorSubject, Observable } from 'rxjs';
import { JWTTokenResponse } from './jwttoken-response';
import { Login } from './login';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    // return this.http.get<JWTTokenResponse>(`${appUrl}/authentication/${login.name}`);
    return this.http.post<JWTTokenResponse>(`${appUrl}/authentication/login/`,login);
    // return this.http.get<JWTTokenResponse>(`${appUrl}/Authentication/login/${login}`);
  }
  public getEmployeeById(id: number){
    this.getEmployeeList().subscribe(s=> this.employee == s);
    return this.employee.find(item=> item.id == id);
  }
}
