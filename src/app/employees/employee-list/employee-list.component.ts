import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../../shared/api.service';
import {MatTableDataSource, MatSort, MatPaginator} from '@angular/material';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {MatChipsModule} from '@angular/material';
import {EmployeeComponent} from '../employee/employee.component';
import {EmployeeService} from '../../shared/employee.service';
import {NotificationService} from '../../shared/notification.service';
import {DialogService} from '../../shared/dialog.service';
import {nextContext} from '@angular/core/src/render3';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private apiService: ApiService, private dialog: MatDialog,
              private employeeService: EmployeeService,
              private  notificationService: NotificationService,
              private dialogService: DialogService) { }
  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName', 'email', 'dob', 'skills', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.getAllEmp();
  }
  onSearchClear() {
    this.searchKey ='';
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    this.employeeService.initializeFormGroup();
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
  onDelete(id) {
    this.dialogService.openConfirmDialog('Are you sure that you want to delete this record ?')
      .afterClosed().subscribe( res =>{
        if (res) {
          this.apiService.deleteEmployee(id).subscribe(
            res => {
              this.notificationService.warn('Deleted Successfully');
              this.getAllEmp();
            },
            err => {
              alert('Error:Could not delete');
            }
          );
        }
    });
  }
  getAllEmp() {
    this.apiService.getAllEmployees().subscribe(
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

