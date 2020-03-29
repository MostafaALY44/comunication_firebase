import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
//import { Category } from './models/category';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService implements OnDestroy {
 /*private categories: BehaviorSubject<Category[]>=new BehaviorSubject([]);
 allCAtegories: Observable<Category[]>;*/
  constructor(private firestore: AngularFirestore) {
    //for show idea only
   /* this.getCategories('').forEach(x=>
        console.log(x)
      )*/
   }
   removeUnsubscribe;
  ngOnDestroy(): void {
    console.log("this.removeUnsubscribe.unsubscribe() will run ");
    this.removeUnsubscribe.unsubscribe();
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

    // getCategories(url:string): Observable<Category>[]{
    //    let categoryName=this.firestore.collection(url+'/categories/').snapshotChanges().pipe(
    //         map(actions => actions.map(a => {
    //           return a.payload.doc.id;
    //         }))
    //       );
    //     let categories: Observable<Category>[]=[];
    //     let category :Observable<Category>;
    //       categoryName.subscribe( categoryNames=>{
    //         categoryNames.forEach(element=>{
    //           category = new Observable(subscriber =>{
    //             subscriber.next(new Category(url, element, this.firestore))
    //           })
    //           categories.push(category);
    //         }    
    //         )
    //       })
    //     return categories;
    // }
    /*categoriesTemp :Category[]=[];
    getCategories(url:string): Observable<Category[]>{//console.log("from Categories service")
      url+="/categories";
      console.log(url)
      let categoryName=this.firestore.collection(url).snapshotChanges().pipe(
           map(actions => actions.map(a => {
             return a.payload.doc.id;
           }))
         );

       
       if(this.removeUnsubscribe){
          this.removeUnsubscribe.unsubscribe();
        }
        this.removeUnsubscribe= categoryName.subscribe( categoryNames=>{
          let flag:boolean=false;
           categoryNames.forEach(element=>{
             //console.log(!(categories.find(x=> x.name===element)))
            if(!(this.categoriesTemp.find(x=> x.name===element))){flag=true;console.log("this.categoriesTemp.find(x=> x.name===element) "+element)
              this.categoriesTemp.push(new Category(url, element, this.firestore))
              }
           })
           if(flag){flag =false;console.log("in flag next()  ==>> ")
           this.categories.next(this.categoriesTemp);}
         })
         this.allCAtegories=this.categories.asObservable();
       return this.allCAtegories;
   }*/

  
}
