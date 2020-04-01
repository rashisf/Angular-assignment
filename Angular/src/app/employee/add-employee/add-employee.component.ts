import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  public newEntryForm: FormGroup;

  public roles = [];
  public customers = [];
  public errorMessage;

  constructor(private formBuilder: FormBuilder, private router: Router, private _employeeService: EmployeeService) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    const roleResponse = this._employeeService.getRole();
    const customerResponse = this._employeeService.getCustomer();

    forkJoin([roleResponse, customerResponse])
      .subscribe(results => {
        this.roles = results[0];
        this.customers = results[1];
      });


    this.newEntryForm = this.formBuilder.group({

      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])],
      phone: ['', Validators.compose([Validators.required, Validators.pattern(/^[+]?[0-9]{10,13}$/)])],
      role: [null, Validators.required],
      address: ['', Validators.required],
      customer: [null, Validators.required]
    });
  }

  get firstName() {
    return this.newEntryForm.get('firstName');
  }
  get middleName() {
    return this.newEntryForm.get('middleName');
  }
  get lastName() {
    return this.newEntryForm.get('lastName');
  }
  get email() {
    return this.newEntryForm.get('email');
  }
  get phone() {
    return this.newEntryForm.get('phone');
  }
  get address() {
    return this.newEntryForm.get('address');
  }
  get role() {
    return this.newEntryForm.get('role');
  }

  get customer() {
    return this.newEntryForm.get('customer');
  }

  onSubmit() {
    this._employeeService.createEmployee(this.newEntryForm.value)
      .subscribe(data => {
        this.router.navigate(['employees']);
      },
        (error: any) => {
        this.errorMessage = error.message;
        });

  }
}
