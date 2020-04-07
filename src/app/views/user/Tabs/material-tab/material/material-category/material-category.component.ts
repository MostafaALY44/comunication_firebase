import { CategoryService } from './../../../../../../services/user/oop/firebaseService/CategoryService';
import { AddCategoryComponent } from './../add-category/add-category.component';
import { CategoryModel } from './../../../../../../services/user/oop/models/CategoryModel';
import { Component, OnInit} from '@angular/core';
import { Material } from 'src/app/services/user/oop/class/Material';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMaterialComponent } from '../add-material/add-material.component';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/services/user/oop/class/category';

@Component({
  selector: 'material-category',
  templateUrl: './material-category.component.html',
  styleUrls: ['./material-category.component.css']
})
export class MaterialCategoryComponent {

  categories: Map<string, Material>;
  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.categories = CourseService.categories.categoriesMap;
  }


  targetCategory: CategoryModel = {id:""};

  selectedCategory(currentCategory: string){
    this.targetCategory.id = currentCategory;
  }

  addCategory(){
    const dialogRef = this.dialog.open(AddCategoryComponent, { data: this.targetCategory });
    dialogRef.afterClosed().subscribe(result => {
      CourseService.categories.create(result)
    });
  }

  deleteCategory(){
    CourseService.categories.delete(this.targetCategory.id);
  }

  updateCategoryTest(){
    CourseService.categories.updateAhmed("a",{id:"A"});
    console.log("u called")
  }

}
