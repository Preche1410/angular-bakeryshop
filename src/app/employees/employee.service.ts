/* tslint:disable */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    // load data from the api using http module
    return this.http.get("https://reqres.in/api/users");
  }
}
