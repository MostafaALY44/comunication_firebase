import { CRUDForfirebase } from './CRUDForFirebase';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostModel, ReactedPerson } from '../models/PostModel';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';

export class PostService implements CRUDForfirebase{
    constructor(private firestore: AngularFirestore){}
    create(url: string, post) {
        post["date"]=firebase.firestore.FieldValue.serverTimestamp();
        return this.firestore.collection(url).add(post)
    }
    read(url: string, id: string) {
        return this.firestore.doc<PostModel>(url+'/'+id).valueChanges();
    }
    update(url: string, id: string, post) {;
        return this.firestore.doc(url+'/'+id).update(post);
    }
    delete(url: string, id: string) {
        return this.firestore.doc(url+'/'+id).delete();
    }

    getAll(url:string){
        return this.firestore.collection<PostModel>(url).snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() ;
              const id = a.payload.doc.id; 
              return { id, ...data };
            })) 
          );
    }

    
    addReact(url: string, id: string, personId:string, react:boolean){
     return this.update(url, id, {[`react.${personId}`] :react})
		
    }
    // doUnsubscribe(removeSubscribe){
    //     setTimeout(function(){removeSubscribe.unsubscribe()},0)
    // }

    removeReact(url: string, id: string, personId:string){
        this.update(url, id, {[`react.${personId}`] :firebase.firestore.FieldValue.delete()})
     }
    
    // checkAction(actions:ReactedPerson[], personId, react:boolean):number{
    //     let isFind = actions.find(element=> element.personId=== personId)
    //     if(isFind){
    //         if(isFind.action==react)
    //             return -1 //not allow the same react
    //         else{
    //             return 1 //allow with different react
    //         }
    //     }else
    //         return 0 //allow new react
    // }


    // reportPost(url: string, id: string, personId:string,report:string){
    //    // console.log("+++++++++++++++++++++++++++++");
    //     let removeSubscribe=this.read(url, id).subscribe( (post)=>{
           
    //             post.reportPost.push({"personId":personId, "report":report});
    //            // console.log("post.reportPost "+post.reportPost)
    //             this.update(url,id,post);
    //             this.doUnsubscribe(removeSubscribe)
    //     })
           
            
    // }

}