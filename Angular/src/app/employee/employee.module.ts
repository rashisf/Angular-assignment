import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ServeEmployeeComponent } from './serve-employee/serve-employee.component';
import { GetEmployeeComponent } from './get-employee/get-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './get-employee/update-employee/update-employee.component';
import { ViewEmployeeComponent } from './get-employee/view-employee/view-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ServeEmployeeComponent,
    GetEmployeeComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    ViewEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
