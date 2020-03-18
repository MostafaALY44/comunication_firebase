import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/user/assignment.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReviewSolutionComponent } from '../review-solution/review-solution.component';

@Component({
  selector: 'assignment-items',
  templateUrl: './assignment-items.component.html',
  styleUrls: ['./assignment-items.component.css']
})
export class AssignmentItemsComponent implements OnInit {

  assignments:Observable<Assignment[]>;
  courseId;
  constructor(private service:AssignmentService, route:ActivatedRoute, private dialog:MatDialog) {
    route.parent.paramMap.subscribe((params : ParamMap) =>{  
      this.courseId=params.get('id');
      this.assignments = service.getAssingment(this.courseId) });
    //this.assignments.subscribe(x=>console.log(x));
   }
 
  ngOnInit() {
  } 

  getDate(date){
    if(date != null)
      return date.toDate();
  }

  showSolutions(id:string){
    this.dialog.open(ReviewSolutionComponent, {data:{"courseId":this.courseId,"assignmentId":id}})
  }

  
}
