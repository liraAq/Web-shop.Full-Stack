import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { MessageComponent } from './message/message.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserCabinetComponent } from './user-cabinet/user-cabinet.component';
import { AuthGuard } from './auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { OrderComponent } from './order/order.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminAuthGuard } from './admin-auth.guard';

const routes: Routes = [
  {path:'',component:WelcomeComponent},
  {path:'products',component:ProductComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  {path:'cart',component:CartComponent,canActivate:[AuthGuard]},
  {path: 'admin/products', component: AdminProductComponent, canActivate: [AdminAuthGuard] },
  {path:'message', component:MessageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:SignupComponent},
  {path:'u-c',component:UserCabinetComponent,canActivate:[AuthGuard]},
  {path: 'product/:id', component: ProductDetailsComponent },
  {path: 'order', component: OrderComponent},
  {path: 'favorites', component: FavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
