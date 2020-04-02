import { Component, OnInit} from '@angular/core';
import { Material } from 'src/app/services/user/oop/class/Material';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'material-category',
  templateUrl: './material-category.component.html',
  styleUrls: ['./material-category.component.css']
})
export class MaterialCategoryComponent implements OnInit {

  categories: Map<string, Material>;
  constructor() {
    this.categories = CourseService.categories.categoriesMap;
  }
  ngOnInit() {
  }

}
