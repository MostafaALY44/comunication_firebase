import { Component, OnInit, Inject } from '@angular/core';
import { AssignmentService } from 'src/app/services/user/assignment.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/oop/user.service';

@Component({
  selector: 'add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  
  newAssignment = new FormGroup({
    title : new FormControl('',Validators.required),
   
    end : new FormControl('',Validators.required),
    accept : new FormControl(''),
    note : new FormControl(''),
    Qurl : new FormControl('',Validators.required)
    
  });
   assignmentId;
   currentUser;
  constructor(private ser: AssignmentService, private route:ActivatedRoute, @Inject(MAT_DIALOG_DATA) private data:any,private _snackBar: MatSnackBar) {
    this.currentUser=UserService.getUser();

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
    
    if(!this.isEmpty(this.newAssignment.value.title)){

       let data2={"acceptAfterEnd" :this.newAssignment.value.accept,
                 "endDate":this.newAssignment.value.end,
                 "link":this.newAssignment.value.Qurl,
                 "note":this.newAssignment.value.note,
                 
                 "userId":this.currentUser.uid,
                 "title":this.newAssignment.value.title};
     
     
      this.ser.addAssignment( this.data.courseId,data2).then(()=>{
        this._snackBar.open(this.newAssignment.value.title, 'Added Successfully', { duration: 3000, });
      })
     
      
    } 
  }

  
    
  

}
 