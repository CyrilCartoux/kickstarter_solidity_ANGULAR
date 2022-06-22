import { AuthGuard } from '../guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignNewComponent } from './campaign-new/campaign-new.component';
import { CampaignDetailComponent } from './campaign-detail/detail.component';
import { CampaignDetailRequestNewComponent } from './detail-request-new/detail-request-new.component';
import { CampaignDetailRequestListComponent } from './detail-request-list/detail-request-list.component';

export const routes: Routes = [
  {
    path: '',
    component: CampaignListComponent,
  },
  {
    path: 'new',
    component: CampaignNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'detail/:address',
    children: [
      { path: '', component: CampaignDetailComponent },
      { path: 'requests', component: CampaignDetailRequestListComponent },
      { path: 'requests/new', component: CampaignDetailRequestNewComponent },
    ],
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KickstartRoutingModule { }
