import { CategoryModel } from './../../../../../../services/user/oop/models/CategoryModel';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/user/oop/course.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  
  addCategory:FormGroup ;
  constructor(private _snackBar: MatSnackBar) { 
    this.addCategory= new FormGroup({
      nameCategory : new FormControl('', Validators.required),
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000, });
  }

  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }
 
  onSubmit(){
   let categoryName:string =this.addCategory.value.nameCategory;
    if(!this.isEmpty( categoryName) && !( CourseService.categories.categoriesMap.has(categoryName))){ 
      CourseService.categories.create( {"id":"" ,"name":  categoryName}).then(()=>{
        this.openSnackBar(categoryName + ' Category', 'Added Successfully')
      }).catch(()=>{
        this.openSnackBar(categoryName + ' Category', 'error in add Category')
      })
    }
  }
}

