import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { GlobalAnnouncementsComponent } from './global-announcements/global-announcements.component';
import { LocalAnnouncementsComponent } from './local-announcements/local-announcements.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
  {
    path: '', component: AnnouncementsComponent,
    children: [
      { path:'local', component:LocalAnnouncementsComponent, canActivate:[AuthGuard]},
      { path:'global', component:GlobalAnnouncementsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
