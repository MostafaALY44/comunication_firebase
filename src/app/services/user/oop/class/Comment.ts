import { CRUD } from '../models/CRUD';
import { CommentModel } from '../models/CommentModel';
import { CommentService } from '../firebaseService/CommentService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export class Comment implements CRUD{

	comments:Observable<CommentModel[]>
	private commentService:CommentService=new CommentService(this.firestore)
	private url:string
	constructor( private firestore: AngularFirestore){}
	
	changeUrl(url:string){
		this.url=url
	}

	postId:string;
	setCurrentIdPost(postId:string){
		this.postId=postId;
	}

	setIdCourse(courseId:string){
		this.comments=this.commentService.getAll(this.url+'/'+courseId +'/comments');
	}
	 
	create (comment:CommentModel){    
		
	    this.commentService.create(this.url+'/'+this.postId+'/comments', this.commentForCreateAndUpdate(comment))}
	
	read (commentId:string){
		return this.commentService.read(this.url+'/'+this.postId+'/comments', commentId);
	}
	
	update(id, comment:CommentModel){
		
		this.commentService.update(this.url+'/'+this.postId+'/comments', id, this.commentForCreateAndUpdate(comment) )
	}

	delete(id:string){
		this.commentService.delete(this.url+'/'+this.postId+'/comments', id);		
	}

	addLike(personId:string, commentId:string){
		this.commentService.addReact(this.url+'/'+this.postId+'/comments', commentId, personId,true)
	}

 
	addDislike(personId:string, commentId:string){
		this.commentService.addReact(this.url+'/'+this.postId+'/comments', commentId, personId,false)
	}	

	removeLike(personId:string, commentId:string){
		this.commentService.removeReact(this.url+'/'+this.postId+'/comments', commentId, personId)
	}	
	
	removeDisLike(personId:string, commentId:string){
		this.commentService.removeReact(this.url+'/'+this.postId+'/comments', commentId, personId)
	}	 


	commentForCreateAndUpdate(comment:CommentModel){return {"body":comment.body,"reacte" : comment.react, "commentOwner": comment.commentOwner,"userId":comment.userId}}
 
	
}