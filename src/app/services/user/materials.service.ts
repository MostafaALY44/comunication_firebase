import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Category } from './models/category';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(private firestore: AngularFirestore) {
    //for show idea only
    this.getCategories('').forEach(x=>
        console.log(x.subscribe(
          y=> y.getMaterials()
        ))
      )
   }

 

  // /////////////////////////// Category //////////////////////////////////////////////////
  // public getCategory(idCategory):Observable<Category[]>{
  //   return this.firestore.collection<Category>('courses/'+idCategory+'/materials/categories/category').snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() ;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   ); 
  // }
  // public addCategory(idMaterial, data){ 
  //   data["date"]=firebase.firestore.FieldValue.serverTimestamp();
  //   return this.firestore.collection<Material>('courses/'+idMaterial+'/materials/categories/category').add(data);
  // }
  // public editCategory(courseId, categoryId, data){
  //   return this.firestore.collection<Category>('courses/'+courseId+'/materials/categories/category').doc(categoryId).set(data);
  // }
  // public deleteCategory(courseId,categoryId){
  //   return this.firestore.collection<Category>('courses/'+courseId+'/materials/categories/category').doc(categoryId).delete();
  // }

  // /////////////////////////// Material //////////////////////////////////////////////////
  // public getMaterial(idMaterial):Observable<Material[]>{
  //   //console.log('courses/'+idCourse+'/assignment');
  //   return this.firestore.collection<Material>('courses/'+idMaterial+'/materials/lectures/lecture').snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() ;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  // }
  // public addMaterial(courseId, data){ 
  //   data["date"]=firebase.firestore.FieldValue.serverTimestamp(); 
  //   return this.firestore.collection<Material>('courses/'+courseId+'/materials/lectures/lecture').add(data);
  // }
  // public editMaterial(courseId, materialId, data){
  //   return this.firestore.collection<Material>('courses/'+courseId+'/materials/lectures/lecture').doc(materialId).update(data);
  // }
  // public deleteMaterial(courseId,materialId){
  //   return this.firestore.collection<Material>('courses/'+courseId+'/materials/lectures/lecture').doc(materialId).delete();
  // }

    getCategories(url:string): Observable<Category>[]{
       let categoryName=this.firestore.collection(url+'/categories/').snapshotChanges().pipe(
            map(actions => actions.map(a => {
              return a.payload.doc.id;
            }))
          );
        let categories: Observable<Category>[]=[];
        let category :Observable<Category>;
          categoryName.subscribe( categoryNames=>{
            categoryNames.forEach(element=>{
              category = new Observable(subscriber =>{
                subscriber.next(new Category(url, element, this.firestore))
              })
              categories.push(category);
            }    
            )
          })
        return categories;
    }

  
}
