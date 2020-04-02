import { MaterialModel } from './../../../../../../services/user/oop/models/MaterialModel.model';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'add-material',
  templateUrl: './add-material.component.html',
  styleUrls: ['./add-material.component.css']
})
export class AddMaterialComponent  {

  constructor(
    public dialogRef: MatDialogRef<AddMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialModel,
     ) { }

    onNoClick(): void {
    this.dialogRef.close();
  }

    // onSubmit() {
  //   let data = { "id": this.newMaterial.value.id, "date": this.newMaterial.value.date, "link": this.newMaterial.value.link };
  //   let materialId;
  //   this.route.parent.paramMap.subscribe((params: ParamMap) => materialId = params.get('id'));
  // }

}
