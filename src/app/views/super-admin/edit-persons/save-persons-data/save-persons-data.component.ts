import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AddPersonService } from '../../service/add-person.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ParamMap, Params } from '@angular/router';
import { Roles } from 'src/app/services/auth/user.model';
import { CourseFirebaseService } from 'src/app/services/user/oop/firebaseService/course-firebase.service';
import { CreatePersonFormComponent } from '../create-persons/create-person-form/create-person-form.component';
import { SaveDataComponent } from '../../edit-courses/save-data/save-data.component';
import { element } from 'protractor';

@Component({
  selector: 'app-save-persons-data',
  templateUrl: './save-persons-data.component.html',
  styleUrls: ['./save-persons-data.component.css']
})
export class SavePersonsDataComponent implements OnInit, OnDestroy {
  coursesNotCreatedYet:string[]=[];
  constructor(private addPersonService:AddPersonService, private courseService:CourseFirebaseService,
    private dialogRef: MatDialogRef<SavePersonsDataComponent>,
    private dialog:MatDialog,
     @Inject(MAT_DIALOG_DATA) public data:{paramMap:Observable<ParamMap>, mapCourses:Map<string, number[]>,
    persons:{"id":number, "obj":{email:string, courses:string[], "roles":Roles}, "index": number }[]}) {
     this.checkCodesFromDB()
      
    }
  ngOnDestroy(): void {
    this.unsubscribeCheckCodesFromDB();
  }
  
  routerLink:string="";
  idUniversity:string="";
  idCollege:string="";
  removeSubscribe1;
  removeSubscribe2;
  checkCodesFromDB(){
    this.unsubscribeCheckCodesFromDB();
    this.removeSubscribe1=this.data.paramMap.subscribe((param:ParamMap)=>{
      this.routerLink = "universities/"+param.get('id1')+"/colleges/"+param.get('id2');
      this.idUniversity=param.get('id1');
      this.idCollege=param.get('id2');
      this.setCoursesNotCreatedYet();
    })
  }
  setCoursesNotCreatedYet(){
    if(this.removeSubscribe2)
      this.removeSubscribe2.unsubscribe()
    this.removeSubscribe2=this.courseService.getAllCodesAsMap(this.routerLink)
      .subscribe( mapData=>{
        this.coursesNotCreatedYet=[];
        this.data.mapCourses.forEach((value:number[], key:string)=>{
          if(!mapData.has(key))
            this.coursesNotCreatedYet.push(key);
        })
      })
  }
  unsubscribeCheckCodesFromDB(){
    if( this.removeSubscribe1)
      this.removeSubscribe1.unsubscribe()
    if( this.removeSubscribe2)
      this.removeSubscribe2.unsubscribe()
  }

  needRegisterCourses():boolean{
    return this.coursesNotCreatedYet.length != 0
  }

  updateCode(key, event){
    let arrTemp:number[]=[];
    
    this.data.mapCourses.get(key).forEach(elementId=>{
      for (let index = 0; index < this.data.persons.length; index++) {
        if(this.data.persons[index].id == elementId){
           for (let index2 = 0; index2 < this.data.persons[index].obj.courses.length; index2++) {
            if(this.data.persons[index].obj.courses[index2] == key){
              if(event.target.textContent.length){
                this.data.persons[index].obj.courses[index2]= event.target.textContent;
                if(this.data.mapCourses.has(event.target.textContent))
                  this.data.mapCourses.get(event.target.textContent).push(elementId)
                else{
                  this.data.mapCourses.set(event.target.textContent, [elementId])
                  
                }
              }else 
                this.data.persons[index].obj.courses.splice(index2,1);

              arrTemp.push(elementId)
              break;
            }   
           }
        }
        
      }
      
    })
    
    arrTemp.forEach(id=>{
      this.data.mapCourses.get(key).splice(
        this.data.mapCourses.get(key).findIndex(x=> x==id)
        ,1)
      if(!this.data.mapCourses.get(key).length){
        this.data.mapCourses.delete(key)
        
        this.setCoursesNotCreatedYet();
      }
    })
  }
  
  registerCourses(){
    let x:string[]=JSON.parse(JSON.stringify( this.coursesNotCreatedYet))
    let ref=this.dialog.open(SaveDataComponent,{data:{link:this.routerLink ,courses: x}, height: '600px', width: '900px', disableClose: true})
    let removeSub=ref.afterClosed().subscribe((ss: {data:{editData:Map<string,string>, isSendToDB:boolean}} )=>{
      if(ss.data.isSendToDB ){
        
        ss.data.editData.forEach((value, key)=>{
          let ids=this.data.mapCourses.get(key)
          for (let index = 0; index < this.data.persons.length; index++) {
            if(ids.findIndex(id=>id==this.data.persons[index].id ) >-1){
               for (let index2 = 0; index2 < this.data.persons[index].obj.courses.length; index2++) {
                if(this.data.persons[index].obj.courses[index2] == key){
                  if(value.length)
                    this.data.persons[index].obj.courses[index2]= value;
                  else
                    this.data.persons[index].obj.courses.splice(index2, -1);
                  //break;
                }   
               }
            }
            
          }
          this.data.mapCourses.set(value,this.data.mapCourses.get(key));
          this.data.mapCourses.delete(key)
        })
        
      }
      setTimeout(()=>{removeSub.unsubscribe()},0)
    })
  }

