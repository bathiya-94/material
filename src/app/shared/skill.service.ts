import { Injectable } from '@angular/core';
import {FormGroup, FormControl, ControlContainer,Validator, Validators} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor() { } form: FormGroup = new FormGroup({
    id: new FormControl(null),
    skill: new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      skill: ''
    });
  }

  populateForm(row) {
    this.form.setValue({'id': row.id, 'skill': row.skill});
  }

}
