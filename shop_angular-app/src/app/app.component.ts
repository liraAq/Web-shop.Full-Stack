import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './service/data/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shop';


  constructor(
    private router: Router, private auth: AuthenticationService){}
  
    ngOnInit() {
      
    }
}
