import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AssignmentSolutionService } from 'src/app/services/user/assignment-solution.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'review-solution',
  templateUrl: './review-solution.component.html',
  styleUrls: ['./review-solution.component.css']
})

export class ReviewSolutionComponent implements OnInit {

  solutions:Observable<AssignmentSolution[]>;

  constructor(private service:AssignmentSolutionService, route:ActivatedRoute, @Inject(MAT_DIALOG_DATA) private data:any) {
    //console.log(this.data);
    this.solutions = service.getAssingmentSolution(this.data.courseId, this.data.assignmentId);
   //this.solutions.subscribe(x=>console.log(x))
   }
 
  ngOnInit() {
  }

  getDate(date){
    if(date != null)
      return date.toDate();
  }


}
