import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { CourseService } from './oop/course.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  static url:string=""
  constructor(private firestore: AngularFirestore) { }

  public getAssingment(url):Observable<Assignment[]>{
    //console.log('courses/'+idCourse+'/assignment');
    return this.firestore.collection<Assignment>(url+'/assignment').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public addAssignment(courseId, data){ 
    //data["date"]=firebase.firestore.FieldValue.serverTimestamp();
    console.log(AssignmentService.url+'/assignment');
    return this.firestore.collection<Assignment>(AssignmentService.url+'/assignment').add(data);
  }

  public editAssignment(courseId, assignmentId, data){
    //console.log('courses/'+courseId+'/assignment');
    return this.firestore.collection<Assignment>(AssignmentService.url+'/assignment').doc(assignmentId).update(data);
  }
  public deleteAssignment(courseId,assignmentId){
    //console.log('courses/'+courseId+'/posts/'+id);
    return this.firestore.collection<Assignment>(AssignmentService.url+'/assignment').doc(assignmentId).delete();
  }
}
 