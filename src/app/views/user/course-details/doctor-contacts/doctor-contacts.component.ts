import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseFirebaseService } from 'src/app/services/user/oop/firebaseService/course-firebase.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/services/user/oop/models/CourseMode';

@Component({
  selector: 'app-doctor-contacts',
  templateUrl: './doctor-contacts.component.html',
  styleUrls: ['./doctor-contacts.component.css']
})
export class DoctorContactsComponent implements OnInit,OnDestroy {
  contacts;
  removeSubscribe:Subscription;
  constructor(private courseService:CourseFirebaseService,private router:ActivatedRoute,private _snackBar: MatSnackBar,@Inject(MAT_DIALOG_DATA) private data:any) {
   this.removeSubscribe= this.data.course.subscribe((myCourse:Course)=>{
      this.contacts=myCourse.contacts
    })
    
  }
  
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
    if(!this.isEmpty(this.contacts)){
   
      
      let data1={"contacts":this.contacts}
      this.courseService.update(this.data.link,this.data.id,data1).then(()=>{
        this._snackBar.open('your contact', 'Added Successfully', { duration: 3000, });
      })
      
    }
    
  }

}
