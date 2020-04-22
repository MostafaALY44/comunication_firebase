import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators  } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SaveDataComponent } from './save-data/save-data.component';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'edit-courses',
  templateUrl: './edit-courses.component.html',
  styleUrls: ['./edit-courses.component.css']
})
export class EditCoursesComponent implements OnInit {
  routerLink:string="";
  constructor(private fb: FormBuilder, public dialog:MatDialog, private router:ActivatedRoute) {
    this.router.parent.parent.paramMap.subscribe((params: ParamMap)=>{
      this.routerLink="universities/"+params.get('id1')+
      "/colleges/"+params.get('id2')
      console.log(this.routerLink)
    }) 
      
    this.registrationForm = this.fb.group({
      courseCode:['', Validators.required],
      newCourseCode: this.fb.array([])
    })
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

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(!this.canObenDialog)
      return;
    if(event.key == "Shift"){
      if(this.setIndex==-1)
        if(this.registrationForm.get('courseCode').valid && !this.isEmpty(this.registrationForm.value.courseCode))
          this.addnewCourseCode();

      if(this.newCourseCode.valid && !this.isEmpty(this.registrationForm.value.newCourseCode[this.setIndex])){
        this.addnewCourseCode()
      }
    }else if(event.key == "Enter"){
      this.onSubmit();
    }
  }
  canObenDialog:boolean=true;
  onSubmit(){
    let courses:string[]=[];
    let arr=this.registrationForm.value.newCourseCode
    if(this.registrationForm.value.courseCode != "")
      arr.push(this.registrationForm.value.courseCode);


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
        courses.push(arr[i]);
    }
    
    if(this.canObenDialog){
      this.canObenDialog=false;
      let cells =document.getElementsByClassName("toAdd")
      for (var i = 0; i < cells.length; i++) { 
        cells[i].setAttribute("disabled","disabled");
      }
      let ref =this.dialog.open(SaveDataComponent,{data:{link:this.routerLink ,courses:courses}, height: '600px', width: '900px', disableClose: true})
      let removesubscribe=ref.afterClosed().subscribe(()=>{
        this.canObenDialog=true;
        for (var i = 0; i < cells.length; i++) { 
          cells[i].removeAttribute("disabled");
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
