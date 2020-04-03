import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/app/services/user/assignment.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ReviewSolutionComponent } from '../review-solution/review-solution.component';
import { AssignmentSolutionComponent } from '../assignment-solution/assignment-solution.component';
import { AddAssignmentComponent } from '../add-assignment/add-assignment.component';
import { EditAssignmentComponent } from '../edit-assignment/edit-assignment.component';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'assignment-items',
  templateUrl: './assignment-items.component.html',
  styleUrls: ['./assignment-items.component.css']
})
export class AssignmentItemsComponent implements OnInit {

  assignments:Observable<Assignment[]>;
  
  courseId;
  dataSource:any;
  constructor(private service:AssignmentService, route:ActivatedRoute, private dialog:MatDialog) {
    route.parent.paramMap.subscribe((params : ParamMap) =>{  
      this.courseId=params.get('id')});
     // this.assignments = service.getAssingment(this.courseId) });
    //this.assignments.subscribe(x=>console.log(x));
    
    this.assignments=CourseService.assignments;
    this.dataSource=this.assignments;

   }
 
  ngOnInit() {
  } 
 
  getDate(date){
    if(date != null)
      return date.toDate();
  }

  showSolutions(id:string){
    this.dialog.open(ReviewSolutionComponent, {data:{"courseId":this.courseId,"assignmentId":id},
    height: '300px',
    width: '500px',
  })
  }
  addSolution(id:string){
    this.dialog.open(AssignmentSolutionComponent, {data:{"courseId":this.courseId,"assignmentId":id},
                                                    height: '250px',
                                                    width: '400px',
                                                  })
  }
  currentAssign; 
  setAssignment(assignment){
    console.log(assignment)
    this.currentAssign=assignment;
    
  }
  AddAssignment(){
    this.dialog.open(AddAssignmentComponent, {data:{"courseId":this.courseId}})
  }

  deleteAssignment(){
    this.service.deleteAssignment(this.courseId,this.currentAssign["id"]);
  } 
  editAssignment(){
    this.dialog.open(EditAssignmentComponent,{data:{"assignment":this.currentAssign,"courseId":this.courseId}})
  }

  displayedColumns: string[] = ['name', 'start_date','end_date', 'note', 'link', 'result', 'actions'];
  
}

