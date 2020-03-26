import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalAnnouncementService {
 
  constructor(private firestore: AngularFirestore) { }
  getLocalTags(collegeId:string):Observable<Tags[]>{
    return this.firestore.collection<Tags>("announcement/local/colleges/"+collegeId+"/tags").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
}
}
