import { CampaignService } from './../../services/campaign.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.less'],
})
export class CampaignListComponent {

  constructor(private campaignService: CampaignService) { }

  deployedCampaigns$ = this.campaignService.getDeployedCampaigns();
}
