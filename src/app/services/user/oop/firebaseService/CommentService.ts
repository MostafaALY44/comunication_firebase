import { CRUDForfirebase } from './CRUDForFirebase';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommentModel, ReactedPersons } from '../models/CommentModel';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

export class CommentService implements CRUDForfirebase{
    constructor(private firestore: AngularFirestore){}
    create(url: string, comment) {
        comment["date"]=firebase.firestore.FieldValue.serverTimestamp();
        return this.firestore.collection<CommentModel>(url).add(comment);
    }

    read(url: string, id: string) {
        console.log(url+'/'+id)
        return this.firestore.doc<CommentModel>(url+'/'+id).valueChanges()
        
    }
    update(url: string, id: string, comment) {
        return this.firestore.doc<CommentModel>(url+'/'+id).update(comment);
    }
    delete(url: string, id: string) {
        return this.firestore.doc(url+'/'+id).delete();
    }

    getAll(url:string):Observable<CommentModel[]>{
        return this.firestore.collection<CommentModel>(url).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() ;
              const id = a.payload.doc.id;
              return { id, ...data };
            })) 
          );

    }

    addReact(url: string, id: string, personId:string, react:boolean){
         // console.log("addReact: ")
   
           let removeSubscribe=this.read(url, id).subscribe( (comment)=>{
           // console.log("addReact: " +comment)
               let checkAction= this.checkAction(comment.reactedPerson, personId, react) 
              // console.log("addReact: "+checkAction)
               if(checkAction == -1){
                   this.doUnsubscribe(removeSubscribe)
                   return;
                }
   
               if(checkAction == 1){
                   if(react)
                       comment.dislike--;
                   else
                       comment.like--;
                    comment.reactedPerson.find(element=> element.personId=== personId).action=react;
               }else{
                comment.reactedPerson.push({"personId":personId, "action":react});
               }
               if(react)
                    comment.like++;
               else
                    comment.dislike++;
               this.update(url,id,comment);   
               this.doUnsubscribe(removeSubscribe)
           })
       }
       doUnsubscribe(removeSubscribe){
           setTimeout(function(){removeSubscribe.unsubscribe()},5)
       }

       
       checkAction(actions:ReactedPersons[], personId, react:boolean):number{
           let isFind = actions.find(element=> element.personId=== personId)
           if(isFind){
               if(isFind.action==react)
                   return -1 //not allow the same react
               else{
                   return 1 //allow with different react
               }
           }else
               return 0 //allow new react
       }

}