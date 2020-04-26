import { Component, OnInit, Input, HostListener, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Roles } from 'src/app/services/auth/user.model';

@Component({
  selector: 'app-create-person-form',
  templateUrl: './create-person-form.component.html',
  styleUrls: ['./create-person-form.component.css']
})
export class CreatePersonFormComponent implements OnInit {
  //registrationForm: FormGroup;
  @Input() idIndex: string;
  @Input() disable: boolean;
 // @Input() formData:{email:string, courses:string[], "roles":Roles};
  @Output() isformDataDone=new EventEmitter<boolean>(false)
  @Output() destroyItSelf=new EventEmitter<boolean>(false)
  inputsFieldNumber:number=2;
  tempInputsFieldNumber:number=0;
  static allPersons:{"id":number, "obj":{email:string, courses:string[], "roles":Roles}, "index":string}[]=[];
  static allPersonsIndexOriginLength=0;
  static allPersonCourses:Map<string, number[]>= new Map();
  static reset(){
    CreatePersonFormComponent.allPersons=[];
    CreatePersonFormComponent.allPersonsIndexOriginLength=0;
    CreatePersonFormComponent.allPersonCourses.clear();
  }

  constructor(private fb: FormBuilder) {
    // this.registrationForm = this.fb.group({
    //   email:['', Validators.required],
    //   courses: ['', Validators.required],
    //   editCourses: ['', Validators.required],
    // })
   }

   courses:string[]=[];
  
  ngOnInit() {
    console.log("email"+this.idIndex)
    setTimeout(()=>{
      document.getElementById("email"+this.idIndex).focus()
    }, 100)
    //this.email=this.formData.email;
    //this.courses=this.formData.courses
    
  }

  private increment(){
    if(this.inputsFieldNumber > this.tempInputsFieldNumber)
      this.tempInputsFieldNumber++;
    if(this.inputsFieldNumber == this.tempInputsFieldNumber){
      this.onSubmit();
      this.isformDataDone.emit(true)
    }
    else
      this.isformDataDone.emit(false)
  }

  private decrement(){
    if( this.tempInputsFieldNumber > 0)
      this.tempInputsFieldNumber--;

    this.isformDataDone.emit(false)
  }

  isEmail(email):boolean{
    if(!email)
      return false;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  onChangeEmail(){
    if(this.isEmail(this.email)){
      this.increment();
    }else
      this.decrement();
  }
  keyUp(char, courses){
    
    if(char.key==" "){
      courses.disabled=true;
      if(!courses.value.length || this.isEmpty(courses.value)){
        courses.value=""
        courses.disabled=false;
        return
      }
      
      const word :string=courses.value.slice(0,courses.value.length-1).toUpperCase().trim();
      if(word != "")
      if(!this.courses.find(element=> element=== word)){
        
        this.courses.push(word)
        if(this.courses.length==1)
          this.increment();
        
          console.log("this.courses.forEach( ", this.courses)
        
          if(CreatePersonFormComponent.allPersonCourses.has(word))
            CreatePersonFormComponent.allPersonCourses.get(word).push(this.hisId);
          else
          CreatePersonFormComponent.allPersonCourses.set(word, [this.hisId]);
        
        
        // if(CreatePersonFormComponent.allPersonCourses.has(word))
        //   CreatePersonFormComponent.allPersonCourses.get(word).push(this.hisId)
        // else
        //   CreatePersonFormComponent.allPersonCourses.set(word, [this.hisId])
         // CreatePersonFormComponent.allPersonCourses.set(word, true)
        //console.log(CreatePersonFormComponent.allPersonCourses)
      }
      
      courses.value=""
      courses.disabled=false;
      courses.focus()
    }
  }

  currentElement:string;
  currentTemp:string="";
  email:string;
  changeCurrentCodeState(i:number){
    //this.index=i;
    this.currentElement=this.courses[i];
    this.currentTemp=this.currentElement;
    
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
        document.getElementById(i.toString()).focus();
    },50); 
    
  }

  canEdit(i:number):boolean{
    //console.log("canEdit "+this.courses[i])
    return this.courses[i] == this.currentElement;
  }

  isEmpty(text:string):boolean{
    if(!text)
    return true;
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }

  destroyItSelfe(){
    if(!this.isFirstTime ){
      CreatePersonFormComponent.allPersons[this.hisId].obj.courses.forEach(element=>{
        CreatePersonFormComponent.allPersonCourses.get(element).splice(
          CreatePersonFormComponent.allPersonCourses.get(element).findIndex(num=> num==this.hisId)
          ,1)
      })
      CreatePersonFormComponent.allPersons.splice(
      CreatePersonFormComponent.allPersons.findIndex(x=>x.id== this.hisId) 
      , 1);
      
    }
    console.log(" CreatePersonFormComponent.allPersons ", CreatePersonFormComponent.allPersons)
    this.destroyItSelf.emit(true);
    //this.ngOnDestroy();
  }

  reset(i:number){
    const word :string=this.currentTemp.trim().toUpperCase();
    if(word.length && !this.isEmpty(word)){
      //CreatePersonFormComponent.allPersonCourses.delete(this.courses[i])
      // let index=CreatePersonFormComponent.allPersonCourses.get(this.courses[i]).findIndex(element=> element===this.hisId)
      // if(index > -1)
      //   CreatePersonFormComponent.allPersonCourses.get(this.courses[i]).splice(index, 1);
      this.courses[i] = word;
      // if(CreatePersonFormComponent.allPersonCourses.has(word))
      //   CreatePersonFormComponent.allPersonCourses.get(word).push(this.hisId)
      // else
      //   CreatePersonFormComponent.allPersonCourses.set(word, [this.hisId])
    }else{
      // let index=CreatePersonFormComponent.allPersonCourses.get(this.courses[i]).findIndex(element=> element===this.hisId)
      // if(index > -1)
      //   CreatePersonFormComponent.allPersonCourses.get(this.courses[i]).splice(index, 1);
      //CreatePersonFormComponent.allPersonCourses.delete(this.courses[i])
      this.courses.splice(i,1);
      if(!this.courses.length)
        this.decrement();
    }
    
    this.currentElement=""
  }

