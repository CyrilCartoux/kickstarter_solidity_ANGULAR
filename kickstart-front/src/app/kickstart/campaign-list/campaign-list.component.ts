import { CampaignList } from './../../models/campaign-list';
import { CampaignService } from './../../services/campaign.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.less'],
})
export class CampaignListComponent implements OnInit {
  campaignsList: CampaignList[] = [];

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.getDeployedCampaigns();
  }

  async getDeployedCampaigns() {
    this.campaignsList = await this.campaignService.getDeployedCampaigns();
  }
}
