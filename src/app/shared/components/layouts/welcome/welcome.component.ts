import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { 
    //this.wordSearch= new BehaviorSubject<string>("default");;
  }
  //wordSearch:BehaviorSubject<string>
  ngOnInit() {
  }
  isFocus:boolean=false;
  resiveIsFocusSearchEvent(event){
    this.isFocus=event;
  }

  /*resiveWordSearchEvent($event){
    this.wordSearch=$event;
  }*/

}
