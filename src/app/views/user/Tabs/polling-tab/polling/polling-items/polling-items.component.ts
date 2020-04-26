import { VotedPersonsComponent } from './../voted-persons/voted-persons.component';
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
import { element } from 'protractor';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'polling-items',
  templateUrl: './polling-items.component.html',
  styleUrls: ['./polling-items.component.css']
})
export class PollingItemsComponent implements OnInit {

  @Input() poll: PollingModel;
  currentUser;
  optionsForm = new FormGroup({
    type:new FormControl('')
  });
  
  //options;
  constructor(public dialog:MatDialog, private userService: UserService) { 
    this.currentUser=UserService.getUser();
    console.log("xxxxxxxxxxxxxxxxx")
  }

  Currpoll;
  setPoll(poll) {
    this.Currpoll = poll;
  }
  
  
  ngOnInit() {
    console.log(")))))))))))))))))))))))))))) ", this.poll.id)
    console.log("(((((((((((((((((((((((((((( ", this.poll.options.get(this.poll.id))
    this.getOption(this.poll.id);
    //this.getOptionDetails();
    //this.optionsVoting = this.poll.options.get(this.poll.id);
    this.poll.options.get(this.poll.id).forEach((option, key)=>{
      if(option.isVoteThis)
        this.favoriteSeason=key;
    })
  }

  getDate(date){
    if(date != null)
      return date.toDate();
  }
  options
  getOption(idPoll){
    //console.log(CourseService.polls.options)
   // this.options= CourseService.polls.options.get(idPoll).asObservable();
    this.options= CourseService.polls.getVottings(idPoll);
   // console.log(this.options);
  }

  //optionsVoting:Map<string, {allVoted: number;isVoteThis: boolean;}> 
  //currentVoteOption:string="";
  // getOptionDetails(){
  //   const userVote=this.poll.pollingVote.get(UserService.user.uid)
  //   if(userVote){
  //     this.favoriteSeason=userVote.idOption;
  //   }
  //     //this.currentVoteOption=userVote.idOption;
  //   this.poll.pollingVote.forEach((element)=>{
  //     if(this.optionsVoting.has(element.idOption))
  //       this.optionsVoting.set(element.idOption, this.optionsVoting.get(element.idOption) +1);
  //     else
  //       this.optionsVoting.set(element.idOption, 1);
  //   })
  //   //console.log(this.poll.pollingVote)
  //   //console.log(this.optionsVoting)
  // }

  countVotes(idOption){
    const userVote=this.poll.options.get(this.poll.id).get(idOption)
    if(userVote){
      
      //console.log(idOption, userVote)
      //document.getElementById(idOption).focus()
      return userVote.allVoted;
    }
    else return 0;
  }

  
  currentOption:pollVotingModel;
  setOption(option:pollVotingModel){
    this.currentOption=option;
  
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
  voteOption(idOption){
    if(this.favoriteSeason== idOption){
      console.log("*************** ")
      setTimeout(()=>{ this.favoriteSeason=""},5)
      
      // if(this.optionsVoting.get(idOption)>1)
      //   this.optionsVoting.set(idOption, this.optionsVoting.get(idOption) -1);
      // else
      //   this.optionsVoting.delete(idOption);
      CourseService.polls.removeOption(this.poll.id, {"personId":UserService.user.uid,"optionId":idOption})
      return 
    }
    CourseService.polls.addOption(this.poll.id, {"personId":UserService.user.uid,"optionId":idOption})
    this.favoriteSeason=idOption;
    console.log(this.favoriteSeason)
  }


  xxxxxx:pollVotingModel;
  
  voteUp(pollId) {
   let xxxxxx = CourseService.polls.getVottings(pollId);

    //let voteingModel:  pollVotingModel = {id:pollId, text:'test', votes:10, };
    //CourseService.polls.votting.update(votId+"",this.voteingModel);
    // console.log(JSON.stringify(xxxxxx))
  }

  showVotedPersons(option) {
    let votedPersons = [];
    console.log("====================> Test");
    this.setOption(option);
    this.poll.pollingVote.forEach((value: { idOption: string; date: any; }, key: string) => {
      if (value.idOption == this.currentOption.id) {
        this.userService.getUserById(key).subscribe(user => {
          console.log(user);
          votedPersons.push(user.name);
          votedPersons.push("مش موجود ");
        })
      }
    })

    this.dialog.open(VotedPersonsComponent, {
      data: votedPersons,
      height: '300px',
      width: '500px',
    })
  }



}
