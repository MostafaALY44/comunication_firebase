import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssignmentSolutionService } from 'src/app/services/user/assignment-solution.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/oop/user.service';

@Component({
  selector: 'assignment-solution',
  templateUrl: './assignment-solution.component.html',
  styleUrls: ['./assignment-solution.component.css']
})
export class AssignmentSolutionComponent implements OnInit {

  newSolution = new FormGroup({
    Aurl : new FormControl('',Validators.required),
    note : new FormControl('')
    
    
  });
  currentUser;
  constructor(private service: AssignmentSolutionService, private route:ActivatedRoute, @Inject(MAT_DIALOG_DATA) private data:any) {

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
    //console.log(this.newSolution.value); 
    if(!this.isEmpty(this.newSolution.value.Aurl)){

      let data={"note":this.newSolution.value.note,
                 "url":this.newSolution.value.Aurl,
                 "personId":this.currentUser.name
                 };
      this.service.addAssignmentSolution( this.data.courseId,this.data.assignmentId,data);
      this.newSolution.reset();
    } 
  }


}
