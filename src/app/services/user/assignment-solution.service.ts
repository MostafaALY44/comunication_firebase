import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AssignmentService } from './assignment.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentSolutionService {

  constructor(private firestore: AngularFirestore) { }

  public getAssingmentSolution(idCourse, idAssignment):Observable<AssignmentSolution[]>{
    return this.firestore.collection<AssignmentSolution>(AssignmentService.url+'/assignment/'+idAssignment+'/solution').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public addAssignmentSolution(idCourse,assignmentId, data){ 
    data["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection<AssignmentSolution>(AssignmentService.url+'/assignment/'+assignmentId+'/solution').add(data);
  }

  public editAssignmentSolution(idCourse,assignmentId, solutionId, data){
    return this.firestore.collection<AssignmentSolution>(AssignmentService.url+'/assignment/'+assignmentId+'/solution').doc(solutionId).update(data);
  }
  public deleteAssignmentSolution(idCourse,assignmentId,solutionId){
    return this.firestore.collection<AssignmentSolution>(AssignmentService.url+'/assignment/'+assignmentId+'/solution').doc(solutionId).delete();
  }
}
