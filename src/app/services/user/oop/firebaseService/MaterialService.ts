import { MaterialModel } from '../models/MaterialModel.model';
import { AngularFirestore} from '@angular/fire/firestore';
import 'firebase/firestore';
import { CRUDForfirebase } from './CRUDForFirebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

export class MaterialService implements CRUDForfirebase{

    constructor(private firestore: AngularFirestore){}

    create(url:string, material:MaterialModel ) {
        material["date"]=firebase.firestore.FieldValue.serverTimestamp();
        return this.firestore.collection(url).doc(material.id).set(material)
    }

    read(url:string, id:string):Observable<MaterialModel> {
       return this.firestore.doc<MaterialModel>(url+'/'+id).valueChanges();
    }

    update(url: string, id: string, material) {
        material["date"]=firebase.firestore.FieldValue.serverTimestamp();
        return this.firestore.doc(url+'/'+id).set(material);
    }

    delete(url:string, id: string) {
        return this.firestore.doc<MaterialModel>(url+'/'+id).delete();
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