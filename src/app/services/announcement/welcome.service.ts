import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { WelcomeModel } from '../user/oop/models/WelcomeModel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  constructor(private firestore: AngularFirestore) { }
  public getAnnouncement():Observable<WelcomeModel[]>{
    return this.firestore.collection<WelcomeModel>('announcement/welcome/advertisements/').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  
  }

  public addAnnouncement( data){ 
   // data["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection<WelcomeModel>('announcement/local/advertisements/').add(data);
  }
}
