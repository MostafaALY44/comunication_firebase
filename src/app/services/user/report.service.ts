import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { PostReport } from './models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private firestore: AngularFirestore) { }

  public getReports(id):Observable<PostReport[]>{
    return this.firestore.collection<PostReport>('reports/'+id).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public addReport( data){ 
   // data["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection<PostReport>('reports/').add(data);
  }

  // public editPost(courseId, postId, data){
  //   return this.firestore.collection<PostComment>('courses/'+courseId+'/posts').doc(postId).update(data);
  // }
  // public deletePost(courseId,postId){
  //   //console.log('courses/'+courseId+'/posts/'+id);
  //   return this.firestore.collection<PostComment>('courses/'+courseId+'/posts').doc(postId).delete();
  // }
}
