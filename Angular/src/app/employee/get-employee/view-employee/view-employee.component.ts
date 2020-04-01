import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '[app-view-employee]',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ViewEmployeeComponent implements OnInit {

  @Input('employee') e;
  @Output() onDelete = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  constructor() { }

  ngOnInit(): void {

  }

  editEmployee(id) {
    this.onEdit.emit(id);
  }

  deleteEmployee(id) {
    this.onDelete.emit(id);
  }

}
