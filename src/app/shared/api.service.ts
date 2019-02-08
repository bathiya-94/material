import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Skill} from '../models/skill';
import {Observable} from 'rxjs';
import {Employee} from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private  baseUrl  = 'http://localhost:8080/api';
  private  GET_ALL_SKILL_URL = this.baseUrl + '/skills/all';
  private  CREATE_EMPLOYEE = this.baseUrl + '/employees';
  private  GET_ALL_EMPLOYEES = this.baseUrl + '/employees/all';
  private  DELETE_EMPLOYEES_URL = this.baseUrl + '/employees/';
  private  CREATE_SKILL_URL = this.baseUrl + '/skills';


  constructor(private http: HttpClient) { }

  public  getAllSKills(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.GET_ALL_SKILL_URL);
  }
  public  createEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.CREATE_EMPLOYEE, employee);
  }
  public  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.GET_ALL_EMPLOYEES);
  }
  public  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.DELETE_EMPLOYEES_URL + id.toString());
  }
  public  createSkill(skill: Skill): Observable<any> {
    return this.http.post(this.CREATE_SKILL_URL, skill);
  }
}

