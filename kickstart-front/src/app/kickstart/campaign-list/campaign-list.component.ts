import { combineAll, tap } from 'rxjs';
import { CampaignList } from './../../models/campaign-list';
import { CampaignService } from './../../services/campaign.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.less'],
})
export class CampaignListComponent {
  campaignsList: CampaignList[] = [];

  constructor(private campaignService: CampaignService) {}

  deployedCampaigns$ = this.campaignService.getDeployedCampaigns();
}
