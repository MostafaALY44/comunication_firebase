import { Injectable } from '@angular/core';
import { Category } from '../class/category';
import { Material } from '../class/Material';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { CourseService } from '../course.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryFactoryService implements OnDestroy {

  removeUnsubscribe1
  category: Category;
  private isCategoryLoad:BehaviorSubject<boolean>= new BehaviorSubject(false);

  private url: string

  constructor(private firestore: AngularFirestore) {
    this.category = new Category(this.firestore)
  }

  changeUrl(url: string) {
    if (this.removeUnsubscribe1)
      this.removeUnsubscribe1.unsubscribe();
    this.category.reset();
    this.category.changeUrl(url);
    this.url = url;
    this.setCategories();
  }

  private doUnsubscribeArray(removeUnsubscribe: Subscription[]) {
    removeUnsubscribe.forEach(element => {
      setTimeout(function () { element.unsubscribe() }, 1000);
    });
  }

  // private doUnsubscribe(removeUnsubscribe: Subscription){
  //   setTimeout(function () { removeUnsubscribe.unsubscribe() }, 1000);
  // }

  // subscribe(){
  //   this.setCategories(false);
  // }
  // unsubscribe(){
  //   if (this.removeUnsubscribe1)
  //     this.removeUnsubscribe1.unsubscribe();
  // } 
  setCategories() {
    {
      let categoryNames = this.category.getAll();
      this.removeUnsubscribe1 = categoryNames.subscribe(categories => {
        let removeUnsubscribe2: Subscription[] = [];
        
        if (categories.length < this.category.categoriesMap.size) {
          this.category.categoriesMap.forEach((value: {id:string, material:Material}, key: string) => {
            if (!categories.find(element => element.name === key))
              this.category.categoriesMap.delete(key);
          })
        } else if (categories.length > this.category.categoriesMap.keys.length) {
          categories.forEach(element => {
            if (!this.category.categoriesMap.get(element.name)) {
              let x = new Material(this.url + '/categories/' + element.id, this.firestore);
              removeUnsubscribe2.push(x.getAll().subscribe(materials => {
                x.material = materials;
                this.doUnsubscribeArray(removeUnsubscribe2)
              }));
              this.category.categoriesMap.set((element.name), {id:element.id, material:x})
            }
          })
        }
        this.isCategoryLoad.next(true);
        // if(doUnsubscribe)
        //     this.doUnsubscribe(this.removeUnsubscribe1);
      })
    }
  }
  
  isLoad():Observable<boolean>{
    return this.isCategoryLoad.asObservable();
  }

  ngOnDestroy(): void {
    if (this.removeUnsubscribe1)
      this.removeUnsubscribe1.unsubscribe();
  }
}
