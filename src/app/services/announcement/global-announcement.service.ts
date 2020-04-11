import { Injectable } from '@angular/core';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GlobalAnnouncementService {

  constructor(private firestore: AngularFirestore) { }

  globalTags:Observable<Tags[]>
  getGlobalTags():Observable<Tags[]>{
    this.globalTags= this.firestore.collection<Tags>("announcement/global/tags").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;  
        return { id, ...data };
      })) 
    );
    return this.globalTags;
  }

  public addNewGlobalAnnouncement(newTags:string[], oldTags:string[], announcement:Announcement ){
    if(newTags.length || oldTags.length){
      let docId;
      this.firestore.collection("announcement/global/announcements").add(announcement).then(docRef => {
          docId= docRef.id;
          if(newTags.length)
            this.addGlobalNewTags(newTags, docId);
          oldTags.forEach(element => {
            this.firestore.collection("announcement/global/tags/"+element+"/contents").doc(docId).set({});
          });
        })
        
        
    }
  }
  private addGlobalNewTags(newTags:string[], docId){
    newTags.forEach(element => {
      this.firestore.collection("announcement/global/tags").doc(element).collection("contents").doc(docId).set({});
    });
  }

  /*getAllAnnouncements():Announcement[]{
    return this.firestore.
  }*/

  
  //addGlobalTags():Observable<Tags[]>{
    //return this.firestore.collection<Tags>("announcement/global/tags")
  //}
}
