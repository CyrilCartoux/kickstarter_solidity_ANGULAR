// Services
import { CampaignService } from './../services/campaign.service';
// Components
import { CampaignNewComponent } from './campaign-new/campaign-new.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDetailComponent } from './campaign-detail/campaign-detail.component';
import { CampaignDetailRequestListComponent } from './campaign-detail-request-list/campaign-detail-request-list.component';
import { CampaignDetailRequestNewComponent } from './campaign-detail-request-new/campaign-detail-request-new.component';
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
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [CampaignListComponent, CampaignNewComponent, CampaignDetailComponent, CampaignDetailRequestListComponent, CampaignDetailRequestNewComponent],
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
    MatPaginatorModule
  ],
  providers: [CampaignService],
})
export class KickstartModule {}
