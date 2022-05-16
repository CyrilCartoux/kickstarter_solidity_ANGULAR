import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KickstartRoutingModule } from './kickstart-routing.module';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';


@NgModule({
  declarations: [
    NewCampaignComponent
  ],
  imports: [
    CommonModule,
    KickstartRoutingModule
  ]
})
export class KickstartModule { }
