import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProductComponent } from './product/product.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MessageComponent } from './message/message.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import { MyHttpInterceptorService } from './service/data/my-http-interceptor.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderComponent } from './order/order.component';
import { CustomMessageComponent } from './custom-message/custom-message.component'; // Import your custom component here
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CleanPageComponent } from './clean-page/clean-page.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FavoritesComponent } from './favorites/favorites.component';
import { AdminProductComponent } from './admin-product/admin-product.component';






// import { MyHttpInterceptorService } from './service/data/my-http-interceptor.service';






@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ProductComponent,
    MenuComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    CartComponent,
    MessageComponent,
    LoginComponent,
    SignupComponent,
    UserCabinetComponent,
    ProductDetailsComponent,
    OrderComponent,
    CustomMessageComponent,
    CleanPageComponent,
    FavoritesComponent,
    AdminProductComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    BrowserModule, 
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    FormsModule, 
    ReactiveFormsModule,
    
    
    



  ],
  
  providers:  
  [
    // Instead of using InjectionToken, provide the interceptor class directly
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptorService, // Provide the interceptor class
      multi: true,
    },
  ],

  
  bootstrap: [AppComponent]
})



export class AppModule { }
