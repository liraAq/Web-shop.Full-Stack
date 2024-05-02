import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/data/authentication.service';
import { Router } from '@angular/router';
import { OrderService } from '../service/order-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-cabinet',
  templateUrl: './user-cabinet.component.html',
  styleUrls: ['./user-cabinet.component.css'],
  providers: [FormBuilder] 
})

export class UserCabinetComponent implements OnInit {
  username: string | undefined;
  newPassword: string = '';

  user = {
    name: '',
    password: ''
  };

  userOrders: any[] = []; 
  userId: string | undefined;
  userForm: FormGroup;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private orderService: OrderService,
              private formBuilder: FormBuilder) {
  
    this.userForm = this.formBuilder.group({
      newName: [''],
      newPassword: ['', Validators.minLength(6)],
    });
  }

  ngOnInit(): void {

   
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
    


    this.authService.getAuthenticatedUserId().subscribe(
      (userId: string) => {
        this.userId = userId;
        this.getUserOrders(userId);
      },
      (error) => {
        console.error('Error fetching authenticated user ID:', error);
      }
    );
    

   

    this.authService.getUsername().subscribe(

      (username) => {
        
        this.user.name = username;
      },
      (error) => {
        console.error('Error fetching username:',error);
      }
    );

    

  }

  initProfileForm() {
    // Create the form controls with validators
    this.userForm = this.formBuilder.group({
      newName: [''], // Add validators if needed
      newPassword: ['', Validators.minLength(6)], // Add validators as needed
    });
  }



  getUserOrders(userId: any) {
    this.orderService.getUserOrders(userId).subscribe(
      (orders) => {
        this.userOrders = orders;
      },
      (error) => {
        console.error('Error fetching user orders', error);
      }
    );
  }


  changePassword() {

    throw new Error('Method not implemented.');
    }
    
    updateProfile() {
      if (this.userForm && this.userForm.valid) {
        const newName = this.userForm.get('newName')?.value;
        const newPassword = this.userForm.get('newPassword')?.value;
    
        // Check if either name or password is provided for updating
        console.log(newName)
        console.log(newPassword)
        if (newName || newPassword) {
          // Create an object with the updated user data
          const updatedUserData = {
            name: newName,
            password: newPassword,
          };
    
          // Assuming you have a method in your AuthenticationService to update the user
          this.authService.updateUser(updatedUserData).subscribe(
            (response) => {
              // Handle success, e.g., show a success message
              console.log('User profile updated successfully', response);
    
              // If you want to update the local user object, uncomment the following line
              // this.user = { ...this.user, name: newName }; // Update other properties as needed
            },
            (error) => {
              // Handle error, e.g., show an error message
              console.error('Error updating user profile', error);
            }
          );
        } else {
          // No updates provided
          console.log('No updates provided');
        }
      }
    }
    

    logout() {

      this.authService.logout();
      this.router.navigate(['login']);


      }

}
