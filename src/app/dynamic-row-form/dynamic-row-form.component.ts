import { Component } from '@angular/core';

@Component({
  selector: 'app-dynamic-row-form',
  templateUrl: './dynamic-row-form.component.html',
  styleUrls: ['./dynamic-row-form.component.scss']
})
export class DynamicRowFormComponent {
fieldRows: any[] = [
  { label: '', type: 'text', value: '' }
];

submittedData: any[] = [];

addRow() {
  this.fieldRows.push({
    label: '',
    type: 'text',
    value: ''
  });
}

onSubmit() {
  console.log(this.fieldRows);
  this.submittedData.push(JSON.parse(JSON.stringify(this.fieldRows)));
}
}
