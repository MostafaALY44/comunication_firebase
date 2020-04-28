import { Component, OnInit } from '@angular/core';
import { Polling } from 'src/app/services/user/oop/class/Polling';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'polling',
  templateUrl: './polling.component.html',
  styleUrls: ['./polling.component.css']
})
export class PollingComponent implements OnInit {

  coursepolls:Polling;

  constructor() { 
    this.coursepolls=CourseService.polls;
  }

  ngOnInit() {
  }
  
  trackByPolling(index){
    return (index < (CourseService.polls.polles.length-1))? index:undefined
  }

  // getOptionsMap(pollId){
  //   this.coursepolls.polles..forEach((element)=>{
  //     if(this.optionsVoting.has(element.idOption))
  //       this.optionsVoting.set(element.idOption, this.optionsVoting.get(element.idOption) +1);
  //     else
  //       this.optionsVoting.set(element.idOption, 1);
  //   })
  // }
  
  
}
