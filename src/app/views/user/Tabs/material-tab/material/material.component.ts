import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseDetailsComponent } from '../../../course-details/course-details.component';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit, OnDestroy {

  constructor() {
    CourseDetailsComponent.displayCourseName.next(false)
  }
  ngOnDestroy(): void {
    CourseDetailsComponent.displayCourseName.next(true);
  }

  ngOnInit() {
  }

}
