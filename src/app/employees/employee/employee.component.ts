import { Component, OnInit } from '@angular/core';
import  {MatDialogRef} from '@angular/material';

import {EmployeeService} from '../../shared/employee.service'
import {ApiService} from '../../shared/api.service';
import {NotificationService} from '../../shared/notification.service';
import {Skill} from '../../models/skill';
import {Employee} from '../../models/employee';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(private employeeService: EmployeeService,
              private apiService: ApiService,
              private notificationService: NotificationService,
             public dialogRef: MatDialogRef<EmployeeComponent>) { }

  skills: Skill[];
  public  getAllSkills() {
    this.apiService.getAllSKills().subscribe(
        res => {
          this.skills = res;
        },
        err => {
          alert('Error');
        }
    );
  }
  public  createEmployee(employee: Employee) {
    this.apiService.createEmployee(employee).subscribe(
      res => {
        this.notificationService.success('Changes Saved to the Database Successfully');
        this.employeeService.form.reset();
        this.employeeService.initializeFormGroup();
      },
      err => {
        alert('Failed!');
      }
    );
  }

  ngOnInit() {
   this.getAllSkills();
  }
  onClear() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();

  }

  onSubmit() {
    const employee = this.employeeService.form.value;
    const  employee1: Employee = new Employee(employee.id, employee.name, employee.email, employee.dob, employee.skills);
    this.createEmployee(employee1);
    this.onClose();

  }
  onClose() {
    this.employeeService.form.reset();
    this.employeeService.initializeFormGroup();
    this.dialogRef.close();
  }

}
