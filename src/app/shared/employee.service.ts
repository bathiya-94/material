import { Injectable } from '@angular/core';
import {FormGroup, FormControl, ControlContainer,Validator, Validators} from '@angular/forms';
import { NG_MODEL_WITH_FORM_CONTROL_WARNING } from '@angular/forms/src/directives';
import {Employee} from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() {
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    skills: new FormControl(0),
    dob: new FormControl('')
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      name: '',
      email: '',
      skills: 0,
      dob: ''
    });
  }

  populateForm(row) {
    const skillArray: Array<String> = new Array<String>();
    row.skills.forEach(function (skill) {
        skillArray.push(skill.skill);
      }

    );
    this.form.setValue({'id': row.id, 'name': row.name, 'email': row.email, 'dob': new Date(row.dob), 'skills': skillArray});
  }
}
