export interface ReactedPersons { 
	personId:string;
	action:boolean;//true for like  and false for dislike
};


export interface CommentModel{
	id:string
	body:string;
	like:number;
	dislike:number;
	commentOwner:string;
	reactedPerson:ReactedPersons[]; 
}