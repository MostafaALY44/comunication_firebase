import { Injectable } from '@angular/core';
import { Category } from './category';
import { Material } from './Material';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { MaterialModel } from '../models/MaterialModel.model';
import { CategoryService } from '../firebaseService/CategoryService';
import { MaterialService } from '../firebaseService/MaterialService';

@Injectable({
  providedIn: 'root'
})
export class CategoryFactoryService implements OnDestroy{

  removeUnsubscribe1
  //private allMaterials: BehaviorSubject<Category[]>=new BehaviorSubject([]);
  category: Category;
  
  private url:string
  constructor( private firestore: AngularFirestore){
      if(this.removeUnsubscribe1)  
          this.removeUnsubscribe1.unsubscribe();
    this.category=new Category(this.url, this.firestore)

  }

  

  changeUrl(url:string){
    this.category.reset();
    this.category.changeUrl(url);
     this.url=url;
     this.setCategories();
   }

   doUnsubscribe(removeUnsubscribe:Subscription[]){
    removeUnsubscribe.forEach(element => {
      setTimeout(function(){element.unsubscribe()},5000);
     });
   }

   setCategories(){
    {
      let categoryNames=this.category.getAll();
     this.removeUnsubscribe1=categoryNames.subscribe(categories=>{
              let removeUnsubscribe2:Subscription[]=[];
 
              if(categories.length < this.category.categoriesMap.size){
                  this.category.categoriesMap.forEach((value: Material, key: string) =>{
                      if(!categories.find(element => element.id === key))
                          this.category.categoriesMap.delete(key);
                  })
              }else if(categories.length > this.category.categoriesMap.keys.length){
              categories.forEach(element=>{
                  if(!this.category.categoriesMap.get(element.id)){    
                      //console.log("url for material "+this.url+'/categories/'+category.id);
                      let x = new Material(this.url+'/categories/'+element.id, this.firestore);
                      removeUnsubscribe2.push(x.getAll().subscribe(materials=>{
                      //console.log("sssssssssssssssssssssssss "+category.id)
                      //console.log(materials);
                      //x.allMaterials.next(materials) 
                      x.material=materials;
                      }));
                      this.doUnsubscribe(removeUnsubscribe2)
                      //x.material = x.allMaterials.asObservable();
                      this.category.categoriesMap.set((element.id), x)   }})
              } 
          })
      }
   }

  //  setCategories(){
  //   let categoryNames=this.category.getAll();
  //   this.removeUnsubscribe1=categoryNames.subscribe(categories=>{
  //     let removeUnsubscribe2:Subscription[]=[];
  //     categories.forEach(category=>{
  //       //console.log("url for material "+this.url+'/categories/'+category.id);
  //       let x = new Material(this.url+'/categories/'+category.id, this.firestore);
  //       removeUnsubscribe2.push(x.getAll().subscribe(materials=>{
  //         //console.log("sssssssssssssssssssssssss "+category.id)
  //         //console.log(materials);
  //         x.allMaterials.next(materials) 
  //       }));
  //       this.doUnsubscribe(removeUnsubscribe2)
  //       x.material = x.allMaterials.asObservable();
  //       this.category.categoriesMap.set((category.id), x)
  //       this.category.categoriesMap.forEach((value: Material, key: string) => {
  //         /*value.material.subscribe(x=>
  //            console.log(x)
  //         )*/
  //         //console.log(key, value);
  //       });
  //     })
  //     /*if(removeUnsubscribe2)
  //       removeUnsubscribe2.unsubscribe();*/
     
  //   } )
  //  }

  ngOnDestroy(): void { 
      if(this.removeUnsubscribe1)  
          this.removeUnsubscribe1.unsubscribe();
      /*if(this.removeUnsubscribe2)  
          this.removeUnsubscribe2.unsubscribe();*/
  }

  
  /*flag:boolean=false; 
  getCategories(url?:string): Observable<Category[]>{
      let categoryNames=this.categoryService.getAll(this.url).pipe(map(action=>action.map(category=>category.id)))
      
      if(this.removeUnsubscribe1)  
          this.removeUnsubscribe1.unsubscribe();

      this.removeUnsubscribe1= categoryNames.subscribe( categoryName=>{
          this.flag =false; 
           categoryName.forEach(element=>{
            if(!(this.categoriesTemp.find(x=> x.name===element))){
              this.flag=true;  
              let x=new Category(this.url, element, this.firestore)
              x.materials=this.getMaterials(element);
              this.categoriesTemp.push(x)
              }
           })
           if(this.flag){
              this.flag =false;
              this.allCategories.next(this.categoriesTemp);}
         })
      this.categories=this.allCategories.asObservable();
     return this.categories;
  }

  
  getMaterials(id:string):Observable<Material[]>{
    //console.log(this.url+'/categories/'+id+'/materials/');
  let  materialsTemp :Material[]=[];
  let materialsBehavior: BehaviorSubject<Material[]>=new BehaviorSubject([]);
  let flag:boolean=false
      this.removeUnsubscribe2=this.materialService.getAll(this.url+id+'/materials/').subscribe(
          materials=>{ 
            flag=false;
            materials.forEach(material=>{
            if(!(materialsTemp.find(x=> x.material.id===material.id))){
                materialsTemp.push(new Material(this.url, this.firestore, material))
                flag=true;
              }
             })
             if(flag)
               materialsBehavior.next(materialsTemp);
            })
          //if(materialsTemp[0])
          //console.log(materialsTemp.length)
      
      return materialsBehavior.asObservable();
  }*/
}
