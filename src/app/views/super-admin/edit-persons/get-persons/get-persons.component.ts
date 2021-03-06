import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/oop/user.service';
import { Observable, interval, Subscription } from 'rxjs';
import { User } from 'src/app/services/auth/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddPersonService } from '../../service/add-person.service';

@Component({
  selector: 'app-get-persons',
  templateUrl: './get-persons.component.html',
  styleUrls: ['./get-persons.component.css']
})
export class GetPersonsComponent implements OnInit,OnDestroy {
users: User[];
editField:string;
idUniversity;
idCollege;
removeSubcribe1:Subscription;
removeSubcribe2:Subscription;
  constructor (private addPersonService:AddPersonService ,private userService:UserService,private _snackBar: MatSnackBar ,private router:ActivatedRoute,public dialog:MatDialog) { 
    this.router.parent.paramMap.subscribe((params: ParamMap)=>{
      this.idUniversity=params.get('id1')
      this.idCollege=params.get('id2')
    }).unsubscribe();
      // this.users=this.userService.getAllByUniversity(this.idUniversity,this.idCollege)
      this.addPersonService.getUserColleges().then((usersData:Observable<User[]>)=>{
        this.removeSubcribe2= usersData.subscribe(users=>{
           this.users=users;
           this.removeSubcribe2.unsubscribe()
         })
      })
     this.removeSubcribe1= interval(10000).subscribe(()=>{
        this.addPersonService.getUserColleges().then((usersData:Observable<User[]>)=>{
          this.removeSubcribe2= usersData.subscribe(users=>{
             this.users=users;
           })
         
        })
      })
     
  }
  ngOnDestroy(): void {
    if(this.removeSubcribe2)
      this.removeSubcribe2.unsubscribe();

      if(this.removeSubcribe1)
      this.removeSubcribe1.unsubscribe();
     
  }
  trackByUser(index,user){
    return user? user.userId:undefined;
  }
  updateEmail(user, event: any) {
    const editField = event.target.textContent;
    let data;
   
    if(editField!=user.email){
      if(editField===""){
        // this.remove(user);
        this.dialog.open(DeleteDialogComponent,{data:{'user':user,'idUniversity':this.idUniversity,'idCollege':this.idCollege}}).beforeClose().subscribe(email=>{
          document.getElementById("email").innerText=user.email;
        });
      }else{

      data={'email':editField}
      this.userService.updatePerson(user.uid,data).then(()=>{
      this._snackBar.open(editField, 'updeted Successfully', { duration: 3000, });
    })
    }
    }
    
  }
  updateCourse(courseDetails,id, event: any){
  
    let editField :string= event.target.textContent;
    let data;
      editField= editField.trim();
     if(courseDetails.key!=editField) {
       if(editField===""){
        data= {
        [`univeristy.${this.idUniversity}.colleages.${this.idCollege}.courses.${courseDetails.key}`]:firebase.firestore.FieldValue.delete()
          }
          this.userService.updatePerson(id,data).then(()=>{
            this._snackBar.open(courseDetails.key, 'Deleted Successfully', { duration: 3000, });
          })
       }else{

      data= {[`univeristy.${this.idUniversity}.colleages.${this.idCollege}.courses.${editField}`]:
        courseDetails.value,
        [`univeristy.${this.idUniversity}.colleages.${this.idCollege}.courses.${courseDetails.key}`]:firebase.firestore.FieldValue.delete()
      }
      // const obj = {[`${courseDetails.key}`]:firebase.firestore.FieldValue.delete()}
      this.userService.updatePerson(id,data).then(()=>{
      this._snackBar.open(editField, 'updeted Successfully', { duration: 3000, });
    })
  }
    }
  } 

  remove(id: any) {
     
    // this.userService.delete(id.uid).then(()=>{
    //   this._snackBar.open(id.email, 'Deleted Successfully', { duration: 3000, });
    // })
    let data={'universityId': this.idUniversity , 'collegeId':this.idCollege,'userId':id.userId}
   console.log(id)
    this.addPersonService.deletePersons(data);

  }

//changed:boolean=false;
  // changeValue( event: any) {
  //   this.editField = event.target.textContent;
  //  // this.changed=true;
  // }


  ngOnInit() {
  }

}
