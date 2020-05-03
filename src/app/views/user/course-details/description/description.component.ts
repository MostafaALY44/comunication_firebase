import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseFirebaseService } from 'src/app/services/user/oop/firebaseService/course-firebase.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseDetailsComponent } from '../course-details.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/services/user/oop/models/CourseMode';
import { Directive, HostListener, ElementRef, Input } from "@angular/core";

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit,OnDestroy {
  discriptions;
  removeSubscribe:Subscription;
  constructor(private courseService:CourseFirebaseService,private router:ActivatedRoute,private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) private data:any) {
   this.removeSubscribe= this.data.course.subscribe((myCourse:Course)=>{
      this.discriptions=myCourse.description
     
      console.log(myCourse.description)
    })
    
  }
  // myForm = new FormGroup({
  //   description : new FormControl(this.discriptions,Validators.required),
    
  // });
  ngOnDestroy(): void {
    if(this.removeSubscribe)
      this.removeSubscribe.unsubscribe();
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
    if(!this.isEmpty(this.discriptions)){
   
      
      let data1={"description":this.discriptions}
      this.courseService.update(this.data.link,this.data.id,data1).then(()=>{
        this._snackBar.open('your description', 'Added Successfully', { duration: 3000, });
      })
      
    }
    
  }

}
