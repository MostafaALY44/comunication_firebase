import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route, UrlSegment } from '@angular/router';
import { UserComponent } from './shared/components/layouts/user/user.component';
import { SuperAdminComponent } from './shared/components/layouts/super-admin/super-admin.component';
import { WelcomeComponent } from './shared/components/layouts/welcome/welcome.component';
import { AuthComponent } from './shared/components/layouts/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { AnnouncementNaveComponent } from './shared/components/layouts/announcement-nave/announcement-nave.component';
import { InverseAuthGuard } from './guards/inverse-auth.guard';

import {AngularFireAuthGuard, canActivate, redirectLoggedInTo,
   redirectUnauthorizedTo, emailVerified, AuthPipe, AuthPipeGenerator, customClaims} from '@angular/fire/auth-guard'
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { NotFoundPageComponent } from './views/not-found/not-found-page/not-found-page.component';
import { ContactUsComponent } from './shared/components/layouts/contact-us/contact-us.component';
import { AboutComponent } from './shared/components/layouts/about/about.component';

//const xyz = (next, state) => map(user => user.emailVerified?['/user'] : ['auth/login'])
const x:AuthPipe = map(user=>{if(!user.emailVerified)  return ['auth/login']}) 
const redirect =()=> {if(emailVerified) return x; else return ['auth/user']}
//const x= ()=>emailVerified =(user=>)
//const redirectUnauthorizedToLogin :AuthPipeGenerator=()=>redirectUnauthorizedTo()
const editorOnly = () => pipe(customClaims, map(claims => claims.emailVerified));
//const x =(y)=>emailVerified
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(  ['/auth/login']);
const redirectAuthorizedToLogin = () => redirectLoggedInTo(  ['/user']);
//const redirectToProfileEditOrLogin = () => map(user => user.emailVerified ? [] : ['login']);



const routes: Routes = [ 
  {
    path:'', component: AnnouncementNaveComponent,
    children:[
      {path:'', component: WelcomeComponent},
      {path:'contact-us', component:ContactUsComponent},

      {path:'about', component:AboutComponent},
     
      {
        path:'announcements', 
        children:[
          {
            path:'',
            loadChildren: () => import('./views/pages/pages.module').then(m=>m.PagesModule),
          }
        ]
    },
    ]
  },
  {
    path:'user', component: UserComponent,
    children:[
      
      {
        path:'',
        loadChildren: () => import('./views/user/user.module').then(m=>m.UserModule),
       // ...canActivate(()=>emailVerified)
      }
    ],
    //canActivate:[AngularFireAuthGuard]
    canActivateChild: [AuthGuard]
    //...canActivate([redirectUnauthorizedToLogin])
    //...canActivate(()=>x)
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
    path:'page-not-found', component:NotFoundPageComponent 
  },
  {
    path:'**', component:NotFoundPageComponent  // to handel any incorrect path
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
