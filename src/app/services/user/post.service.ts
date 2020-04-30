import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private firestore: AngularFirestore) { }

  public getCoursePosts(id):Observable<PostComment[]>{
    return this.firestore.collection<PostComment>('courses/'+id+'/posts').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public addCoursePost(courseId, data){ 
    data["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection<PostComment>('courses/'+courseId+'/posts').add(data);
  }

  public editPost(courseId, postId, data){
    return this.firestore.collection<PostComment>('courses/'+courseId+'/posts').doc(postId).update(data);
  }
  public deletePost(courseId,postId){
    return this.firestore.collection<PostComment>('courses/'+courseId+'/posts').doc(postId).delete();
  }
}
