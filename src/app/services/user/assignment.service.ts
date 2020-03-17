import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  addCoursePost(courseId: any, data: { like: number; dislike: number; postOwner: string; title: any; body: any; }) {
    throw new Error("Method not implemented.");
  }

  constructor(private firestore: AngularFirestore) { }

  public getAssingment(idCourse):Observable<Assignment[]>{
    //console.log('courses/'+idCourse+'/assignment');
    return this.firestore.collection<Assignment>('courses/'+idCourse+'/assignment').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public addAssignment(courseId, data){ 
    //data["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection<Assignment>('courses/'+courseId+'/assignment').add(data);
  }

  public editAssignment(courseId, assignmentId, data){
    return this.firestore.collection<Assignment>('courses/'+courseId+'/assignment').doc(assignmentId).update(data);
  }
  public deleteAssignment(courseId,assignmentId){
    //console.log('courses/'+courseId+'/posts/'+id);
    return this.firestore.collection<Assignment>('courses/'+courseId+'/assignment').doc(assignmentId).delete();
  }
}
