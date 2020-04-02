import { MaterialModel } from './../../../../../../services/user/oop/models/MaterialModel.model';
import { Material } from 'src/app/services/user/oop/class/Material';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent  {

  newMaterial = new FormGroup({
    id: new FormControl('', Validators.required),
    date: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<AddMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialModel,
    private route: ActivatedRoute ) { }

  

  // onSubmit() {
  //   let data = { "id": this.newMaterial.value.id, "date": this.newMaterial.value.date, "link": this.newMaterial.value.link };
  //   let materialId;
  //   this.route.parent.paramMap.subscribe((params: ParamMap) => materialId = params.get('id'));
  // }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

}
