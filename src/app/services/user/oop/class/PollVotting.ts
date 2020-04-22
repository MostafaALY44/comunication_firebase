import { CRUD } from '../models/CRUD';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { pollVotingModel } from '../models/PollVotingModel';
import { Observable } from 'rxjs';
import { PollVottingService } from '../firebaseService/poll-votting.service';


export class PollVotting implements CRUD {

  vottings: Observable<pollVotingModel[]>
  private VottingService: PollVottingService = new PollVottingService(this.firestore)
  private url: string
  constructor(private firestore: AngularFirestore) { }

  changeUrl(url: string) {
    this.url = url
  }

  PollId: string;
  setCurrentIdPoll(PollId: string) {
    this.PollId = PollId;
  }

  setIdCourse(courseId: string) {
    this.vottings = this.VottingService.getAll(this.url + '/' + courseId + '/vottings');
  }

  create(vote): Promise<DocumentReference> {
    return this.VottingService.create(this.url + '/' + this.PollId + '/vottings', this.vottingForCreateAndUpdate(vote))
  }
  read(id: string) {
    return this.VottingService.read(this.url + '/' + this.PollId + '/vottings', id);
  }
  update(id: string, vote) {
    return this.VottingService.update(this.url + '/' + this.PollId + '/vottings', id, this.vottingForCreateAndUpdate(vote))
  }
  delete(id: string) {
    return this.VottingService.delete(this.url + '/' + this.PollId + '/vottings', id);
  }

  vottingForCreateAndUpdate(vote: pollVotingModel) { return { "text": vote.text, 'vottedPerson': vote.vottedPerson, "votes": vote.votes } }

}