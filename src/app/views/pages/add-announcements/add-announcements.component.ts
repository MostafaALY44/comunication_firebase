import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import { GlobalAnnouncementService } from 'src/app/services/announcement/global-announcement.service';


@Component({
  selector: 'app-add-announcements',
  templateUrl: './add-announcements.component.html',
  styleUrls: ['./add-announcements.component.css']
})
export class AddAnnouncementsComponent implements OnInit,OnDestroy {
  //options: Tags[] ;
  removeSubscribe1;
  constructor(@Inject(MAT_DIALOG_DATA) private data: {"announcement":Announcement,
  "tags":Observable<Tags[]>}, private globalService:GlobalAnnouncementService) {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //     startWith(null),
    //     map((fruit: string | null) => fruit ? this._filter(fruit) : this.allOptions.slice()));

        this.removeSubscribe1=this.data.tags.subscribe(tags=>{
          this.allOptions=tags;
          this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.allOptions.slice())
          );
        })

  }
  /*constructor(@Inject(MAT_DIALOG_DATA) private data: {"announcement":announcement,
   "tags":Observable<Tags[]>}) {
    this.removeSubscribe1=this.data.tags.subscribe(tags=>{
      this.options=tags;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
  }*/
  ngOnDestroy(): void {
    this.removeSubscribe1.unsubscribe()
  }

  newAnnouncement = new FormGroup({
    title : new FormControl('',Validators.required),
    body : new FormControl('',Validators.required),
    note : new FormControl(''),
    start_date : new FormControl('',Validators.required),
    end_date : new FormControl('',Validators.required),
    accepted : new FormControl('',Validators.required),
  });

  //myControl = new FormControl();
  //filteredOptions: Observable<Tags[]>;

  ngOnInit() {
  }

  // private _filter(value: string): Tags[] {
  //   const filterValue = value.toLowerCase();
  //   if(!this.options)
  //     return this.options;
  //   return this.options.filter(option => option.id.toLowerCase().includes(filterValue));
  // }

  onSubmit(){
    //console.log("oldTags "+this.oldTags)
    //console.log("newTags "+this.newTags)
    this.globalService.addNewGlobalAnnouncement(this.newTags, this.oldTags, this.newAnnouncement.value)
  }

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  myControl = new FormControl();
  filteredOptions: Observable<Tags[]>;
  selectedOptions:string[]=[];
  allOptions: Tags[] = []
  wasSelected:Tags[]=[]

  newTags:string[]=[];
  oldTags:string[]=[];

  @ViewChild('tagInput',{static:false}) tagInput: ElementRef<HTMLInputElement>;
  //@ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto',{static:false}) matAutocomplete: MatAutocomplete;

  pushInUniqueArray(arr:string[],word:string){
    for(let i=0;i<arr.length;i++){
      if(arr[i]==word)
        return;
    }
    arr.push(word);
  }
  getIndexOfInTags(tags:Tags[] ,id:string):number{
    for(let i=0;i<tags.length;i++)
      if(tags[i].id==id)
        return i;
    return -1;
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.pushInUniqueArray(this.selectedOptions,value.trim());
      let flag:boolean=false
      let index = this.getIndexOfInTags(this.allOptions, value);
      if(index == -1)
         index = this.getIndexOfInTags(this.wasSelected, value);
      if (index >= 0) {
        flag=true;
        this.wasSelected.push(this.allOptions[index])
        this.allOptions.splice(index, 1);
      }
      if(flag){
        this.pushInUniqueArray(this.oldTags,value.trim())
      }else{
        this.pushInUniqueArray(this.newTags, value.trim())
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.myControl.setValue(null);
  }

 
  remove(option: string): void {
    const index = this.selectedOptions.indexOf(option);
    const index2 = this.getIndexOfInTags(this.wasSelected, option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
    if (index2 >= 0) {
      this.allOptions.push(this.wasSelected[index2]);
      this.wasSelected.splice(index2, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.pushInUniqueArray(this.selectedOptions, event.option.value);
    this.pushInUniqueArray(this.oldTags, event.option.value)
    const index = this.getIndexOfInTags(this.allOptions, event.option.value);
      if (index >= 0) {
        this.wasSelected.push(this.allOptions[index])
        this.allOptions.splice(index, 1);
      }
    this.tagInput.nativeElement.value = '';
    this.myControl.setValue(null);
  }

  private _filter(value): Tags[] {
    if(value.id)
      value=value.id
    const filterValue = value.toLowerCase();

    return this.allOptions.filter(option => option.id.toLowerCase().indexOf(filterValue) === 0);
  }


}
