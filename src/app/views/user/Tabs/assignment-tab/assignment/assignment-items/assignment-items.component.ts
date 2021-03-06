import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { UserService } from 'src/app/services/user/oop/user.service';
import { NotificationService } from 'src/app/services/user/oop/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'assignment-items',
  templateUrl: './assignment-items.component.html',
  styleUrls: ['./assignment-items.component.css']
})
export class AssignmentItemsComponent implements OnInit , OnDestroy{

  assignments:Observable<Assignment[]>;
  
  courseId;
  dataSource:any;
  currentUser;
  removesubscribe;
  isEmpty:boolean=false;
  myDate = new Date();
  //newDates;
  disablebutton:boolean=false;
  constructor(private service:AssignmentService, route:ActivatedRoute, private dialog:MatDialog,private _snackBar: MatSnackBar,
    private userService:UserService,private datePipe: DatePipe) {
      //this.newDates = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    route.parent.paramMap.subscribe((params : ParamMap) =>{  
      this.courseId=params.get('id')});
     
    
    this.assignments=CourseService.assignments;
    this.removesubscribe=CourseService.assignments.subscribe(assignments=>{
      if(!assignments.length){
        this.isEmpty=true;}
        else this.isEmpty=false;
      let obj={[UserService.indexNotification+".assignmentNumber"]:assignments.length}
      this.userService.update( obj)
      if(NotificationService.currNotification)
        NotificationService.currNotification.assignmentsNumber=0
        // assignments.forEach(assignment=>{
          
        //   let newDate = new Date(assignment.endDate);
        //   // console.log(this.myDate.getTime(),">")
        //   // console.log(newDate.getTime(),">",this.myDate.getTime())
        //   if(newDate.getTime()>=this.myDate.getTime()){
        //     console.log(this.myDate.getTime(),">");
        //      this.disablebutton=true;
        //   } else{
        //     this.disablebutton=false;
        //     console.log(this.disablebutton)
        //   } 
         
         
        // })
    })
    this.dataSource=this.assignments;
    this.currentUser= UserService.getUser();

   }
  ngOnDestroy(): void {
    if(this.removesubscribe)
      this.removesubscribe.unsubscribe()
  }
 
  ngOnInit() {
    // this.assignments.subscribe(assignment=>{
    //   if(!assignment.length){
    //     this.isEmpty=true;}
    //     else this.isEmpty=false;
    // })
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
    this.currentAssign=assignment;
    
  }
  AddAssignment(){
    this.dialog.open(AddAssignmentComponent, {data:{"courseId":this.courseId}})
  }

  deleteAssignment(){
    this.service.deleteAssignment(this.courseId,this.currentAssign["id"]).then(()=>{
      this._snackBar.open(this.currentAssign['title'], 'Deleted Successfully', { duration: 3000, });
    })
    

  } 
  editAssignment(){
    this.dialog.open(EditAssignmentComponent,{data:{"assignment":this.currentAssign,"courseId":this.courseId}})
  }

  displayedColumns: string[] = ['name', 'date','end_date', 'note', 'link', 'result', 'actions'];

  displayedColumns1: string[] = ['name', 'date','end_date', 'note', 'link', 'result'];
  
  checkEndDate(endDate):boolean{
    let newDate = new Date(endDate);
    // console.log(newDate)
    // console.log(this.myDate)
    if(newDate>=this.myDate) return true;
    else return false;
  }

}

