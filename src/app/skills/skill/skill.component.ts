import { Component, OnInit } from '@angular/core';
import {MatDialogConfig, MatDialogRef} from '@angular/material';
import {SkillService} from '../../shared/skill.service';
import {ApiService} from '../../shared/api.service';
import {NotificationService} from '../../shared/notification.service';
import {Skill} from '../../models/skill';
import {Employee} from '../../models/employee';
import {EmployeeComponent} from '../../employees/employee/employee.component';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  constructor(private skillService: SkillService,
              private apiService: ApiService,
              private notificationService: NotificationService,
              public dialogRef: MatDialogRef<SkillComponent>) {
  }

  ngOnInit() {
  }

  onClear() {
    this.skillService.form.reset();
    this.skillService.initializeFormGroup();

  }

  onClose() {
    this.skillService.form.reset();
    this.skillService.initializeFormGroup();
    this.dialogRef.close();
  }

  onSubmit() {
    const skill = this.skillService.form.value;
    const  skill1: Skill = new Skill (skill.id, skill.skill, []);
    this.createSkill(skill1);
    this.onClose();

  }
  onEdit(row) {
    this.employeeService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.getAllEmp();
      }
    );
  }

  public  createSkill(skill: Skill) {
    this.apiService.createSkill(skill).subscribe(
      res => {
        this.notificationService.success('Changes Saved to the Database Successfully');
        this.skillService.form.reset();
        this.skillService.initializeFormGroup();
      },
      err => {
        alert('Failed!');
      }
    );
  }

}
