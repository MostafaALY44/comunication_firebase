import { Injectable } from '@angular/core';
import { CRUDForfirebase } from './CRUDForFirebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { Course } from '../models/CourseMode';

@Injectable({
  providedIn: 'root'
})
export class CourseFirebaseService implements CRUDForfirebase{

  constructor(private firestore: AngularFirestore) { }
  create(url: string, id) {
    let course:Course= {code:id, postsNumber:0, categoriesNumber:0, assignmentsNumber:0, deletePostsNumber:0,
      deleteAssignmentNumber:0}
      console.log(url+'/courses/')
    return this.firestore.collection(url+'/courses/').doc(id).set(course)
  }
  read(url: string, id: string) {
    return this.firestore.doc<Course>(url+'/courses/'+id).valueChanges();
  }
  update(url: string, id: string, object: import("../models/model").Model) {
    throw new Error("Method not implemented.");
  }
  delete(url: string, id: string) {
    throw new Error("Method not implemented.");
  }
}
