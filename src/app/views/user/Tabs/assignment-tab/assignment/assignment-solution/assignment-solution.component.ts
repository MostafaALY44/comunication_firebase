import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AssignmentSolutionService } from 'src/app/services/user/assignment-solution.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

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
  constructor(private service: AssignmentSolutionService, private route:ActivatedRoute) { }

  ngOnInit() {
  }
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }

  onSubmit(){
    console.log(this.newSolution.value); 
    if(!this.isEmpty(this.newSolution.value.Aurl)){

      let data={"note":this.newSolution.value.note,
                 "url":this.newSolution.value.Aurl
                 };
      let solutionId;
      let assignmentId;
      this.route.parent.paramMap.subscribe((params : ParamMap) =>  assignmentId=params.get('id'));
      this.route.paramMap.subscribe((params : ParamMap) =>  solutionId=params.get('id'));
      this.service.addAssignmentSolution( assignmentId,solutionId,data);
      this.newSolution.reset();
    } 
  }


}
