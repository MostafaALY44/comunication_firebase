
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { PollingService } from '../firebaseService/polling.service';
import { PollingModel } from '../models/PollingModel';
import { CRUD } from '../models/CRUD';
import { PollVotting } from './PollVotting';
import { Observable } from 'rxjs';
import { pollVotingModel } from '../models/PollVotingModel';

export class Polling implements CRUD{

    votting:PollVotting;
    polles:PollingModel[];
    private url:string;
    private pollingService:PollingService=new PollingService(this.firestore)
    constructor(private firestore: AngularFirestore){
		
		this.votting=new PollVotting(this.firestore);
	}
 
    reset(){
		this.polles=[];
	}
	changeUrl(url:string){
		this.url=url+'/polls';
		this.votting.changeUrl(this.url);
	}

    create(poll):Promise<DocumentReference> {
       return this.pollingService.create(this.url, this.pollForCreateAndUpdate(poll))
    } 
    read(pollId: string) {
        return this.pollingService.read(this.url, pollId);
    }
    update(id: string, poll) {
       return this.pollingService.update(this.url, id, this.pollForCreateAndUpdate(poll) )
    }
    delete(id: string) {
       return this.pollingService.delete(this.url, id);
    }


    getAll(){
		return this.pollingService.getAll(this.url);
    }
    

    currentpollId:string="";
	getVottings(PollId:string):Observable<pollVotingModel[]>{
		this.currentpollId=PollId
		this.votting.setIdCourse(PollId);
		return this.votting.vottings;
	}
    pollForCreateAndUpdate(poll:PollingModel){return {"text":poll.text,"deadLine" : poll.deadLine, "pollingOwner":poll.pollingOwner}}

}