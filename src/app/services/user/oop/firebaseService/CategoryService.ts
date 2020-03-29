import { MaterialModel } from '../models/MaterialModel.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import { CRUDForfirebase } from './CRUDForFirebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/CategoryModel';
import { MaterialService } from './MaterialService';

export class CategoryService implements CRUDForfirebase{ 
    constructor(private firestore: AngularFirestore){}
    create(url:string, category:CategoryModel ) {
        return this.firestore.collection(url).add(category.id);
    }
    read(url:string, id:string):Observable<CategoryModel> {
       return this.firestore.doc<CategoryModel>(url+id).valueChanges();
    }
    removeSubscribe;
    update(url: string, id: string, category) {
         let tempDoc=this.firestore.doc<CategoryModel>(url+id).snapshotChanges().pipe(
            map(a => {
              const data = a.payload.data() ;
              const id = a.payload.id;
              return { id, ...data };
            }))

           let tempColl= new MaterialService(this.firestore).getAll(url+'/'+id+'/material/');
           this.delete(url,id).then(() =>
                this.create(url, {"id":category.id}).then (()=>
                this.removeSubscribe=tempColl.subscribe(element=>
                            element.forEach(element2 =>
                                this.firestore.collection(url+'/'+category.id+'/materials/').add(element2.id).then(()=>
                                        this.firestore.doc(url+'/'+category.id+'/materials/'+element2.id).set({"link":element2.link,"date":element2.date})
                                )))
                        
                ).finally(()=>this.removeSubscribe.unsubscribe())
                )
    }
    delete(url:string, id: string) {
        return this.firestore.doc<CategoryModel>(url+'/'+id).delete();
    }

    getAll(url:string):Observable<CategoryModel[]>{
        return this.firestore.collection<CategoryModel>(url).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() ;
              const id = a.payload.doc.id;
              return { id, ...data };
            })) 
          );
    }

}