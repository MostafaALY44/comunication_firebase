import { Component, OnInit, HostListener } from '@angular/core';
import { CreatePersonFormComponent } from './create-person-form/create-person-form.component';
import { AddPersonService } from '../../service/add-person.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Roles } from 'src/app/services/auth/user.model';
import { MatDialog } from '@angular/material/dialog';
import { SavePersonsDataComponent } from '../save-persons-data/save-persons-data.component';


@Component({
  selector: 'app-create-persons',
  templateUrl: './create-persons.component.html',
  styleUrls: ['./create-persons.component.css']
})
export class CreatePersonsComponent implements OnInit {

  constructor(private addPersonService:AddPersonService,  private router:ActivatedRoute,
    private dialog:MatDialog) {
      CreatePersonFormComponent.reset();
     }

  ngOnInit() {
  }

  createPersonComponents:boolean[]=[false];
  pointerToLastIndex:number=0;
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    
   
   if(event.key == "Shift"){
     if(this.canAddNewForm){
      this.createPersonComponents[this.createPersonComponents.length-1]=true;
      this.createPersonComponents.push(false)
      this.pointerToLastIndex=this.createPersonComponents.length-1;
      this.canAddNewForm=false;
      }
    }else if(event.key == "Enter"){
      if(this.canAddNewForm)
      this.onSubmit();
    }
  }

  getFormObj(i:number){
    if(CreatePersonFormComponent.allPersons.length > i)
      return CreatePersonFormComponent.allPersons[i]
    let dumy:string[]=[]
    return {email:"", courses:dumy, "roles":null};  
  }

  isEmail(email):boolean{
    if(!email)
      return false;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  removed:Map<number,boolean>=new Map<number, boolean>();
  remove(removeElement:boolean, index:number){
    if(removeElement){
      this.removed.set(index, true);
      console.log("CreatePersonFormComponent.allPersons ",CreatePersonFormComponent.allPersons.length)
      console.log("CreatePersonFormComponent.allPersonsOriginLength ",CreatePersonFormComponent.allPersonsIndexOriginLength)
      console.log("index ",index)
      if(index== this.pointerToLastIndex){
        this.pointerToLastIndex=0;
        this.removed.forEach((value:boolean, key:number)=>{
          if(this.pointerToLastIndex < key && !value)
            this.pointerToLastIndex=key;
        })
        let flag=true;
        for (let index = 0; index < CreatePersonFormComponent.allPersons.length; index++) {
          if( !this.isEmail(CreatePersonFormComponent.allPersons[index].obj.email) 
              || !CreatePersonFormComponent.allPersons[index].obj.courses.length)
          {
            flag=false;
            break;
          }
        }
        if(flag){
          this.canAddNewForm=true;
        }
        
      }
    }
    //this.createPersonComponents.splice(index,1);
  }

  trackByCreatePerson(index){
    this.createPersonComponents=[false]
    return (index < (this.createPersonComponents.length-1))? index:undefined
  }

  canAddNewForm:boolean=false;
  isformDataDone(isDone:boolean, index:number){
    this.canAddNewForm=isDone;
  }

  onSubmit(){
    let x = CreatePersonFormComponent.allPersons
    console.log(CreatePersonFormComponent.allPersonCourses)
    console.log(CreatePersonFormComponent.allPersons)
    let ref = this.dialog.open(SavePersonsDataComponent,{data:{paramMap:this.router.parent.paramMap ,persons:CreatePersonFormComponent.allPersons}, height: '600px', width: '900px', disableClose: true})
    let removeSubscribe1=ref .afterClosed().subscribe((ss)=>{
      console.log("ssssssssssssssssss ",ss)
      ss.data.forEach(element => {
        this.remove(true, element)
      });
      setTimeout(()=>{removeSubscribe1.unsubscribe},0)
    })
    // this.router.parent.paramMap.subscribe((param:ParamMap)=>{
    //   let obj={"link":{"idUniversity":param.get('id1'),"idCollege":param.get('id2')},
    //           "persons":this.withoutId(CreatePersonFormComponent.allPersons)
    //         };
    //         console.log(obj)
    //   this.addPersonService.addPersons(obj)
    // }).unsubscribe();
    
    
  }

}
