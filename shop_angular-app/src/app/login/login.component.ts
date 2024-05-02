// login.component.ts
import { Component, ViewChild } from '@angular/core';

import { AuthenticationService } from '../service/data/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('loginForm') loginFormRef: any;
  errorMessage = ''

  user = {
    email: '',
    password: ''
  };

  loginForm: NgForm | undefined;
  

  constructor(private authenticationService:AuthenticationService,
    private router:Router, private formBuilder:FormBuilder) {

  }

  onSubmit() {
    const userCredentials = {
      email: this.user.email,
      password: this.user.password
    };
  
    this.authenticationService.authenticateUser(userCredentials).subscribe(

      response => {
        localStorage.setItem('token', response.token);
        this.authenticationService.isLoggedIn = true;
        this.router.navigate(['/u-c']);
      },
      error => {
        this.errorMessage = 'Invalid credentials';
      }
    );
  }
}  