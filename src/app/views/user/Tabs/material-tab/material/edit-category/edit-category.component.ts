import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  newCategory = new FormGroup({
    name : new FormControl(this.data.category.name,Validators.required),
  });
  constructor(private materialService: MaterialsService, private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) private data:any) { }

  ngOnInit() {
  }

  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }
 
  onSubmit(){
      let courseId=this.data.courseId;
      let idCategory= this.data.category.id;
      this.data.category= {"name" :this.newCategory.value.name};
      this.materialService.editCategory(courseId, idCategory, this.data.category);
  }
}