  ngOnInit() {
  }
  
  closeDialog(){
    this.dialogRef.close({data:this.removedData});
  }

  isEmail(email):boolean{
    if(!email)
      return false;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  withoutId(obj:{id: number,obj: { email: string, courses: string[], roles: Roles}, index:string}[])
  :{ email: string, courses: string[], roles: Roles}[]{
    let objTemp :{ email: string, courses: string[], roles: Roles}[]=[]
    obj.forEach(element=>{
      objTemp.push(element.obj)
    })
    return objTemp;
  }
  

  changeCode:string=""
  currentCode:string="";
  currentId:string="";
  changeCurrentFieldState(code:string, id:string){
    this.currentCode=code;
    this.changeCode=this.currentCode;
    this.currentId=id;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      try {
        document.getElementById('!'+id+'!').focus();
      } catch (error) {
        
      }
    },50); 
  } 
  removedData:number[]=[]
  reset(i:number, key:string, ii?:number){

    if(key == "email"){
      if(this.changeCode==""){
        this.removedData.push(this.data.persons[i].index)
        CreatePersonFormComponent.allPersons[i].obj.courses.forEach(element=>{
          CreatePersonFormComponent.allPersonCourses.get(element).splice(
            CreatePersonFormComponent.allPersonCourses.get(element).findIndex(num=> num==CreatePersonFormComponent.allPersons[i].id)
            ,1)
        })
        this.data.persons[i].obj.courses.forEach(element=>{
          CreatePersonFormComponent.allPersonCourses.get(element).splice(
            this.data.persons[i].id
            ,1)
          if(! CreatePersonFormComponent.allPersonCourses.get(element).length)
            CreatePersonFormComponent.allPersonCourses.delete(element)
        })
        
        
        this.data.persons.splice(i,1)
      }
        
      else{
        const word :string=this.changeCode.trim();
        if(!this.data.persons.find(element=> element.obj.email===word) && this.isEmail(word)){
          this.data.persons[i].obj.email=word;}
      } 
    }else if(key == "courses"){
      const word :string=this.changeCode.toUpperCase().trim();
      let fI=this.data.persons[i].obj.courses.findIndex(el=>el==word)
    
      if(this.changeCode=="" || (fI != -1 && fI !=ii)){
        
        CreatePersonFormComponent.allPersonCourses.get(this.data.persons[i].obj.courses[ii]).splice(
          CreatePersonFormComponent.allPersonCourses.get(this.data.persons[i].obj.courses[ii]).findIndex(element=>element == this.data.persons[i].id)
          , 1)
          if(! CreatePersonFormComponent.allPersonCourses.get(this.data.persons[i].obj.courses[ii]).length)
            CreatePersonFormComponent.allPersonCourses.delete(this.data.persons[i].obj.courses[ii])
        this.data.persons[i].obj.courses.splice(ii,1)
        if(!this.data.persons[i].obj.courses.length){
          this.removedData.push(this.data.persons[i].index)
          this.data.persons.splice(i,1)
        }
        //this.checkCodesFromDB();
      }else{
        if(this.data.persons[i].obj.courses[ii] != word){
          
          //CreatePersonFormComponent.allPersonCourses.delete(this.data.persons[i].courses[ii])
         if( CreatePersonFormComponent.allPersonCourses.has(this.data.persons[i].obj.courses[ii])){
          CreatePersonFormComponent.allPersonCourses.get(this.data.persons[i].obj.courses[ii]).splice(
            CreatePersonFormComponent.allPersonCourses.get(this.data.persons[i].obj.courses[ii]).findIndex(element=>element == this.data.persons[i].id)
            , 1)
            if(!CreatePersonFormComponent.allPersonCourses.get(this.data.persons[i].obj.courses[ii]).length)
              CreatePersonFormComponent.allPersonCourses.delete(this.data.persons[i].obj.courses[ii])
            }

          if(!this.data.persons[i].obj.courses.find(element=>{element == word})){  
            this.data.persons[i].obj.courses[ii]=word;
            //CreatePersonFormComponent.allPersonCourses.set(this.data.persons[i].courses[ii], true)
            if(CreatePersonFormComponent.allPersonCourses.has(word))
              CreatePersonFormComponent.allPersonCourses.get(word).push(this.data.persons[i].id)
            else
              CreatePersonFormComponent.allPersonCourses.set(word, [this.data.persons[i].id])
          //this.checkCodesFromDB();
          }else{// copy past code when input ""
            this.data.persons[i].obj.courses.splice(ii,1)
            if(!this.data.persons[i].obj.courses.length){
              this.removedData.push(i)
              this.data.persons.splice(i,1)
            }
          }
        }
      } 
    }
    this.currentCode=this.changeCode=this.currentId=''
    this.checkCodesFromDB();
  }
  canEdit(code:string):boolean{
    return this.currentId === code
  }
  
  onSubmit(){
    this.closeDialog()

    let obj={"link":{"idUniversity":this.idUniversity,
              "idCollege":this.idCollege},
              "persons":this.withoutId(CreatePersonFormComponent.allPersons)
            };
    this.addPersonService.addPersons(obj)
  }

}
