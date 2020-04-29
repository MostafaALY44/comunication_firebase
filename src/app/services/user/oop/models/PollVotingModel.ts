
export interface VottedPerson { 
	personId:string;
	idPoll:string;
};

export interface pollVotingModel{
	id:string;
	text:string;
	votes:number;
	vottedPerson?:VottedPerson[];
}