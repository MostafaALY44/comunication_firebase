import { pollVotingModel, VottedPerson } from './../../../../../../services/user/oop/models/PollVotingModel';
import { PollVotting } from './../../../../../../services/user/oop/class/PollVotting';
import { CourseService } from './../../../../../../services/user/oop/course.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { PollingComponent } from '../polling.component';
import { UserService } from 'src/app/services/user/oop/user.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditPollingComponent } from '../edit-polling/edit-polling.component';
import { EditOptionComponent } from '../edit-option/edit-option.component';
import { PollingModel } from 'src/app/services/user/oop/models/PollingModel';
import { Stream } from 'stream';



@Component({
  selector: 'polling-items',
  templateUrl: './polling-items.component.html',
  styleUrls: ['./polling-items.component.css']
})
export class PollingItemsComponent implements OnInit {

  @Input() poll: PollingModel;
  currentUser;

  //options;
  constructor(public dialog: MatDialog) {
    this.currentUser = UserService.getUser();
  }

  Currpoll;
  setPoll(poll) {
    this.Currpoll = poll;
  }

  ngOnInit() {

    this.getOption(this.poll.id);
  }

  getDate(date) {
    if (date != null)
      return date.toDate();
  }

  options: Observable<pollVotingModel[]>;
  //flagDisplayOption:boolean = false;
  getOption(idPoll) {
    this.options = CourseService.polls.getVottings(idPoll);
    // console.log(this.options);
  }

  currentOption: pollVotingModel;
  setOption(option: pollVotingModel) {
    this.currentOption = option;
  }

  deletePoll() {
    CourseService.polls.delete(this.Currpoll.id);
  }

  deleteOption(idPoll) {
    CourseService.polls.votting.setCurrentIdPoll(idPoll);
    CourseService.polls.votting.delete(this.currentOption.id);
  }

  updatePoll() {
    this.dialog.open(EditPollingComponent, { data: this.Currpoll })
  }
  updateOption(idPoll) {
    CourseService.polls.votting.setCurrentIdPoll(idPoll);
    this.dialog.open(EditOptionComponent, { data: this.currentOption })
  }


  xxxxxx:pollVotingModel;
  
  voteUp(pollId) {
   let xxxxxx = CourseService.polls.getVottings(pollId);

    //let voteingModel:  pollVotingModel = {id:pollId, text:'test', votes:10, };
    //CourseService.polls.votting.update(votId+"",this.voteingModel);
    // console.log(JSON.stringify(xxxxxx))
  }
}
