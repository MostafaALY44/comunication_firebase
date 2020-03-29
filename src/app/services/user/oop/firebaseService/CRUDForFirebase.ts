import { Model } from '../models/model';


export interface CRUDForfirebase{
    create(url:string, object:Model);
	read(url:string, id:string);
	update(url:string, id:string, object:Model);
	delete(url:string, id:string);

}