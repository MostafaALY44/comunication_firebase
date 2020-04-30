import { CRUDForfirebase } from './CRUDForFirebase';

import { AngularFirestore } from '@angular/fire/firestore';
import { PostModel, ReactedPerson } from '../models/PostModel';
import { map } from 'rxjs/operators';
import 'firebase/firestore';
import * as firebase from 'firebase';

export class PostService implements CRUDForfirebase{
    constructor(private firestore: AngularFirestore){}
    create(url: string, post) {
        post["date"]=firebase.firestore.FieldValue.serverTimestamp();
        return this.firestore.collection(url).add(post)
    }
    read(url: string, id: string) {
        return this.firestore.doc<PostModel>(url+'/'+id).valueChanges();
    }
    update(url: string, id: string, post) {;
        return this.firestore.doc(url+'/'+id).update(post);
    }
    delete(url: string, id: string) {
        return this.firestore.doc(url+'/'+id).delete();
    }

    getAll(url:string){
        return this.firestore.collection<PostModel>(url).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() ;
              const id = a.payload.doc.id; 
              return { id, ...data };
            })) 
          );
    }

    
    addReact(url: string, id: string, personId:string, react:boolean){
     return this.update(url, id, {[`react.${personId}`] :react})
		
    }
    // doUnsubscribe(removeSubscribe){
    //     setTimeout(function(){removeSubscribe.unsubscribe()},0)
    // }

    removeReact(url: string, id: string, personId:string){
        this.update(url, id, {[`react.${personId}`] :firebase.firestore.FieldValue.delete()})
     }
    
    

}