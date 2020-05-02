import { Injectable } from '@angular/core';
import { CRUDForfirebase } from './CRUDForFirebase';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { PollingModel } from '../models/PollingModel';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class PollingService implements CRUDForfirebase{

  constructor(private firestore: AngularFirestore) { }
  create(url: string,poll) {
    poll["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection(url).add(poll)
  }
  read(url: string, id: string) {
    return this.firestore.doc<PollingModel>(url+'/'+id).valueChanges();
  }
  update(url: string, id: string, poll) {
    return this.firestore.doc(url+'/'+id).update(poll);
  }
  delete(url: string, id: string) { 
    return this.firestore.doc(url+'/'+id).delete();
  }

  getAll(url:string){
    
    //let options = new Map<string, Map<string, {"allVoted":number, "isVoteThis":boolean}>>();
    return this.firestore.collection<PollingModel>(url).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() ;
          const id = a.payload.doc.id; 
          let temp= new Map<string,  {"idOption":string, "date":any}>();
          let options= new Map<string,  {"allVoted":number, "isVoteThis":boolean}>();
          if(data.pollingVote){
            Object.keys(data.pollingVote).forEach((personKey)=>{
             temp.set(personKey,  {"idOption":data.pollingVote[personKey].idOption, "date":data.pollingVote[personKey].date})
              
              if(options.has(data.pollingVote[personKey].idOption)){
                options.get(data.pollingVote[personKey].idOption).allVoted++
                //options.set(personKey, {"allVoted":options.get(personKey).allVoted+1, "isVoteThis":(UserService.user.uid==personKey)})
              }else{
                options.set(data.pollingVote[personKey].idOption,  {"allVoted": 1, "isVoteThis":(UserService.user.uid==personKey)})
                
            }})
          }
          
          
          
          data.options=options
          data.pollingVote= temp
         
          
          return { id, ...data };
        })) 
      );
  }
//  {"personId":UserService.user.uid,"optionId":idOption}

  addVoteOption(url: string, id: string, voteOption: {"personId":string,"optionId":string}){

    const obj = {[`pollingVote.${voteOption.personId}.idOption`]:voteOption.optionId,
      [`pollingVote.${voteOption.personId}.date`]: firebase.firestore.FieldValue.serverTimestamp()}
    return this.update(url, id,  obj);
  }

  removeVoteOption(url: string, id: string, voteOption: {"personId":string,"optionId":string}){
    const obj = {[`pollingVote.${voteOption.personId}`]:firebase.firestore.FieldValue.delete()}
    return this.update(url, id,  obj);
  }
}
