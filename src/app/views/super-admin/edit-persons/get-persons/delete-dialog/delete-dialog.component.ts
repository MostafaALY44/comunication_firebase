import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/oop/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPersonService } from '../../../service/add-person.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private addPersonService:AddPersonService,public dialogRef: MatDialogRef<DeleteDialogComponent>,@Inject(MAT_DIALOG_DATA) private data,private userService:UserService,private _snackBar:MatSnackBar) {
    
   }

  ngOnInit() {
  }
onClose(){
  this.dialogRef.close();
}

  delete(){

    let obj={'universityId': this.data.idUniversity , 'collegeId':this.data.idCollege,'userId':this.data.user.uid}
   
    this.addPersonService.deletePersons(obj);
  //   this.userService.delete(this.data.uid).then(()=>{
  //     this._snackBar.open(this.data.email, 'Deleted Successfully', { duration: 3000, });
  //   })
   }

}
