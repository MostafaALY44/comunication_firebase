import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ContactModel } from './oop/models/contactModel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firestore: AngularFirestore) { }

  public getContacts(id):Observable<ContactModel[]>{
    return this.firestore.collection<ContactModel>('problemContacts/'+id).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public addContact( data){ 
   // data["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection<ContactModel>('problemContacts/').add(data);
  }
}
