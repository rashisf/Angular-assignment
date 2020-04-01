import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EmployeeModel } from 'src/app/model/employee-model';
import { RoleModel } from 'src/app/model/role-model';
import { CustomerModel } from 'src/app/model/customer-model';

@Component({
  selector: 'app-get-employee',
  templateUrl: './get-employee.component.html',
  styleUrls: ['./get-employee.component.css'],

})
export class GetEmployeeComponent implements OnInit {


  public editable = false;
  public editIndex = -1;
  public selectedIds: any[] = [];
  public headings;

  @Input() employees: EmployeeModel[];
  @Input() roles: RoleModel[];
  @Input() customers: CustomerModel[];

  @Output() onDelete = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onEdit = new EventEmitter();


  constructor() { }
 
  ngOnInit(): void {
    this.headings = Object.keys(this.employees[0]);
    this.headings.shift();
  }


  deleteEmitter(i) {
    this.onDelete.emit(i);
  }

  editEmitter(i) {
    this.onEdit.emit();
    this.editable = true;
    this.editIndex = i;

  }

  cancelEmitter() {
    this.editable = false;
    this.editIndex = -1;
  }

  saveEmitter(updatedEmployee) {
    this.onSave.emit(updatedEmployee);
    this.editable = false;
  }


  multiDelete() {

    let arr = this.selectedIds
    for (let x of arr)
      this.onDelete.emit(x);
  }

  checked(i, event) {

    if (event.currentTarget.checked)
      this.selectedIds.push(i);
    else
      this.selectedIds.splice(this.selectedIds.indexOf(i), 1);
    console.log(this.selectedIds)
  }
}
