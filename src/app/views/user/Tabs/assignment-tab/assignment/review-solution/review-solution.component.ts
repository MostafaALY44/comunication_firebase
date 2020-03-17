import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AssignmentSolutionService } from 'src/app/services/user/assignment-solution.service';

@Component({
  selector: 'review-solution',
  templateUrl: './review-solution.component.html',
  styleUrls: ['./review-solution.component.css']
})
export class ReviewSolutionComponent implements OnInit {

  solutions:Observable<AssignmentSolution[]>;
  constructor(private service:AssignmentSolutionService, route:ActivatedRoute) {
    route.parent.paramMap.subscribe((params : ParamMap) =>  this.solutions = service.getAssingmentSolution(params.get('id')));
   }
 
  ngOnInit() {
  }

  getDate(date){
    if(date != null)
      return date.toDate();
  }


}
