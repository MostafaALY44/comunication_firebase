import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AddPersonService } from '../../service/add-person.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ParamMap, Params } from '@angular/router';
import { Roles } from 'src/app/services/auth/user.model';
import { CourseFirebaseService } from 'src/app/services/user/oop/firebaseService/course-firebase.service';
import { CreatePersonFormComponent } from '../create-persons/create-person-form/create-person-form.component';
import { SaveDataComponent } from '../../edit-courses/save-data/save-data.component';

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
     @Inject(MAT_DIALOG_DATA) private data:{paramMap:Observable<ParamMap>,
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
    this.removeSubscribe2=this.courseService.getAllCodesAsMap(this.routerLink)
      .subscribe( mapData=>{
        this.coursesNotCreatedYet=[];
        CreatePersonFormComponent.allPersonCourses.forEach((value:number[], key:string)=>{
          if(!mapData.has(key))
            this.coursesNotCreatedYet.push(key);
        })
      })})
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
  
  registerCourses(){
    let x:string[]=JSON.parse(JSON.stringify( this.coursesNotCreatedYet))
    console.log({link:this.routerLink ,courses: x});
    this.dialog.open(SaveDataComponent,{data:{link:this.routerLink ,courses: x}, height: '600px', width: '900px', disableClose: true})
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
  //changeCurrentFieldState(email){}
  //canEdit(index){}

  changeCode:string=""
  currentCode:string="";
  changeCurrentFieldState(code:string){
    this.currentCode=code;
    this.changeCode=this.currentCode;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      try {
        document.getElementById('!'+code+'!').focus();
      } catch (error) {
        
      }
    },50); 
  } 
  removedData:number[]=[]
  reset(i:number, key:string, ii?:number){
    console.log(key)
    if(key == "email"){
      console.log("this.changeCode ", this.changeCode)
      if(this.changeCode==""){
        this.removedData.push(this.data.persons[i].index)
        CreatePersonFormComponent.allPersons[i].obj.courses.forEach(element=>{
          console.log(element)
          CreatePersonFormComponent.allPersonCourses.get(element).splice(
            CreatePersonFormComponent.allPersonCourses.get(element).findIndex(num=> num==CreatePersonFormComponent.allPersons[i].id)
            ,1)
        })
        console.log("wwwwwwwwwwwwwwww" ,this.data.persons[i].obj.courses[ii])
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
        if(!this.data.persons.find(element=> element.obj.email===word) && this.isEmail(word))
          this.data.persons[i].obj.email=word;
      } 
    }else if(key == "courses"){
      if(this.changeCode==""){
        
        CreatePersonFormComponent.allPersonCourses.get(this.data.persons[i].obj.courses[ii]).splice(
          CreatePersonFormComponent.allPersonCourses.get(this.data.persons[i].obj.courses[ii]).findIndex(element=>element == this.data.persons[i].id)
          , 1)
          if(! CreatePersonFormComponent.allPersonCourses.get(this.data.persons[i].obj.courses[ii]).length)
            CreatePersonFormComponent.allPersonCourses.delete(this.data.persons[i].obj.courses[ii])
          console.log("this.courses ",CreatePersonFormComponent.allPersonCourses.get(this.data.persons[i].obj.courses[ii]))
        this.data.persons[i].obj.courses.splice(ii,1)
        if(!this.data.persons[i].obj.courses.length){
          console.log("pppppppppppppppppppppp")
          this.removedData.push(this.data.persons[i].index)
          this.data.persons.splice(i,1)
        }
        //this.checkCodesFromDB();
      }else{
        const word :string=this.changeCode.toUpperCase().trim();
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
            console.log("99999999999999 ",this.data.persons[i].obj.courses.find(element=>{console.log(element); element == word}))         
            this.data.persons[i].obj.courses[ii]=word;
            //CreatePersonFormComponent.allPersonCourses.set(this.data.persons[i].courses[ii], true)
            if(CreatePersonFormComponent.allPersonCourses.has(word))
              CreatePersonFormComponent.allPersonCourses.get(word).push(this.data.persons[i].id)
            else
              CreatePersonFormComponent.allPersonCourses.set(word, [this.data.persons[i].id])
          //this.checkCodesFromDB();
          }else{// copy past code when input ""
            console.log("ssssssssssssssssssssss")
            this.data.persons[i].obj.courses.splice(ii,1)
            if(!this.data.persons[i].obj.courses.length){
              this.removedData.push(i)
              this.data.persons.splice(i,1)
            }
          }
        }
      } 
    }
    this.currentCode=this.changeCode=''
    this.checkCodesFromDB();
  }
  canEdit(code:string):boolean{
    return this.currentCode === code
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
