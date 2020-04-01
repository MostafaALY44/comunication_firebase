import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Material } from 'src/app/services/user/oop/class/Material';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit, OnDestroy {
  categories: Map<string, Material>;

  materials: Material[];

  constructor(route: ActivatedRoute) {
    this.categories = CourseService.categories.categoriesMap;
  }
  
  ngOnDestroy(): void {
  }
  ngOnInit() {
  }
}
