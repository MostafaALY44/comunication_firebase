export interface ReactedPerson { 
	personId:string;
	action:boolean;//true for like  and false for dislike
};

export interface ReportPost { 
	personId:string;
	report:string;
};

export interface PostModel{
	id:string
	title:string
	body:string;
	like:number;
	dislike:number;
	postOwner:string;
	reactedPerson:ReactedPerson[];
	reportPost:ReportPost[]
}