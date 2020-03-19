import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument  } from '@angular/fire/firestore';
import 'firebase/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private firestore: AngularFirestore) { }

  public getPostComments(idCourse,idPost):Observable<Comments[]>{
    return this.firestore.collection<Comments>('courses/'+idCourse+'/posts'+idPost+'/comments').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  public addCoursePost(idCourse,idPost, data){ 
    data["date"]=firebase.firestore.FieldValue.serverTimestamp();
    return this.firestore.collection<Comments>('courses/'+idCourse+'/posts'+idPost+'/comments').add(data);
  }

  public editPost(idCourse,idPost,idComment, data){
    return this.firestore.collection<Comments>('courses/'+idCourse+'/posts'+idPost+'/comments').doc(idComment).update(data);
  }
  public deletePost(idCourse,idPost,idComment){
    //console.log('courses/'+courseId+'/posts/'+id);
    return this.firestore.collection<PostComment>('courses/'+idCourse+'/posts'+idPost+'/comments').doc(idComment).delete();
  }
}
 