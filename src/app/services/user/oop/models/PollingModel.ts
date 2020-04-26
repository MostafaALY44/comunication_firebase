
export interface PollingModel{
	id:string
	text:string
	deadLine:any;
	pollingOwner:string;
	options?:Map<string, Map<string, {"allVoted":number, "isVoteThis":boolean}>>
	pollingVote?:Map<string, {"idOption":string, "date":any}>;
	
}  