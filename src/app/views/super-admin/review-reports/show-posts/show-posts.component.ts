import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostService } from 'src/app/services/user/oop/firebaseService/PostService';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-posts',
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.css']
})
export class ShowPostsComponent implements OnInit,OnDestroy {
post:PostModel;
showSpinner:boolean=false;
removeSubscribe:Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) private data:{'url', 'postId'},private firestore:AngularFirestore) { 
    this.showSpinner=true;
     this.removeSubscribe= new PostService(this.firestore).read(this.data.url,this.data.postId).subscribe(
      post=>{
       
        this.post=post;
        this.showSpinner=false;
        
      }
    )
    
  }
  ngOnDestroy(): void {
    if(this.removeSubscribe)
        this.removeSubscribe.unsubscribe();
  }
  getDate(date){
    if(date != null)
      return date.toDate();
  }
  
   
  ngOnInit() {
  }

}
