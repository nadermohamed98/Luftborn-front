import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterationComponent } from './Auth/registeration/registeration.component';
import { PostsComponent } from './Content/posts/posts.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterationComponent},
  {path:"posts", component:PostsComponent , canActivate:[AuthGuard]},
  {path:"**",redirectTo:'login'},
];
@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
