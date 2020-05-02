import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/user/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CourseService } from 'src/app/services/user/oop/course.service';
import { PostModel } from 'src/app/services/user/oop/models/PostModel';
import { UserService } from 'src/app/services/user/oop/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  newPost = new FormGroup({
    title : new FormControl('',Validators.required),
    body : new FormControl('',[Validators.required, Validators.minLength(4)])
  });
  currentUser;
  constructor() {
    this.currentUser=UserService.getUser();

   }

  ngOnInit() {
  }
  isEmpty(text:string):boolean{
    if(!text)
      return false;
    for(let i=0;i<text.length;i++)
      if(text[i] != " ")
        return false;
    return true;
  }
  resetForm(form: FormGroup) {

    form.reset();

    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
}
  onSubmit(){
    if(!this.isEmpty(this.newPost.value.body)){

      let data:PostModel={"id" : "", "react" : null, "postOwner":this.currentUser.name,'userId':this.currentUser.uid, "title":this.newPost.value.title, "body": this.newPost.value.body};
      
      CourseService.posts.create(data);
      this.resetForm(this.newPost);
      
    } 
  }

}
