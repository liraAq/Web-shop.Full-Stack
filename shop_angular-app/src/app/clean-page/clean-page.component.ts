import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-clean-page',
  templateUrl: './clean-page.component.html',
  styleUrls: ['./clean-page.component.css']
})





export class CleanPageComponent implements OnInit {

  customMessage:String = 'Super'

  constructor() { }

  ngOnInit(): void {
  }

  @Input() message: string | undefined;
}
