import { Injectable } from '@angular/core';
import { CRUDForfirebase } from './CRUDForFirebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../models/CourseMode';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CourseFirebaseService implements CRUDForfirebase{

  constructor(private firestore: AngularFirestore) { }
  create(url: string, id) {
    let course:Course= {code:id, postsNumber:0, categoriesNumber:0, assignmentsNumber:0, deletePostsNumber:0,
      deleteAssignmentNumber:0,description:""}
      course["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection(url+'/courses/').doc(id).set(course)
  }
  read(url: string, id: string) {
    return this.firestore.doc<Course>(url+'/courses/'+id).valueChanges();
  }
  update(url: string, id: string, data) {
    return this.firestore.collection<Course>(url+'/courses/').doc(id).update(data);
  }
  delete(url: string, id: string) {
    return this.firestore.collection<Course>(url+'/courses/').doc(id).delete();
  } 
  
  getAll(url: string){
    
    return this.firestore.collection<Course>(url+'/courses/').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAllCodesAsMap(url: string):Observable< Map<string, boolean> >{
    return this.firestore.collection<string>(url+'/courses/').valueChanges({idField: 'id'}).pipe(map(
      arr=>{
        const allCouses:Map<string, boolean>= new Map<string, boolean>();
        arr.map(snap=>{return snap.id}).forEach(element=>{allCouses.set(element,true )})
        return allCouses;
      }
    ))
  }

 }
