import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AddPersonService {

  constructor(private http:HttpClient,private _snackBar: MatSnackBar) { }
  addPersons(arr){
    
    let params: URLSearchParams = new URLSearchParams();
    let headers= new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'})
    this.http.post("https://us-central1-communication-19601.cloudfunctions.net/storeUsers", arr).toPromise().then(()=>{
     
      
    }).catch(error=>{
      
          this._snackBar.open("this operation completed", 'Successfully', { duration: 3000, });
       
    })
  }
}
