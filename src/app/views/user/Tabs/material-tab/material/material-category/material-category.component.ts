import { MatDialog } from '@angular/material/dialog';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'material-category',
  templateUrl: './material-category.component.html',
  styleUrls: ['./material-category.component.css']
})
export class MaterialCategoryComponent implements OnInit {

  // categories: Observable<Category[]>;
  // courseId;

  // newCategory = new FormGroup({
  //   name: new FormControl('', Validators.required)
  // });

  // constructor(
  //   private materialsService: MaterialsService, private route: ActivatedRoute, private dialog: MatDialog) {
  //   route.parent.paramMap.subscribe((params: ParamMap) => {
  //   this.courseId = params.get('id');
  //   this.categories = materialsService.getCategory(this.courseId);
  //   }
  //   );
  // }

  ngOnInit() {
  }

  // onSubmit() {
  //   let data = { "name": this.newCategory.value.name };
  //   let categoryId;
  //   this.route.parent.paramMap.subscribe((params: ParamMap) => categoryId = params.get('id'));
  //   this.materialsService.addCategory(categoryId, data);
  // }


  // currentCategory;
  // setCategory(category: any){
  //   this.currentCategory = category;
  // }
  // deleteCategory(){
  //   this.materialsService.deleteCategory(this.courseId,this.currentCategory["id"]);
  // } 
  // editCategory(){
  //   this.dialog.open(EditCategoryComponent,{data:{"category":this.currentCategory,"courseId":this.courseId}});
  // }
}
