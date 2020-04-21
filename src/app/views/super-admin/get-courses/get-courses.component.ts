import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseFirebaseService } from 'src/app/services/user/oop/firebaseService/course-firebase.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Course } from 'src/app/services/user/oop/models/CourseMode';
import { UpdateCoursesComponent } from './update-courses/update-courses.component';

@Component({
  selector: 'get-courses',
  templateUrl: './get-courses.component.html',
  styleUrls: ['./get-courses.component.css']
})
export class GetCoursesComponent implements OnInit {
  routerLink:string="";
  isEmpty:boolean=false;
  dataSource;
  constructor(private router:ActivatedRoute,private _snackBar: MatSnackBar,
    private courseFirebaseService:CourseFirebaseService,public dialog:MatDialog) {

    this.router.parent.parent.paramMap.subscribe((params: ParamMap)=>{
      this.routerLink="universities/"+params.get('id1')+
      "/colleges/"+params.get('id2')
     // console.log(this.routerLink,"froooooooo")
    }).unsubscribe();

    this.dataSource=courseFirebaseService.getAll(this.routerLink);
      
      courseFirebaseService.getAll(this.routerLink).subscribe(courses=>{
          if(!courses.length){
        this.isEmpty=true;}
        else this.isEmpty=false;
        
      }).unsubscribe();
    
   }

  ngOnInit() {
  }
  getDate(date){
    if(date != null)
      return date.toDate();
  } 
  deleteCourse(course){
    this.courseFirebaseService.delete(this.routerLink,course["id"]);
    this._snackBar.open(course.code, 'Deleted Successfully', { duration: 3000, });
  }
  updateCourse(course:Course){
    this.dialog.open(UpdateCoursesComponent,{data:{'url':this.routerLink, 'courseCode':course["id"]}});
  }
 
  displayedColumns: string[] = ['code', 'date','action'];
}
