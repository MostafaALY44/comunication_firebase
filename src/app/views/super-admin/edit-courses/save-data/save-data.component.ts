import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseFirebaseService } from 'src/app/services/user/oop/firebaseService/course-firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-save-data',
  templateUrl: './save-data.component.html',
  styleUrls: ['./save-data.component.css']
})
export class SaveDataComponent implements OnInit, OnDestroy {

  allCourses:Map<string, boolean>=new Map<string, boolean>();
  editData:Map<string, string>= new Map<string,string>();
  removeSubscribe:Subscription;
  constructor( private dialogRef: MatDialogRef<SaveDataComponent>,
    private courseFirebaseService:CourseFirebaseService,
     @Inject(MAT_DIALOG_DATA) public data:{link:string,courses:string[]},private _snackBar: MatSnackBar) { 
      this.removeSubscribe= this.courseFirebaseService.getAllCodesAsMap(this.data.link)
      .subscribe(courses=> this.allCourses=courses)
    console.log(data.courses.length)
  }
  ngOnDestroy(): void {
    if(this.removeSubscribe)
      this.removeSubscribe.unsubscribe();
  }

  changeCode:string=""
  currentCode:string="";
  changeCurrentCodeState(code:string){
    this.currentCode=code;
    this.changeCode=this.currentCode;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      try {
        document.getElementById('!'+code+'!').focus();
      } catch (error) {
        
      }
    },50); 
    
  }
  closeDialog(isSendToDB:boolean){
    this.dialogRef.close({data:{"editData":this.editData, "isSendToDB":isSendToDB}});
  }

  isCodeExist(index){
    return index==this.codeExistId;
  }

  codeExistId:number=-1;
  reset(i:number){
    this.codeExistId=-1;
    if(this.changeCode==""){
      this.editData.set(this.data.courses[i], "");
      this.data.courses.splice(i,1)
    }else{
      if(this.allCourses.has(this.changeCode)){
        this.codeExistId=i;
      }
      else if(!this.data.courses.find(element=> element===this.changeCode)){
        this.editData.set(this.data.courses[i], this.changeCode.trim().toUpperCase());
        this.data.courses[i]=this.changeCode.trim().toUpperCase();
      }
    }
      
 
    this.currentCode=this.changeCode=''
  }
  canEdit(code:string):boolean{
    return this.currentCode === code
  }

  showSpinner:boolean=false;
  onSubmit(){
    this.showSpinner=true;
    this.data.courses.forEach(elemet=>{
      this.courseFirebaseService.create(this.data.link,elemet).then(x=>{
        this.showSpinner=false;
        this._snackBar.open(elemet, 'Added Successfully', { duration: 3000, });
      })
    })
  }
  ngOnInit() {
  }

}
