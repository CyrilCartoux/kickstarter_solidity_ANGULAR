import { Subscription } from 'rxjs';
import { CampaignService } from './../../services/campaign.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-new',
  templateUrl: './campaign-new.component.html',
  styleUrls: ['./campaign-new.component.less'],
})
export class CampaignNewComponent implements OnInit {
  libelle: string = '';
  minimumContribution: number = 0;
  subscription: Subscription = new Subscription();

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {}

  onCreateNewCampaign() {
    this.subscription.add(
      this.campaignService
        .createCampaign(this.libelle, this.minimumContribution)
        .subscribe((result) => {
          this.campaignService.stopTxHash$.next(true);
        })
    );
  }
}
