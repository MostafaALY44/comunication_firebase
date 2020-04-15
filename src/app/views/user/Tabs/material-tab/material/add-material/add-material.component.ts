import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModel } from './../../../../../../services/user/oop/models/MaterialModel.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent {

  addMaterial:FormGroup ;
  constructor(@Inject(MAT_DIALOG_DATA) private data:Observable<ParamMap>, private _snackBar: MatSnackBar ) { 
    this.addMaterial= new FormGroup({
      nameMaterial : new FormControl('', Validators.required),
      linkMaterial : new FormControl('', Validators.required),
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
    let materialName:string =this.addMaterial.value.nameMaterial;
     if(!this.isEmpty( materialName) ){ 
       let currentCategory:string="";
       this.data.subscribe((params: ParamMap) => currentCategory = params.get('id')).unsubscribe();
       let materialClass = CourseService.categories.categoriesMap.get(currentCategory).material;
        materialClass.create({"id":materialName, "link":this.addMaterial.value.linkMaterial, "date":""}).then(()=>{
          this.openSnackBar(materialName + ' Material', 'Added Successfully')
        }).catch(()=>{
          this.openSnackBar(materialName + ' Material', 'error in add Material')
        })
     }
   }
}
