import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseFirebaseService } from 'src/app/services/user/oop/firebaseService/course-firebase.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseDetailsComponent } from '../course-details.component';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit,OnDestroy {
  routerLink;
  idCourse;
  constructor(private courseService:CourseFirebaseService,private router:ActivatedRoute,private _snackBar: MatSnackBar) {
    CourseDetailsComponent.displayCourseName.next(false)
    this.router.parent.paramMap.subscribe((params: ParamMap)=>{
      this.routerLink="universities/"+params.get('id1')+
      "/colleges/"+params.get('id2')
      this.idCourse=params.get('id3');
    }).unsubscribe();
   }
  ngOnDestroy(): void {
    CourseDetailsComponent.displayCourseName.next(true)
  }

  myForm = new FormGroup({
    description : new FormControl("",Validators.required),
    
  });


  ngOnInit() { 
  }
  isEmpty(text:string):boolean{
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }
  resetForm(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
}
  onSubmit(){
    if(!this.isEmpty(this.myForm.value.description)){
   
      
      let data={"description":this.myForm.value.description}
      this.courseService.update(this.routerLink,this.idCourse,data).then(()=>{
        this._snackBar.open('your description', 'Added Successfully', { duration: 3000, });
      })
      
    }
    this.resetForm(this.myForm);
  }

}
