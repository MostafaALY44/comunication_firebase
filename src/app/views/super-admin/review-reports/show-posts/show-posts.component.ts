import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostService } from 'src/app/services/user/oop/firebaseService/PostService';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-posts',
  templateUrl: './show-posts.component.html',
  styleUrls: ['./show-posts.component.css']
})
export class ShowPostsComponent implements OnInit {
post:PostModel;
  constructor(@Inject(MAT_DIALOG_DATA) private data:{'url', 'postId'},private firestore:AngularFirestore) { 
    //console.log(this.data.url,"+++++",this.data.postId)
      new PostService(this.firestore).read(this.data.url,this.data.postId).subscribe(
      post=>{
       // console.log(post)
        this.post=post;
        
      }
    )
    //console.log(this.post)
  }
  getDate(date){
    if(date != null)
      return date.toDate();
  }
   
  ngOnInit() {
  }

}
