import { Category } from 'src/app/services/user/oop/class/category';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { CategoryModel } from 'src/app/services/user/oop/models/CategoryModel';

@Component({
  selector: 'material-category',
  templateUrl: './material-category.component.html',
  styleUrls: ['./material-category.component.css']
})
export class MaterialCategoryComponent implements OnInit {
 
  @Input() categoryName: string;
  //categories: Category;

  constructor(){
    // route.paramMap.subscribe((params : ParamMap) =>  this.categories = CourseService.categories.categoriesMap.get(params.get('id')));
    //this.categories=CourseService.categories;
  }

  ngOnInit() {
  }
 
}
