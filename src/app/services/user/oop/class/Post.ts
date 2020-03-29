import { CRUD } from '../models/CRUD';
import { Observable } from 'rxjs';
import { PostModel } from '../models/PostModel';
import { PostService } from '../firebaseService/PostService';
import { AngularFirestore } from '@angular/fire/firestore';
import { Comment } from './Comment'


export class Post implements CRUD{

	comments:Observable<Comment[]>
	private postService:PostService=new PostService(this.firestore)
	
	constructor(private url:string, public post:PostModel, private firestore: AngularFirestore){
        url+='/posts';
    }
	create (post:PostModel){    
	    this.postService.create(this.url, this.postForCreateAndUpdate(post))}
	
	read (){
		return this.postService.read(this.url, this.post.id);
	}
	
	update(id, post:PostModel){
		this.postService.update(this.url, id, this.postForCreateAndUpdate(post) )
	}

	delete(id:string){
		this.postService.delete(this.url, id);		
	}

	addLike(personId:string){
		this.postService.addReact(this.url, this.post.id, personId,true)
	}

	addDislike(personId:string){
		this.postService.addReact(this.url, this.post.id, personId,false)
	}	

	postForCreateAndUpdate(post:PostModel){return {"title":post.title, "body":post.body, "like":post.like, "dislike":post.dislike, "postOwner": post.postOwner}}

}