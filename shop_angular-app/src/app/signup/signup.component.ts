import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/data/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
  });

  submitted = false;
  successMessage: string | null = null; // Variable to hold success message

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // Initialization logic here
  }

  onRegister() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const userCredentials = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.authService.registerUser(userCredentials).subscribe(
      response => {
        console.log(response);
        // Show success message
        this.successMessage = 'Registration successful. You will be redirected shortly.';
        // Redirect to success page or handle response
        setTimeout(() => {
          this.router.navigate(['/u-c']); // Replace '/success' with your success page route
        }, 3000); // Redirect after 3 seconds
      },
      error => {
        console.error('Registration failed:', error);
        // Handle registration error
      }
    );
  }
}
