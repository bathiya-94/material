import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete} from '@angular/material';
import {EmployeeService} from '../../shared/employee.service'
import {ApiService} from '../../shared/api.service';
import {NotificationService} from '../../shared/notification.service';
import {Skill} from '../../models/skill';
import {Employee} from '../../models/employee';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = this.employeeService.form.controls['skills'];
  filteredSkills: Observable<string[]>;
  selectedSkills: string[] = [];
  allSkills: string[] = [];

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private employeeService: EmployeeService,
              private apiService: ApiService,
              private notificationService: NotificationService,
             public dialogRef: MatDialogRef<EmployeeComponent>) {
    this.filteredSkills = this.skillCtrl.valueChanges.pipe(
      startWith(null),
      map((skill: string | null) => skill ? this._filter(skill) : this.allSkills.slice()));
  }
  // Chip methods;
  remove(skill: string): void {
    const index = this.selectedSkills.indexOf(skill);

    if (index >= 0) {
      this.selectedSkills.splice(index, 1);
      this.allSkills.push(skill);
    }
  }

  selected (event: MatAutocompleteSelectedEvent): void {
    const index = this.allSkills.indexOf(event.option.viewValue);
    this.selectedSkills.push(event.option.viewValue);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);

    this.allSkills.splice(index, 1);
  }

  private _filter (value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSkills.filter(skill => skill.toLowerCase().indexOf(filterValue) === 0);
  }

  public  getAllSkills() {
    this.apiService.getAllSKills().subscribe(
        res => {
         this.allSkills = res.map( skill => skill.skill);
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
    this.employeeService.form.controls.skills.setValue(this.selectedSkills);
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
