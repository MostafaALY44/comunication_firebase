import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/user/assignment.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  
  newAssignment = new FormGroup({
    title : new FormControl('',Validators.required),
    start : new FormControl('',Validators.required),
    end : new FormControl('',Validators.required),
    accept : new FormControl('',Validators.required),
    note : new FormControl(''),
    Qurl : new FormControl('',Validators.required)
    
  });
  constructor(private ser: AssignmentService, private route:ActivatedRoute) { }

  ngOnInit() {
  }
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }

  onSubmit(){
    console.log(this.newAssignment.value);
    if(!this.isEmpty(this.newAssignment.value.title)){

      let data={"acceptAfterEnd" :this.newAssignment.value.accept,
                 "endDate":this.newAssignment.value.end,
                 "link":this.newAssignment.value.Qurl,
                 "note":this.newAssignment.value.note,
                 "startDate":this.newAssignment.value.start,
                 "title":this.newAssignment.value.title};
      let assignmentId;
      this.route.parent.paramMap.subscribe((params : ParamMap) =>  assignmentId=params.get('id'));
      this.ser.addAssignment( assignmentId,data);
      this.newAssignment.reset();
    } 
  }

}
