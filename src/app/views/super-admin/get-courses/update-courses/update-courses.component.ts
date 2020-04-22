import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseFirebaseService } from 'src/app/services/user/oop/firebaseService/course-firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-courses',
  templateUrl: './update-courses.component.html',
  styleUrls: ['./update-courses.component.css']
})
export class UpdateCoursesComponent implements OnInit {
  updateCode = new FormGroup({
    
    code : new FormControl(this.data.courseCode,Validators.required)
    
  });
  constructor(@Inject(MAT_DIALOG_DATA) private data:{'url', 'courseCode'},private courseFirebaseService:CourseFirebaseService,private _snackBar: MatSnackBar) { 


  }

  ngOnInit() {
  }
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }

  onSubmit(){
    if(!this.isEmpty(this.updateCode.value.code)){

      let data1={'code':this.updateCode.value.code}

     
      //let data1=this.updateName.value.name;
      this.courseFirebaseService.update(this.data.url,this.data.courseCode,data1);
      this._snackBar.open(this.updateCode.value.code, 'Updated Successfully', { duration: 3000, });
    }
  } 

}
