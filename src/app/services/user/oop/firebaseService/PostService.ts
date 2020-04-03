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
    update(url: string, id: string, post) {
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
     //   console.log("addReact: ")

		let removeSubscribe=this.read(url, id).subscribe( (post)=>{
            let checkAction= this.checkAction(post.reactedPerson, personId, react) 
            console.log("addReact: "+checkAction)
            if(checkAction == -1){
                this.doUnsubscribe(removeSubscribe)
                return;}

            if(checkAction == 1){
                if(react)
                    post.dislike--;
                else
                    post.like--;
                post.reactedPerson.find(element=> element.personId=== personId).action=react;
            }else{
                post.reactedPerson.push({"personId":personId, "action":react});
            }
            if(react)
                post.like++;
            else
                post.dislike++;
            this.update(url,id,post);   
            this.doUnsubscribe(removeSubscribe)
        })
    }
    doUnsubscribe(removeSubscribe){
        setTimeout(function(){removeSubscribe.unsubscribe()},5)
    }

    removeReact(url: string, id: string, personId:string, react:boolean){
        
        this.read(url, id).subscribe(  (post)=>{
           
            let isPost = post.reactedPerson.find(element=> element.personId=== personId)
           
            if(isPost){
                let index = post.reactedPerson.findIndex(element=> element.personId==personId);
                if(index >-1){
                    post.reactedPerson.splice(index, 1);
                    this.update(url,id,post);
                }
            }
        })
    }
    
    checkAction(actions:ReactedPerson[], personId, react:boolean):number{
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


    reportPost(url: string, id: string, personId:string,report:string){
       // console.log("+++++++++++++++++++++++++++++");
        let removeSubscribe=this.read(url, id).subscribe( (post)=>{
           
                post.reportPost.push({"personId":personId, "report":report});
               // console.log("post.reportPost "+post.reportPost)
                this.update(url,id,post);
                this.doUnsubscribe(removeSubscribe)
        })
           
            
    }

}