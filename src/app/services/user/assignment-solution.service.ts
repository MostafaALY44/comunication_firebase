import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AssignmentSolutionService {
addCoursePost(courseId: any, data: { like: number; dislike: number; postOwner: string; title: any; body: any; }) {
    throw new Error("Method not implemented.");
  }

  constructor(private firestore: AngularFirestore) { }

  public getAssingmentSolution(idAssignment):Observable<AssignmentSolution[]>{
    //console.log('courses/'+idCourse+'/assignment');
    return this.firestore.collection<AssignmentSolution>('assignment/'+idAssignment+'/solution').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public addAssignmentSolution(assignmentId, data){ 
    //data["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection<AssignmentSolution>('assignment/'+assignmentId+'/solution').add(data);
  }

  public editAssignmentSolution(assignmentId, solutionId, data){
    return this.firestore.collection<AssignmentSolution>('assignment/'+assignmentId+'/solution').doc(solutionId).update(data);
  }
  public deleteAssignmentSolution(assignmentId,solutionId){
    //console.log('courses/'+courseId+'/posts/'+id);
    return this.firestore.collection<AssignmentSolution>('assignment/'+assignmentId+'/solution').doc(solutionId).delete();
  }
}