index:number =CreatePersonFormComponent.allPersons.length-1;
isFirstTime:boolean=true;
hisId:number;
  onSubmit(){
    console.log({"roles":{[this.PersonRule]:true}});
    // if(this.isFirstTime){

    //   CreatePersonFormComponent.allPersons.push({"id":CreatePersonFormComponent.allPersons.length,
    //    "obj":{email:this.email, courses:this.courses,
    //     "roles":{[this.PersonRule]:true}}, "index":this.idIndex})
    //     this.hisId=this.index =CreatePersonFormComponent.allPersonsIndexOriginLength;
    //     CreatePersonFormComponent.allPersonsIndexOriginLength++;
    //     this.isFirstTime=false;
    // }else{
    //   if(this.index < CreatePersonFormComponent.allPersons.length){
    //     if(CreatePersonFormComponent.allPersons[this.index].id==this.hisId){
    //       CreatePersonFormComponent.allPersons[this.index]={"id":this.hisId,
    //       "obj":{email:this.email, courses:this.courses,
    //       "roles":{[this.PersonRule]:true}}, "index":this.idIndex}
    //     }else{
    //       this.index=CreatePersonFormComponent.allPersons.findIndex(element=> element.id===this.hisId)
    //       CreatePersonFormComponent.allPersons[this.index]={"id":this.hisId,
    //       "obj":{email:this.email, courses:this.courses,
    //       "roles":{[this.PersonRule]:true}}, "index":this.idIndex}
    //     }
    //   }else{
    //     this.index=CreatePersonFormComponent.allPersons.findIndex(element=> element.id===this.hisId)
    //       CreatePersonFormComponent.allPersons[this.index]={"id":this.hisId,
    //       "obj":{email:this.email, courses:this.courses,
    //       "roles":{[this.PersonRule]:true}}, "index":this.idIndex}
    //   }
      
    // }
    
    
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event);
    if(this.disable)
      return;
    if(event.key == "ArrowDown"){
      setTimeout(()=>{
        document.getElementById("courses"+this.idIndex).focus()
      }, 100)
    }else if(event.key == "ArrowUp"){
      setTimeout(()=>{
        document.getElementById("email"+this.idIndex).focus()
      }, 100)
    }else if(event.key == "ArrowRight"){
      //this.PersonRule="student";
      console.log(this.PersonRule);
      setTimeout(()=>{
        if(this.isFocusRight)
          return;
        this.isFocusRight=true;
        this.isFocusLeft=false;
          //document.getElementById("instructor"+this.idIndex).blur();
          document.getElementById("student"+this.idIndex).focus();
          //document.getElementById("instructor"+this.idIndex).blur();
          
        
      }, 0)
    }else if(event.key == "ArrowLeft"){
      //this.PersonRule="instructor";
      console.log(this.PersonRule);
      setTimeout(()=>{
        if(this.isFocusLeft)
          return;
        this.isFocusLeft=true;
        this.isFocusRight=false;
        
          //document.getElementById("student"+this.idIndex).blur()
          document.getElementById("instructor"+this.idIndex).focus();
          //document.getElementById("student"+this.idIndex).blur()
          
        
      }, 0)
    }else if(event.key == "Escape"){
      setTimeout(()=>{
        this.destroyItSelfe();
      }, 0)
    }
  }
  isFocusLeft:boolean=false;
  isFocusRight:boolean=false;
  PersonRule:string="";
 
}
