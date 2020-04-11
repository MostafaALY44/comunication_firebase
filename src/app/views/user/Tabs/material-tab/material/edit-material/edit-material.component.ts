import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MaterialsService } from 'src/app/services/user/materials.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModel } from 'src/app/services/user/oop/models/MaterialModel.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-material',
  templateUrl: './edit-material.component.html',
  styleUrls: ['./edit-material.component.css']
})
export class EditMaterialComponent {

  constructor(
    public dialogRef: MatDialogRef<EditMaterialComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialModel,
    private _snackBar: MatSnackBar
  ) { }
    onNoClick(): void {
    this.dialogRef.close();
  }

  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000, });
  }
}
