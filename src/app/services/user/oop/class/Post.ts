import { CRUD } from '../models/CRUD';
import { Observable } from 'rxjs';
import { PostModel } from '../models/PostModel';
import { PostService } from '../firebaseService/PostService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment } from './Comment'
import { CommentModel } from '../models/CommentModel';


export class Post implements CRUD{

	currentComment:Comment;
	//posts: Observable<PostModel[]>;
	posts: PostModel[];
	private postService:PostService=new PostService(this.firestore)
	private url:string;
	reset(){
		this.posts=[];
	}
	changeUrl(url:string){
		this.url=url+'/posts';
		this.currentComment.changeUrl(this.url);
	}
	
	constructor(private url:string, public post:PostModel, private firestore: AngularFirestore){
        url+='/posts';
    }
	create (post:PostModel){    
	    this.postService.create(this.url, this.postForCreateAndUpdate(post))}
	
	read (postId:string){
		return this.postService.read(this.url, postId);
	}
	
	update(id, post:PostModel){
		this.postService.update(this.url, id, this.postForCreateAndUpdate(post) )
	}

	delete(id:string){
		this.postService.delete(this.url, id);		
	}

	addLike(personId:string, postId:string){
		this.postService.addReact(this.url, postId, personId,true)
	}

	getAll(){
		return this.postService.getAll(this.url);
	}

	addDislike(personId:string, postId:string){
		this.postService.addReact(this.url, postId, personId,false)
	}	

	currentPostId:string="";
	getComments(postId:string):Observable<CommentModel[]>{
		this.currentPostId=postId
		this.currentComment.setIdCourse(postId);
		return this.currentComment.comments;
		
	}
	postForCreateAndUpdate(post:PostModel){return {"title":post.title, "body":post.body, "like":post.like, "dislike":post.dislike, "postOwner": post.postOwner}}

}