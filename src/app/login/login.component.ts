import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder,Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { SharedService } from '../shared/shared.service';
import { IdleTimeoutServiceService } from '../shared/idle-timeout-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  password: any;
  show = false;
  captchaImage:any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private api: ApiService,
    private idleService: IdleTimeoutServiceService
  ) {
    this.formControl();
  }
  ngOnInit(): void {
    this.password = 'password';
      this.getCaptcha();
  }
  loginForm!:FormGroup;
  submitted:boolean = false;
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  formControl(){
    this.loginForm=this.fb.group({
              email:['',Validators.required],
              userPasswords:['',Validators.required],
              // checkboxx:[ false ,Validators.requiredTrue],
    })
  };
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls
  }
  getCaptcha() {
  this.http.get('https://demo.he.nic.in/icssrApi/api/auth/captcha', { responseType: 'blob' })
  .subscribe((res: Blob) => {
    this.createImageFromBlob(res);
  });
}

createImageFromBlob(image: Blob) {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = () => {
    this.captchaImage = reader.result;
  };
}
  loginFormData():void{
    
    this.submitted=true; 
console.log(this.loginForm.value);

if(this.loginForm.valid){
  this.api.loginUser(this.loginForm.value)
  // this.http.get<any>("http://localhost:3000/signupUsers")
  .subscribe((res:any)=>{
    debugger
  
    const user = res.find
((a:any)=>a.email === this.loginForm.value.email && a.userPasswords === this.loginForm.value.userPasswords);
    if (user){
      sessionStorage.setItem('user',JSON.stringify(user))
      console.log(user);

      alert ("login successful")
      this.loginForm.reset();
      this.router.navigate(['/dashboard']);
       this.idleService.startTimer();
    }
  });
}
  }
  
}