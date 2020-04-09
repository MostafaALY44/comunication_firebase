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

}
