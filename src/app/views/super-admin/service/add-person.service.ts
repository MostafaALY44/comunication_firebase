import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AddPersonService {

  constructor(private http:HttpClient,private _snackBar: MatSnackBar) { }
  addPersons(arr){
    console.log(arr)
    let params: URLSearchParams = new URLSearchParams();
    let headers= new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'})
    this.http.post("https://us-central1-communication-19601.cloudfunctions.net/storeUsers", arr).toPromise().then(()=>{
      console.log("ssass")
      this._snackBar.open("new person", 'added Successfully', { duration: 3000, });
    }).catch(error=>{console.log(error)
      this._snackBar.open("something not correct", 'Failed to add', { duration: 3000, });
    })
  }
}
