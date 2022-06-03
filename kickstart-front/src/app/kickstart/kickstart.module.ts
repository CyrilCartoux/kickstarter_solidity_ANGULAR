// Services
import { CampaignService } from './../services/campaign.service';
// Components
import { CampaignNewComponent } from './campaign-new/campaign-new.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDetailComponent } from './campaign-detail/detail.component';
import { CampaignDetailRequestListComponent } from './detail-request-list/detail-request-list.component';
import { CampaignDetailRequestNewComponent } from './detail-request-new/detail-request-new.component';
import { ShowTxhashComponent } from './../show-txhash/show-txhash.component';
// Modules
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KickstartRoutingModule } from './kickstart-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    CampaignListComponent,
    CampaignNewComponent,
    CampaignDetailComponent,
    CampaignDetailRequestListComponent,
    CampaignDetailRequestNewComponent,
    ShowTxhashComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    KickstartRoutingModule,
    // Material
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  providers: [CampaignService],
})
export class KickstartModule {}
