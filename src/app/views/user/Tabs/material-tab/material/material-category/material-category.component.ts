import { EditCategoryComponent } from './../edit-category/edit-category.component';
import { CategoryService } from './../../../../../../services/user/oop/firebaseService/CategoryService';
import { AddCategoryComponent } from './../add-category/add-category.component';
import { CategoryModel } from './../../../../../../services/user/oop/models/CategoryModel';
import { Component, OnInit} from '@angular/core';
import { Material } from 'src/app/services/user/oop/class/Material';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { MatDialog } from '@angular/material/dialog';
import { AddMaterialComponent } from '../add-material/add-material.component';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/services/user/oop/class/category';
import { UserService } from 'src/app/services/user/oop/user.service';
import { User } from 'src/app/services/auth/user.model';
import { NotificationService } from 'src/app/services/user/oop/notification.service';

@Component({
  selector: 'material-category',
  templateUrl: './material-category.component.html',
  styleUrls: ['./material-category.component.css']
})
export class MaterialCategoryComponent {


   categories: Map<string, {id:string, material:Material}>

  //currentCategory:string;
  currentUser:User;
  constructor(private route: ActivatedRoute,private router: Router, public dialog: MatDialog) {
    this.categories = CourseService.categories.categoriesMap;
    this.currentUser= UserService.getUser();
    
  }
  currNotificationCategoriesNumber:Map<string, number>=NotificationService.currNotification.categoriesNumber
  getNotification(key:string){
    //console.log(NotificationService.currNotification.categoriesNumber)
    if(NotificationService.currNotification.categoriesNumber.get(CourseService.categories.categoriesMap.get(key).id)>0)
        return NotificationService.currNotification.categoriesNumber.get(CourseService.categories.categoriesMap.get(key).id)
  }

  targetCategoryId;

  selectedCategory(categoryId:string){
    this.targetCategoryId = categoryId;
    console.log(categoryId);
  }

  addCategory(){
    this.dialog.open(AddCategoryComponent);
  }

  deleteCategory(targetCategoryId){
    CourseService.categories.delete(targetCategoryId);
  }

  updateCategory(key:string){
    this.dialog.open(EditCategoryComponent, { data: key});
  }
  // updateCategory(targetCategoryId){
  //   // let categoryKey =  this.route.firstChild.snapshot.paramMap.get('id');
  //   //this.categories.get(categoryKey).unsubscribeMaterialsFireStore();
  //   // this.router.navigate(['user/comp404/material']);
  //   //CourseService.categories.update(targetCategoryId, {id:"", name:"test222"});
  //   //this.router.navigate(['user/comp404/material/a']);

  //   // let oldId = this.targetMaterial.id;
  //   const dialogRef = this.dialog.open(EditCategoryComponent, { data: this.newCategory });
    
  //   dialogRef.afterClosed().subscribe(updatedCategoryItem => {
  //     if (updatedCategoryItem)
  //     CourseService.categories.update(targetCategoryId, updatedCategoryItem);
  //     else
  //     console.log("Category updating is canceled !!!");
  //     //this.router.navigate(['user/comp404/material']);
  //   });
  // }


}
