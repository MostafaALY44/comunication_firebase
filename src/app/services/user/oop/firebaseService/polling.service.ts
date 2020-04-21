import { Injectable } from '@angular/core';
import { CRUDForfirebase } from './CRUDForFirebase';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { PollingModel } from '../models/PollingModel';
import { map } from 'rxjs/operators';

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
    return this.firestore.collection<PollingModel>(url).snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() ;
          const id = a.payload.doc.id; 
          return { id, ...data };
        })) 
      );
}
}
