import { Component, OnInit } from '@angular/core';
import {MatDialogConfig, MatDialogRef} from '@angular/material';
import {SkillService} from '../../shared/skill.service';
import {ApiService} from '../../shared/api.service';
import {NotificationService} from '../../shared/notification.service';
import {Skill} from '../../models/skill';


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
