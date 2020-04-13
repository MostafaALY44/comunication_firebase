import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';
import { CourseFirebaseService } from 'src/app/services/user/oop/firebaseService/course-firebase.service';

@Component({
  selector: 'app-save-data',
  templateUrl: './save-data.component.html',
  styleUrls: ['./save-data.component.css']
})
export class SaveDataComponent implements OnInit {

  constructor(private courseFirebaseService:CourseFirebaseService, @Inject(MAT_DIALOG_DATA) private data:{link:string,courses:string[]}) { 
    console.log(data.courses.length)
  }

  changeCode:string=""
  currentCode:string="";
  changeCurrentCodeState(code:string){
    this.currentCode=code;
    this.changeCode=this.currentCode;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      try {
        document.getElementById('!'+code+'!').focus();
      } catch (error) {
        
      }
    },50); 
    
  }
  reset(i:number){
    if(this.changeCode=="")
      this.data.courses.splice(i,1)
    else{
      if(!this.data.courses.find(element=> element===this.changeCode))
        this.data.courses[i]=this.changeCode;
    }
      
    
    this.currentCode=this.changeCode=''
  }
  canEdit(code:string):boolean{
    return this.currentCode === code
  }
  onSubmit(){
    this.data.courses.forEach(elemet=>{
      this.courseFirebaseService.create(this.data.link,elemet);
    })
  }
  ngOnInit() {
  }

}
