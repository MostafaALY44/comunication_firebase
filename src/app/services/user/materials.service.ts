import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {

  constructor(private firestore: AngularFirestore) { }

  public getMaterial(idMaterial):Observable<Material[]>{
    //console.log('courses/'+idCourse+'/assignment');
    return this.firestore.collection<Material>('courses/'+idMaterial+'/materials/lectures/lecture').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public addMaterial(idMaterial, data){ 
    data["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection<Material>('courses/'+idMaterial+'/materials/lectures/lecture').add(data);
  }

  // public editAssignment(courseId, assignmentId, data){
  //   return this.firestore.collection<Assignment>('courses/'+courseId+'/assignment').doc(assignmentId).update(data);
  // }
  // public deleteAssignment(courseId,assignmentId){
  //   //console.log('courses/'+courseId+'/posts/'+id);
  //   return this.firestore.collection<Assignment>('courses/'+courseId+'/assignment').doc(assignmentId).delete();
  // }
}
