
export interface PollingModel{
	id:string
	text:string
	deadLine:any;
	pollingOwner:string;
	options?:Map<string, {"allVoted":number, "isVoteThis":boolean}>
	pollingVote?:Map<string, {"idOption":string, "date":any}>; 
	userId:string;
	date?:any;
}  