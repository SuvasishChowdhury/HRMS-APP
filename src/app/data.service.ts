import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { BehaviorSubject, Observable } from 'rxjs';

const appUrl = 'http://hrapi.beacontech.xyz/api';

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

  public getEmployeeById(id: number){
    this.getEmployeeList().subscribe(s=> this.employee == s);
    return this.employee.find(item=> item.id == id);
  }
}
