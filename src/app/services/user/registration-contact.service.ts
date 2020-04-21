import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactModel } from './oop/models/contactModel';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegistrationContactService {
  constructor(private firestore: AngularFirestore) { }


  public getContacts(id):Observable<ContactModel[]>{
    return this.firestore.collection<ContactModel>('registrationContacts/'+id).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public addContact( data){ 
   // data["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection<ContactModel>('registrationContacts/').add(data);
  }
}
