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
	getUrl(){
		return this.url;
	}
	changeUrl(url:string, postType:string){

		this.url=url+postType;
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
		return this.postService.addReact(this.url, postId, personId,true)
	}

	getAll(){
		return this.postService.getAll(this.url);
	}

	addDislike(personId:string, postId:string){
		this.postService.addReact(this.url, postId, personId,false)
	}	
 
	removeLike(personId:string, postId:string){
		this.postService.removeReact(this.url, postId, personId)
	}	
	
	removeDisLike(personId:string, postId:string){
		this.postService.removeReact(this.url, postId, personId)
	}	 

	currentPostId:string="";
	getComments(postId:string):Observable<CommentModel[]>{
		this.currentPostId=postId
		this.comment.setIdCourse(postId);
		return this.comment.comments;
	}
	// reportPost(personId:string, postId:string,report:string){
	// 	this.postService.reportPost(this.url,postId,personId,report);

	// }

	postForCreateAndUpdate(post:PostModel){return {"title":post.title,"react" : post.react, "body":post.body, "postOwner": post.postOwner,"userId":post.userId}}

}