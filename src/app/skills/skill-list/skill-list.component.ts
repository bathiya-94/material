import { Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import  {SkillComponent} from '../skill/skill.component';
import  {SkillService} from '../../shared/skill.service';
import {NotificationService} from '../../shared/notification.service';
import {DialogService} from '../../shared/dialog.service';
import {nextContext} from '@angular/core/src/render3';
import {EmployeeComponent} from '../../employees/employee/employee.component';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css']
})
export class SkillListComponent implements OnInit {

  constructor(private apiService: ApiService,
              private dialog: MatDialog,
              private  skillService: SkillService,
              private  notificationService: NotificationService,
              private dialogService: DialogService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'skill', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  ngOnInit() {
    this.getAllSkills();
  }

  onSearchClear() {
    this.searchKey ='';
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(SkillComponent, dialogConfig).afterClosed().subscribe(res =>{
      this.getAllSkills();
    });
  }

  onEdit(row) {
    this.skillService.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(SkillComponent, dialogConfig).afterClosed().subscribe(
      res => {
        this.getAllSkills();
    });
  }
  getAllSkills() {
    this.apiService.getAllSKills().subscribe(
      list => {
        this.listData = new MatTableDataSource(list);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      },err => {
        alert('Error Occurred');
      }
    );
  }
}
