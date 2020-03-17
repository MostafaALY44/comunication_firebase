import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/user/assignment.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'assignment-items',
  templateUrl: './assignment-items.component.html',
  styleUrls: ['./assignment-items.component.css']
})
export class AssignmentItemsComponent implements OnInit {

  assignments:Observable<Assignment[]>;

  constructor(private service:AssignmentService, route:ActivatedRoute) {
    route.parent.paramMap.subscribe((params : ParamMap) =>  this.assignments = service.getAssingment(params.get('id')));
    //this.assignments.subscribe(x=>console.log(x));
   }
 
  ngOnInit() {
  } 

  getDate(date){
    if(date != null)
      return date.toDate();
  }

  
}
