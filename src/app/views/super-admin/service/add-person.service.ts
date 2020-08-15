import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user/oop/user.service';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AddPersonService {

  constructor(private http:HttpClient,private _snackBar: MatSnackBar) { }
  addPersons(arr){
    // console.log(arr)
    // let params: URLSearchParams = new URLSearchParams();
    // let headers= new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'})
    arr={'userId':UserService.user.uid, ...arr}
    firebase.auth().currentUser.getIdToken().then(idToken=>{
      const headers= new HttpHeaders({'Authorization': 'Bearer ' + idToken })
      this.http.post("https://us-central1-communication-19601.cloudfunctions.net/storeUsers", arr,{'headers':headers}).toPromise().then(()=>{
     
      
      }).catch(error=>{
        
            this._snackBar.open("this operation completed", 'Successfully', { duration: 3000, });
         
      })
  
    })
      }

      deletePersons(arr){
        // console.log(arr)
        // let params: URLSearchParams = new URLSearchParams();
        // let headers= new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'})
        arr={'adminId':UserService.user.uid, ...arr}
        firebase.auth().currentUser.getIdToken().then(idToken=>{
          const headers= new HttpHeaders({'Authorization': 'Bearer ' + idToken })
          this.http.post("https://us-central1-communication-19601.cloudfunctions.net/deleteUserCollege" , arr,{'headers':headers}).toPromise().then(()=>{
         
          
          }).catch(error=>{
            
                this._snackBar.open("this operation completed", 'Successfully', { duration: 3000, });
             
          })
      
        })
      }
        getUserColleges(){
          
         
          return firebase.auth().currentUser.getIdToken().then(idToken=>{
            const headers= new HttpHeaders({'Authorization': 'Bearer ' + idToken })
           return this.http.get("https://us-central1-communication-19601.cloudfunctions.net/getUsers" ,{'headers':headers})
          })
        

      }
      // :{'email':string, 'courses':any[],'roles':any}[]
      

}
