import { CampaignService } from './../../services/campaign.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-new',
  templateUrl: './campaign-new.component.html',
  styleUrls: ['./campaign-new.component.less']
})
export class CampaignNewComponent implements OnInit {
  
  libelle: string = '';
  minimumContribution: number = 0;

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnInit(): void {
  }

  onCreateNewCampaign() {
    this.campaignService.createCampaign(this.libelle, this.minimumContribution);
  }
}
