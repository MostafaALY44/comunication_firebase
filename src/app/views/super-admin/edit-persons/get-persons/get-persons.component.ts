import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/oop/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/services/auth/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  ActivatedRoute, ParamMap } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-get-persons',
  templateUrl: './get-persons.component.html',
  styleUrls: ['./get-persons.component.css']
})
export class GetPersonsComponent implements OnInit {
users: Observable<User[]>;
editField:string;
idUniversity;
idCollege;
  constructor (private userService:UserService,private _snackBar: MatSnackBar ,private router:ActivatedRoute) { 
    this.router.parent.paramMap.subscribe((params: ParamMap)=>{
      this.idUniversity=params.get('id1')
      this.idCollege=params.get('id2')
    }).unsubscribe();
      this.users=this.userService.getAll() 

  }

  updateEmail( email,id, event: any) {
    const editField = event.target.textContent;
    let data;
   
    if(document.getElementById("email").innerText!=email){
      // console.log( document.getElementById("email"));
      data={'email':editField}
      this.userService.updatePerson(id,data).then(()=>{
      this._snackBar.open(editField, 'updeted Successfully', { duration: 3000, });
    })
     
    }
    console.log(this.editField, "   ",editField )
    
    // this.userService.updatePerson(id,data).then(()=>{
    //   this._snackBar.open(editField, 'updeted Successfully', { duration: 3000, });
    // })
  
    
  }
  updateCourse(courseDetails,id, event: any){
  //console.log(courseDetails)
    const editField = event.target.textContent;
    let data;
     if(courseDetails.key!=editField) {
      console.log( document.getElementById("course"));
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

  remove(id: any) {
    
    this.userService.delete(id.uid).then(()=>{
      this._snackBar.open(id.email, 'Deleted Successfully', { duration: 3000, });
    })

  }

//changed:boolean=false;
  // changeValue( event: any) {
  //   this.editField = event.target.textContent;
  //  // this.changed=true;
  // }


  ngOnInit() {
  }

}
