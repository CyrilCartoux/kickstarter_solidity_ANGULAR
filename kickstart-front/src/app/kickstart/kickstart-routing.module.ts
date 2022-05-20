import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { CampaignNewComponent } from './campaign-new/campaign-new.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignListComponent } from './campaign-list/campaign-list.component';

const routes: Routes = [
  {
    path:'', component: CampaignListComponent
  },
  {
    path: 'new',
    component: CampaignNewComponent,
  },
  {
    path: 'detail/:address', component: CampaignDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KickstartRoutingModule {}
