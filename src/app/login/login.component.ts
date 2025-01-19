import { Component, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { Login } from '../login';
import { DataService } from '../data.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JWTTokenResponse } from '../jwttoken-response';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {  
  public jwt : JWTTokenResponse | null = null;

  logInfo = new FormGroup({
    name: new FormControl('', { validators : [Validators.required]}),
    password: new FormControl('', [Validators.required])
  })
  public login : Login = {
    username: '',
    password: ''
  }
  constructor(@Inject(PLATFORM_ID) private platformId : object, private service: DataService, private router : Router){}
  ngOnInit(){

  }
  onSubmit(){
    if(this.logInfo.valid){
      console.log(this.logInfo.value);
      this.login.username = this.logInfo.value.name!;
      this.login.password = this.logInfo.value.password!;
      this.service.getLoginInfo(this.login)
      .subscribe((data: any)=>{
        this.jwt = data;
<<<<<<< HEAD
        if(this.jwt!.token != ''){
          if(isPlatformBrowser(this.platformId)){
            localStorage.setItem('jwtToken', this.jwt!.token);
            localStorage.setItem('employeeId', this.jwt!.employeeId);
            this.router.navigate(['layout/dashboard']);
=======
        if(this.jwt.token != ''){
          if(isPlatformBrowser(this.platformId)){
            localStorage.setItem('jwtToken', this.jwt.token);
            this.router.navigate(['layout/employeelist']);
>>>>>>> 614e0b97b5e17389f78be1a6845ddf3af6be664c
          }
        }
      }, err => {
        console.log(err.message);
      }, () => {
        console.log('completed: token = ' + this.jwt!.token);
      });
    }
  }
}
