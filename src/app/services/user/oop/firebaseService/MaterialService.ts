import { MaterialModel } from '../models/MaterialModel.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import { CRUDForfirebase } from './CRUDForFirebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class MaterialService implements CRUDForfirebase{
    constructor(private firestore: AngularFirestore){}
    create(url:string, material:MaterialModel ) {
        return this.firestore.collection(url).doc(material.id).set(material)
    }
    read(url:string, id:string):Observable<MaterialModel> {
       return this.firestore.doc<MaterialModel>(url+'/'+id).valueChanges();
    }
    update(url: string, id: string, material) {
        return this.firestore.doc<MaterialModel>(url+'/'+id).update(material);
    }
    delete(url:string, id: string) {
        return this.firestore.doc<Assignment>(url+'/'+id).delete();
    }

    getAll(url:string):Observable<MaterialModel[]>{
        return this.firestore.collection<MaterialModel>(url).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() ;
              const id = a.payload.doc.id;
              return { id, ...data };
            }))
          );
    }

    

}