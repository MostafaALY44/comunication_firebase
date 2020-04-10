import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssignmentService } from 'src/app/services/user/assignment.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

  newAssignment = new FormGroup({
    title : new FormControl(this.data.assignment.title,Validators.required),
    start : new FormControl(this.data.assignment.startDate,Validators.required),
    end : new FormControl(this.data.assignment.endDate,Validators.required),
    accept : new FormControl(this.data.assignment.acceptAfterEnd),
    note : new FormControl(this.data.assignment.note), 
    Qurl : new FormControl(this.data.assignment.link,Validators.required)
    
  });
  constructor(private ser: AssignmentService, private route:ActivatedRoute,@Inject(MAT_DIALOG_DATA) private data:any) { }

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
      let courseId=this.data.courseId;
      let idAssignent= this.data.assignment.id
      this.data.assignment= {"acceptAfterEnd" :this.newAssignment.value.accept,
                            "endDate":this.newAssignment.value.end,
                            "link":this.newAssignment.value.Qurl,
                            "note":this.newAssignment.value.note,
                            "startDate":this.newAssignment.value.start,
                            "title":this.newAssignment.value.title};
      this.ser.editAssignment(courseId, idAssignent, this.data.assignment);
    }
  }
}
