import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor(private _AuthService: AuthService,private _ContentService:ContentService, private _Router: Router) { }
AddPostForm:FormGroup=new FormGroup({
  title:new FormControl("",Validators.required),
  description:new FormControl("",Validators.required)
})
  ngOnInit(): void {
    this.getAllPosts()
  }
logOut(){
this._AuthService.logOut();
this._Router.navigate(['/login'])
}
Posts:any;
getAllPosts(){
  this._ContentService.getAllPosts().subscribe((res:any)=>{
    console.log(res);
    this.Posts=res.posts
  })
}
AddNewPost(form:any){
  this._ContentService.AddNew({title:form.value.title,description:form.value.description}).subscribe(res=>{
    console.log(res);
    window.location.reload()
  })
}
isUpdateMode = false;
UpdatePost(postId:number,form:any){
  this.isUpdateMode=true
  this._ContentService.Update(postId,{title:form.value.title,description:form.value.description}).subscribe(res=>{
    console.log(res);
    this.isUpdateMode=false
    window.location.reload()
  })
}
postid:any;
getByID(postId:any,form:FormGroup){
  this._ContentService.GetPostById(postId).subscribe((postDetails: any) => {
    // Set form values with the details of the post
    console.log(postDetails);
    
    form.patchValue({
      title: postDetails.post.title,
      description: postDetails.post.description,
      // Add other form controls as needed
    });
    this.isUpdateMode=true
    this.postid=postDetails.post.id;
  
  });
}
DeletePost(postId:number){
  this._ContentService.Delete(postId).subscribe(res=>{
    if(res){
      window.location.reload()
    }
  })
}
}
