import { CampaignDetail } from './../../models/campaign-detail';
import { CampaignService } from './../../services/campaign.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
})
export class CampaignDetailComponent implements OnInit, OnDestroy {
  address!: string;
  campaignDetail$!: Observable<CampaignDetail>;
  subscriptions: Subscription = new Subscription();
  amountToContribute!: number;

  constructor(
    private route: ActivatedRoute,
    private campaignService: CampaignService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['address']) {
        this.address = params['address'];
        this.campaignDetail$ = this.campaignService.getSummary(this.address);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onContribute() {
    this.subscriptions.add(
      this.campaignService
        .contribute(this.address, this.amountToContribute)
        .subscribe((result) => {
          this.campaignService.stopTxHash$.next(true);
        })
    );
  }
}
