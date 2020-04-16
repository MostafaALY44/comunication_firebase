import { Injectable } from '@angular/core';
import { CRUDForfirebase } from './CRUDForFirebase';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { pollVotingModel } from '../models/PollVotingModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PollVottingService implements CRUDForfirebase{

  constructor(private firestore: AngularFirestore) { }

  create(url: string, vote) {
     return this.firestore.collection<pollVotingModel>(url).add(vote);
  }
  read(url: string, id: string) {
    return this.firestore.doc<pollVotingModel>(url+'/'+id).valueChanges()
  }
  update(url: string, id: string, vote) {
    return this.firestore.doc<pollVotingModel>(url+'/'+id).update(vote);
  }
  delete(url: string, id: string) {
    return this.firestore.doc(url+'/'+id).delete();
  }

  getAll(url:string):Observable<pollVotingModel[]>{
    return this.firestore.collection<pollVotingModel>(url).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() ;
          const id = a.payload.doc.id;
          return { id, ...data };
        })) 
      );

}
}
  