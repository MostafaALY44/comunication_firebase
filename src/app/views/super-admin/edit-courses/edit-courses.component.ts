import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators  } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SaveDataComponent } from './save-data/save-data.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { CourseFirebaseService } from 'src/app/services/user/oop/firebaseService/course-firebase.service';

@Component({
  selector: 'edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit, OnDestroy {
  routerLink:string="";
  allCourses:Map<string, boolean>=new Map<string, boolean>();
  allNewCourses:Map<string, boolean>=new Map<string, boolean>();
  removeSubscribe:Subscription;
  constructor(private fb: FormBuilder, public dialog:MatDialog, private courseFirebaseService:CourseFirebaseService,
     private router:ActivatedRoute,route:Router) {
    this.router.parent.paramMap.subscribe((params: ParamMap)=>{
      this.routerLink="universities/"+params.get('id1')+
      "/colleges/"+params.get('id2')
      console.log(this.routerLink)
    }) 
    this.removeSubscribe=this.courseFirebaseService.getAllCodesAsMap(this.routerLink).subscribe(courses=>
        this.allCourses= courses
      )
    this.registrationForm = this.fb.group({
      courseCode:['', Validators.required],
      newCourseCode: this.fb.array([])
    })

    AuthenticationService.currentAdminLink= route.url;
  }
  ngOnDestroy(): void {
    if(this.removeSubscribe)
      this.removeSubscribe.unsubscribe();
  }
  setIndex=-1;
 
  registrationForm: FormGroup;

  get newCourseCode(){
    return this.registrationForm.get('newCourseCode') as FormArray
  }

  addnewCourseCode(){
    this.newCourseCode.push(this.fb.control('',Validators.required))
    this.setIndex++;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      document.getElementById(this.setIndex.toString()).focus()
      //this.searchElement.nativeElement.focus();
    },10); 
  }

  isEmpty(text:string):boolean{
    if(!text)
    return true;
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }

  showId(index):boolean{
    return index == this.isCodeExist;
  }

  isCodeExist:number=-2;
  isIdExist(key:string):boolean{
    if(this.allCourses.has(key.trim()) || this.allNewCourses.has(key.trim())){
      if(this.setIndex==-1)
        this.isCodeExist=-1
      else
        this.isCodeExist=this.registrationForm.value.newCourseCode.length-1;
      return true;
    }
    if(!this.isEmpty(key))
      this.allNewCourses.set(key, true)
    this.isCodeExist=-2;
    return false;
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(!this.canObenDialog)
      return;
    if(event.key == "Shift"){
      if(this.setIndex==-1)
        if(this.registrationForm.get('courseCode').valid 
          && !this.isEmpty(this.registrationForm.value.courseCode)
          && !this.isIdExist(this.registrationForm.value.courseCode))
          this.addnewCourseCode();

      if(this.newCourseCode.valid 
        && !this.isEmpty(this.registrationForm.value.newCourseCode[this.setIndex])
        && !this.isIdExist(this.registrationForm.value.newCourseCode[this.setIndex])){
        this.addnewCourseCode()
      }
    }else if(event.key == "Enter"){
      this.onSubmit();
    }
  }
  canObenDialog:boolean=true;
  onSubmit(){
    if(this.setIndex==-1)
      this.isIdExist(this.registrationForm.value.courseCode)
    else
        this.isIdExist(this.registrationForm.value.newCourseCode[this.registrationForm.value.newCourseCode.length-1])
    
    console.log(this.isCodeExist)
    if(this.isCodeExist!=-2)
      return;
    let courses:string[]=[];
    console.log(this.registrationForm.value.newCourseCode)
    let arr=JSON.parse(JSON.stringify( this.registrationForm.value.newCourseCode))
    if(this.registrationForm.value.courseCode != "")
      arr.push(this.registrationForm.value.courseCode.trim().toUpperCase());


    let flag:boolean;
    for (let i = 0; i <  arr.length; i++) {
      flag=true;
      if(arr[i] == "")
        continue;
      for (let j = i+1; j <  arr.length; j++){
        if(arr[i]==arr[j]){
          flag=false;
          break;
        }
      } 
      if(flag)
        courses.push(arr[i].trim().toUpperCase());
    }
    
    if(this.canObenDialog){
      this.canObenDialog=false;
      let cells =document.getElementsByClassName("toAdd")
      for (var i = 0; i < cells.length; i++) { 
        cells[i].setAttribute("disabled","disabled");
      }
      let ref =this.dialog.open(SaveDataComponent,{data:{link:this.routerLink ,courses:courses}, height: '600px', width: '900px', disableClose: true})
      let removesubscribe=ref.afterClosed().subscribe((ss)=>{

        this.canObenDialog=true;
        for (var i = 0; i < cells.length; i++) { 
          cells[i].removeAttribute("disabled");
        }
        
        this.allNewCourses.clear();
        if(ss.data.isSendToDB){
          this.newCourseCode.clear();
          this.registrationForm.reset();
        }
        setTimeout(()=>
          this.dounsubscribe(removesubscribe)
        ,0)
    })
  }}
dounsubscribe(removesubscribe:Subscription){
  removesubscribe.unsubscribe()
}

  ngOnInit() {
  }

}
