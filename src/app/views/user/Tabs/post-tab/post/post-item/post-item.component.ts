import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/user/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditPostComponent } from '../edit-post/Edit-post.component';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() post:PostComment;
  courseId;
  constructor(private ser:PostService, private route:ActivatedRoute, public dialog:MatDialog) {
    route.parent.paramMap.subscribe((params : ParamMap) =>  this.courseId=params.get('id'));
   }

  ngOnInit() {
  }
  getDate(date){
    if(date != null)
      return date.toDate();
  }

  CurrPost;
  setPost(post){
    this.CurrPost=post;
  }

  editPost(){//console.log(this.CurrPost);
    this.dialog.open(EditPostComponent,{data:{"post":this.CurrPost,"courseId":this.courseId}})
  }
  deletePost(){
    this.ser.deletePost(this.courseId,this.CurrPost["id"]);
  } 

}
