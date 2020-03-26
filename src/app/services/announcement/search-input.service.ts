import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchInputService {
  private searchValue = new BehaviorSubject('');
  currentWord = this.searchValue.asObservable();
  isFocus:boolean=false
  constructor() { }

  changeSearchValue(word:string ){
    this.searchValue.next(word);
  }


}
