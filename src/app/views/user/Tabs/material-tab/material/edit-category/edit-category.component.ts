import { CategoryModel } from './../../../../../../services/user/oop/models/CategoryModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent  {
  editCategory:FormGroup ;
  constructor(@Inject(MAT_DIALOG_DATA) private data:string, private router: Router, private _snackBar: MatSnackBar) { 
    this.editCategory= new FormGroup({
      nameCategory : new FormControl(data,Validators.required),
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

   let categoryName=this.editCategory.value.nameCategory;
    if(!this.isEmpty( categoryName) && ( categoryName!= this.data)){
      
      let index= CourseService.categories.categoriesMap.get(this.data)
      if(!index)
        return;
      CourseService.categories.categoriesMap.delete(this.data);
      CourseService.categories.categoriesMap.set( categoryName, index)
      
      CourseService.categories.update(index.id , {"id":index.id ,"name":  categoryName}).then(()=>{
        this.openSnackBar(categoryName + ' Category item', ' 📝 Updated Successfully')
      }).catch(()=>{
        this.openSnackBar('Edit Category item failed', '❌')
        index= CourseService.categories.categoriesMap.get( categoryName)
        CourseService.categories.categoriesMap.delete( categoryName);
        CourseService.categories.categoriesMap.set(this.data, index)
      })
      this.router.navigate([this.router.url.slice(0, -this.data.length)+ categoryName]);
    }
  }
}
