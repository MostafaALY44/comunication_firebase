export interface ReactedPerson { 
	personId:string;
	action:boolean;//true for like  and false for dislike
};

export interface PostModel{
	id:string
	title:string
	body:string;
	postOwner:string;
	react:any;
	userId:string;
	date?:any;
	
}