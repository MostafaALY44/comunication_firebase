import { MaterialModel } from '../models/MaterialModel.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import 'firebase/firestore';
import { CRUDForfirebase } from './CRUDForFirebase';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/CategoryModel';
import { MaterialService } from './MaterialService';

export class CategoryService implements CRUDForfirebase {
  constructor(private firestore: AngularFirestore) { }

  create(url: string, category: CategoryModel) {
    if (category)
    return this.firestore.collection(url).add({name:category.name});
    else
    console.log("Creating new Category canceled");
  }

  read(url: string, id: string): Observable<CategoryModel> {
    return this.firestore.doc<CategoryModel>(url + id).valueChanges();
  }

  removeSubscribe;

  update(url: string, id: string, category:CategoryModel) {
    return this.firestore.collection(url).doc(id).update({name:category.name});
  }


  delete(url: string, id: string) {
    return this.firestore.doc<CategoryModel>(url + '/' + id).delete();
  }

  getAll(url: string): Observable<CategoryModel[]> {
    return this.firestore.collection<CategoryModel>(url).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

}