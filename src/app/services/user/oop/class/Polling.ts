
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { PollingService } from '../firebaseService/polling.service';
import { PollingModel } from '../models/PollingModel';
import { CRUD } from '../models/CRUD';
import { PollVotting } from './PollVotting';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { pollVotingModel } from '../models/PollVotingModel';
import { OnDestroy } from '@angular/core';

export class Polling implements CRUD , OnDestroy{

    votting:PollVotting;
    polles:PollingModel[];
    
    options:Map<string, BehaviorSubject<pollVotingModel[]>> = new Map<string, BehaviorSubject<pollVotingModel[]>>();
    private url:string;
    private pollingService:PollingService=new PollingService(this.firestore)
    constructor(private firestore: AngularFirestore){
		
		this.votting=new PollVotting(this.firestore);
	}
  ngOnDestroy(): void {
    this.removeSubscribe.forEach(element=>{
      element.unsubscribe()
    })
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
    
    removeOption(id: string, object:{"personId":string, "optionId":string}){
      return this.pollingService.removeVoteOption(this.url, id, object);
    }

    addOption(id: string, object:{"personId":string, "optionId":string}){
      return this.pollingService.addVoteOption(this.url, id, object);
    }

    currentpollId:string="";
	getVottings(PollId:string):Observable<pollVotingModel[]>{
		this.currentpollId=PollId
		this.votting.setIdCourse(PollId);
		return this.votting.vottings;
  }
  
  removeSubscribe:Subscription[]=[];
  setOptions(){
    this.polles.forEach(element=>{
      let xx=this.getVottings(element.id);
      let optionObservable:BehaviorSubject<pollVotingModel[]>;
      if(this.options.has(element.id))
         optionObservable = this.options.get(element.id);
      else
        optionObservable = new BehaviorSubject<pollVotingModel[]>([]);
      this.options.set(element.id, optionObservable);
      this.removeSubscribe.push(xx.subscribe( vot=>{
        //console.log(vot)
          optionObservable.next(vot); 
        }))
      
      
    })
    
  }
    pollForCreateAndUpdate(poll:PollingModel){return {"text":poll.text,"deadLine" : poll.deadLine, "pollingOwner":poll.pollingOwner,"userId":poll.userId}}

}