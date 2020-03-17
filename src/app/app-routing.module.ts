import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './shared/components/layouts/user/user.component';
import { SuperAdminComponent } from './shared/components/layouts/super-admin/super-admin.component';
import { WelcomeComponent } from './shared/components/layouts/welcome/welcome.component';
import { AuthComponent } from './shared/components/layouts/auth/auth.component';


const routes: Routes = [
  {
    path:'', component: WelcomeComponent
  },
  {
    path:'user', component: UserComponent,
    children: [
      {
        path:'',
        loadChildren: () => import('./views/user/user.module').then(m=>m.UserModule)
      }
    ]
  },
  {
    path:'admin', component: SuperAdminComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./views/super-admin/super-admin.module').then(m=>m.SuperAdminModule)
      }

    ]
  },
  {
    path:'auth', component: AuthComponent,
    children: [
      {
        path:'',
        loadChildren: () => import('./views/auth/authentication.module').then(m=>m.AuthModule)
      }
    ]
  },
  {
    path:'**', redirectTo:''  // to handel any incorrect path
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
