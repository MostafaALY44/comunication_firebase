import { CRUD } from '../models/CRUD';
import { CommentModel } from '../models/CommentModel';
import { CommentService } from '../firebaseService/CommentService';
import { AngularFirestore } from '@angular/fire/firestore';

export class Comment implements CRUD{

    private commentService:CommentService=new CommentService(this.firestore)
	constructor(private url:string, private firestore: AngularFirestore, public comment:CommentModel){
        url+='/comments';
    }
	create (comment:CommentModel){    
	    this.commentService.create(this.url, this.commentForCreateAndUpdate(comment))}
	
	read (){
		return this.commentService.read(this.url, this.comment.id);
	}
	
	update(id, comment:CommentModel){
		this.commentService.update(this.url, id, this.commentForCreateAndUpdate(comment) )
	}

	delete(id:string){
		this.commentService.delete(this.url, id);		
	}

	commentForCreateAndUpdate(comment:CommentModel){return {"title":comment.title, "body":comment.body, "like":comment.like, "dislike":comment.dislike, "commentOwner": comment.commentOwner}}
}