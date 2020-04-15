import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModel } from 'src/app/services/user/oop/models/MaterialModel.model';
import { Observable } from 'rxjs';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent {
  editMaterial: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {"material": MaterialModel, "UrlParam":Observable<ParamMap>}
  , private _snackBar: MatSnackBar) {
    this.editMaterial= new FormGroup({
      nameMaterial : new FormControl(data.material.id,Validators.required),
      linkMaterial : new FormControl(data.material.link,Validators.required)
    });
  }

  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000, });
  }
 
  onSubmit(){
    let materialName:string =this.editMaterial.value.nameMaterial;
    if(!this.isEmpty( materialName) ){ 
      let currentCategory:string="";
      this.data.UrlParam.subscribe((params: ParamMap) => currentCategory = params.get('id')).unsubscribe();
      let materialClass = CourseService.categories.categoriesMap.get(currentCategory).material;
       materialClass.update(materialName, {"id":materialName, "link":this.editMaterial.value.linkMaterial, "date":""}).then(()=>{
        if(materialName != this.data.material.id)
            materialClass.delete(this.data.material.id)
         this.openSnackBar(materialName + ' Material', 'edit Successfully')
       }).catch(()=>{
         this.openSnackBar(materialName + ' Material', 'error in edit Material')
       })
    }
  }
  
    
}
