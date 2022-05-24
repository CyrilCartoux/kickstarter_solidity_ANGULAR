import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'app-show-txhash',
  templateUrl: './show-txhash.component.html',
  styleUrls: ['./show-txhash.component.less']
})
export class ShowTxhashComponent implements OnInit, OnDestroy {

  txHash!: string;
  subscription: Subscription = new Subscription();

  constructor(
    private campaignService: CampaignService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(this.campaignService.txHash$.subscribe((hash: string) => {
      this.txHash = hash;
    }))
    this.subscription.add(this.campaignService.stopTxHash$.subscribe((bool) => {
      if(bool) {
        this.txHash = '';
      }
    }));
  }

}
