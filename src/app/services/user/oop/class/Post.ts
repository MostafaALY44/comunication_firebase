import { CRUD } from '../models/CRUD';
import { Observable } from 'rxjs';
import { PostModel } from '../models/PostModel';
import { PostService } from '../firebaseService/PostService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment } from './Comment'
import { CommentModel } from '../models/CommentModel';


export class Post implements CRUD{

	comment:Comment;
	//posts: Observable<PostModel[]>;
	posts: PostModel[];
	private postService:PostService=new PostService(this.firestore)
	private url:string;
	constructor(private firestore: AngularFirestore){
		//this.url+='/posts';
		this.comment=new Comment(this.firestore);
	}

	reset(){
		this.posts=[];
	}
	changeUrl(url:string){
		this.url=url+'/posts';
		this.comment.changeUrl(this.url);
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

	removeLike(personId:string, postId:string){
		this.postService.removeReact(this.url, postId, personId,true)
	}	
	
	removeDisLike(personId:string, postId:string){
		this.postService.removeReact(this.url, postId, personId,false)
	}	

	currentPostId:string="";
	getComments(postId:string):Observable<CommentModel[]>{
		this.currentPostId=postId
		this.comment.setIdCourse(postId);
		return this.comment.comments;
	}
	postForCreateAndUpdate(post:PostModel){return {"title":post.title,"reactedPerson" : [], "body":post.body, "like":post.like, "dislike":post.dislike, "postOwner": post.postOwner}}

}