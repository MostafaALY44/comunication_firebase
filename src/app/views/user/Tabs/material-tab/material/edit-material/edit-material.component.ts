import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModel } from 'src/app/services/user/oop/models/MaterialModel.model';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent {

  constructor(
    public dialogRef: MatDialogRef<EditMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialModel) {}


    onNoClick(): void {
    this.dialogRef.close();
  }
}
