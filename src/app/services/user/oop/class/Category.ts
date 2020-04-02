import { CRUD } from '../models/CRUD';
import { CategoryService } from '../firebaseService/CategoryService';
import { CategoryModel } from '../models/CategoryModel';
import { AngularFirestore } from '@angular/fire/firestore';
import { Material } from './Material';

export class Category implements CRUD {
    categoriesMap = new Map<string, Material>();

    //materials: Material;

    private categoryService: CategoryService = new CategoryService(this.firestore);

    constructor(
        private url: string,
        private firestore: AngularFirestore) {
            //this.materials = new Material(url,this.firestore);
        }

    changeUrl(url: string) {
        this.url = url + "/categories/";
    }

    // currentCategoryId:string="";
	// getAllMaterials(categoryId:string):Observable<MaterialModel[]>{
	// 	this.currentCategoryId=categoryId;
	// 	this.materials.setIdCourse(postId);
	// 	return this.comment.comments;
	// }

    reset() {
        this.categoriesMap.clear();
    }

    getAll() {
        return this.categoryService.getAll(this.url);
    }

    //CRUD///////////////////////////////////
    create(category: CategoryModel) {
        return this.categoryService.create(this.url, category)
    }
    read(categoryId: string) {
        return this.categoryService.read(this.url, categoryId);
    }
    update(id: string, category: CategoryModel) {
        return this.categoryService.update(this.url, id, category)
    }
    delete(id: string) {
        return this.categoryService.delete(this.url, id);
    }
    //////////////////////////////////////////

    ngOnDestroy(): void {

    }
}