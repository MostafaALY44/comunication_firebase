import { Injectable } from '@angular/core';
import { Category } from '../class/category';
import { Material } from '../class/Material';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryFactoryService implements OnDestroy {

  removeUnsubscribe1
  category: Category;

  private url: string
  constructor(private firestore: AngularFirestore) {
    if (this.removeUnsubscribe1)
      this.removeUnsubscribe1.unsubscribe();
    this.category = new Category(this.url, this.firestore)

  }

  changeUrl(url: string) {
    this.category.reset();
    this.category.changeUrl(url);
    this.url = url;
    this.setCategories();
  }

  doUnsubscribe(removeUnsubscribe: Subscription[]) {
    removeUnsubscribe.forEach(element => {
      setTimeout(function () { element.unsubscribe() }, 5000);
    });
  }

  setCategories() {
    {
      let categoryNames = this.category.getAll();
      this.removeUnsubscribe1 = categoryNames.subscribe(categories => {
        let removeUnsubscribe2: Subscription[] = [];

        if (categories.length < this.category.categoriesMap.size) {
          this.category.categoriesMap.forEach((value: Material, key: string) => {
            if (!categories.find(element => element.id === key))
              this.category.categoriesMap.delete(key);
          })
        } else if (categories.length > this.category.categoriesMap.keys.length) {
          categories.forEach(element => {
            if (!this.category.categoriesMap.get(element.id)) {
              let x = new Material(this.url + '/categories/' + element.id, this.firestore);
              removeUnsubscribe2.push(x.getAll().subscribe(materials => {
                x.material = materials;
              }));
              this.doUnsubscribe(removeUnsubscribe2)
              this.category.categoriesMap.set((element.id), x)
            }
          })
        }
      })
    }
  }
  ngOnDestroy(): void {
    if (this.removeUnsubscribe1)
      this.removeUnsubscribe1.unsubscribe();
  }
}
