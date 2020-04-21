import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddPersonService {

  constructor(private http:HttpClient) { }
  addPersons(arr){
    console.log(arr)
    let params: URLSearchParams = new URLSearchParams();
    let headers= new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'*'})
    this.http.post("https://us-central1-communication-19601.cloudfunctions.net/storeUsers", arr).toPromise().then(()=>{
      console.log("ssass")
    }).catch(error=>console.log(error))
  }
}
