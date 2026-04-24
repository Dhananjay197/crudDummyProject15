import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {


  dynamicForm ! :FormGroup;
   formFields: any[] = [];
  submittedList: any[] = [];
    constructor(private fb: FormBuilder, private api: ApiService) {}


  ngOnInit() {
    this.loadForm();
  }

  loadForm() {
    this.api.getFormConfig().subscribe(res => {
      this.formFields = res;
      console.log(this.formFields);
      this.createForm();
    });
  }

   createForm() {
    const group: any = {};

    this.formFields.forEach(field => {
      group[field.name] = [field.value || '', Validators.required];
    });

    this.dynamicForm = this.fb.group(group);
  }

onSubmit() {
  if (this.dynamicForm.valid) {
    console.log('Form Data:', this.dynamicForm.value);
    this.api.submitForm(this.dynamicForm.value).subscribe(res => {
      console.log('Form submitted successfully', res);
         this.loadSubmissions(); // refresh list
      this.dynamicForm.reset();
    });
  } else {
    console.log('Form is invalid');
  }
}
loadSubmissions() {
    this.api.getSubmissions().subscribe(res => {
      this.submittedList = res;
    });
  }
}
