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

	setIdCourse(courseId:string){
		this.comments=this.commentService.getAll(this.url+'/'+courseId +'/comments');
	}
	create (comment:CommentModel){    
	    this.commentService.create(this.url, this.commentForCreateAndUpdate(comment))}
	
	read (commentId:string){
		return this.commentService.read(this.url, commentId);
	}
	
	update(id, comment:CommentModel){
		this.commentService.update(this.url, id, this.commentForCreateAndUpdate(comment) )
	}

	delete(id:string){
		this.commentService.delete(this.url, id);		
	}

	commentForCreateAndUpdate(comment:CommentModel){return {"title":comment.title, "body":comment.body, "like":comment.like, "dislike":comment.dislike, "commentOwner": comment.commentOwner}}
}