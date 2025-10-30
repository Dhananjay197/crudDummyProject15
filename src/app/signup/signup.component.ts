import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup,FormBuilder, Validators, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  password: any;
  show = false;
 constructor(private  fb:FormBuilder, private http:HttpClient,private router:Router) {
this.formcontrols();
 }

  signupPage!:FormGroup;
  submitted:boolean = false;

  ngOnInit(): void {
    this.password = 'password';
    
  }
  formcontrols(){
    this.signupPage =this.fb.group({
      fname:['',Validators.required],
       mobile: ['', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10)
  ]],
      email:['',Validators.required],
      userPasswords:['',Validators.required],
      // checkboxx:[false,Validators.requiredTrue],
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.signupPage.controls
  }


    onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  pageSignup(){
    debugger
    this.submitted=true;
    console.log(this.signupPage.value);
    if(this.signupPage.value){
      
      alert("signup successfully");
        this.http.post<any>("http://localhost:3000/signupUsers",this.signupPage.value)
        .subscribe(res=>{
         
          alert("signup successfullyyyy");
          this.signupPage.reset();
          this.router.navigate(['/login']);
        });
    }
   
   
   
  
}
}
