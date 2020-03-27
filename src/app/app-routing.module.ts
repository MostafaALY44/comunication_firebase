import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, UrlSegment } from '@angular/router';
import { UserComponent } from './shared/components/layouts/user/user.component';
import { SuperAdminComponent } from './shared/components/layouts/super-admin/super-admin.component';
import { WelcomeComponent } from './shared/components/layouts/welcome/welcome.component';
import { AuthComponent } from './shared/components/layouts/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { AnnouncementNaveComponent } from './shared/components/layouts/announcement-nave/announcement-nave.component';
import { InverseAuthGuard } from './guards/inverse-auth.guard';


const routes: Routes = [
  {
    path:'', component: AnnouncementNaveComponent,
    children:[
      {path:'', component: WelcomeComponent},
      {
        path:'announcements', 
        children:[
          {
            path:'',
            loadChildren: () => import('./views/pages/pages.module').then(m=>m.PagesModule)
          }
        ]
    },
    ]
  },
  {
    path:'user', component: UserComponent,
    loadChildren: () => import('./views/user/user.module').then(m=>m.UserModule),
    //canLoad: [AuthGuard],
    //canActivateChild:[AuthGuard]
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
    loadChildren: () => import('./views/auth/authentication.module').then(m=>m.AuthModule),
    canActivateChild:[InverseAuthGuard]
  },
  {
    path:'**', redirectTo:''  // to handel any incorrect path
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  /*providers: [{
    provide: 'AuthGuard',
    useValue: (route: Route, segments: UrlSegment[]) => true
  }]*/
})
export class AppRoutingModule { }
