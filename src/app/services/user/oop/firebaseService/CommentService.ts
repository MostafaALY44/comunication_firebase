import { CRUDForfirebase } from './CRUDForFirebase';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommentModel } from '../models/CommentModel';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

export class CommentService implements CRUDForfirebase{
    constructor(private firestore: AngularFirestore){}
    create(url: string, comment) {
        comment["date"]=firebase.firestore.FieldValue.serverTimestamp();
        return this.firestore.collection<CommentModel>(url).add(comment);
    }

    read(url: string, id: string) {
        return this.firestore.doc(url+'/'+id).valueChanges()
    }
    update(url: string, id: string, comment) {
        return this.firestore.doc(url+'/'+id).update(comment);
    }
    delete(url: string, id: string) {
        return this.firestore.doc(url+'/'+id).delete();
    }

    getAll(url:string):Observable<CommentModel[]>{
        return this.firestore.collection<CommentModel>(url).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() ;
              const id = a.payload.doc.id;
              return { id, ...data };
            })) 
          );

    }

}