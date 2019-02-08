import {Employee} from './employee';

export class Skill {
  id: number;
  skill: string;
  employees: Employee[];
  constructor(id: number, skill: string, employees: Employee[]){
    this.id = id;
    this.skill = skill;
    this.employees = employees;
  }
}
