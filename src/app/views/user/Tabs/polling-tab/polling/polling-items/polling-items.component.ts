import { VotedPersonsComponent } from './../voted-persons/voted-persons.component';
import { pollVotingModel } from './../../../../../../services/user/oop/models/PollVotingModel';
import { CourseService } from './../../../../../../services/user/oop/course.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user/oop/user.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditPollingComponent } from '../edit-polling/edit-polling.component';
import { EditOptionComponent } from '../edit-option/edit-option.component';
import { PollingModel } from 'src/app/services/user/oop/models/PollingModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'polling-items',
  templateUrl: './polling-items.component.html',
  styleUrls: ['./polling-items.component.css']
})
export class PollingItemsComponent implements OnInit, OnDestroy {

  @Input() poll: PollingModel;
  currentUser;
  optionsForm = new FormGroup({
    type: new FormControl('')
  });

  //options;
  constructor(public dialog: MatDialog, private userService: UserService) {
    this.currentUser = UserService.getUser();
    
  }

  removeSubscrib: Subscription;
  ngOnDestroy(): void {
    if(this.removeSubscrib)
      this.removeSubscrib.unsubscribe();
  }

  Currpoll;
  setPoll(poll) {
    this.Currpoll = poll;
  }


  ngOnInit() {
    this.getOption(this.poll.id);
    
    if(this.poll.options.has(this.poll.id))
    this.poll.options.get(this.poll.id).forEach((option, key)=>{
      if(option.isVoteThis)
        this.favoriteSeason=key;
    })
    
  }


  getDate(date) {
    if (date != null)
      return date.toDate();
  }
  options
  getOption(idPoll) {
    
    this.options = CourseService.polls.getVottings(idPoll);
  }

  countVotes(idOption) {
    if (!this.poll.options.has(this.poll.id))
      return 0;
    const userVote = this.poll.options.get(this.poll.id).get(idOption)
    if (userVote) {

      return userVote.allVoted;
    }
    else return 0;
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
  favoriteSeason
  flag;
  voteOption(idOption) {
    if (this.favoriteSeason == idOption) {
      setTimeout(() => { this.favoriteSeason = "" }, 5)

      // if(this.optionsVoting.get(idOption)>1)
      //   this.optionsVoting.set(idOption, this.optionsVoting.get(idOption) -1);
      // else
      //   this.optionsVoting.delete(idOption);
      CourseService.polls.removeOption(this.poll.id, { "personId": UserService.user.uid, "optionId": idOption })
      return
    }
    CourseService.polls.addOption(this.poll.id, { "personId": UserService.user.uid, "optionId": idOption })
    this.favoriteSeason = idOption;
  }


  xxxxxx: pollVotingModel;

  voteUp(pollId) {
    let xxxxxx = CourseService.polls.getVottings(pollId);

  }


 
  showVotedPersons(option:pollVotingModel) {
    let votedPersons = [];
 
    this.poll.pollingVote.forEach(
      (value: { idOption: string; date: any; }, key: string) => {
        if (value.idOption == option.id) {
          this.removeSubscrib = this.userService.getUserById(key).subscribe(
            user => {
              votedPersons.push(user.name);
            }
          )
        }
      }
    )
    votedPersons.sort();
    this.dialog.open(VotedPersonsComponent, {
      data: votedPersons,
      width: '500px'
    })
  }

}
