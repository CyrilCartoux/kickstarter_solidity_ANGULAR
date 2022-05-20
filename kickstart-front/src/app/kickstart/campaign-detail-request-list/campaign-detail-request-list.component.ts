import { ActivatedRoute } from '@angular/router';
import { CampaignService } from './../../services/campaign.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-detail-request-list',
  templateUrl: './campaign-detail-request-list.component.html',
  styleUrls: ['./campaign-detail-request-list.component.less']
})
export class CampaignDetailRequestListComponent implements OnInit {

  address! : string;

  constructor(
    private router: ActivatedRoute,
    private campaignService: CampaignService
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.address = params["address"];
      this.getRequests();
    })
  }

  getRequests() {
    this.campaignService.getRequests(this.address);
  }

}
