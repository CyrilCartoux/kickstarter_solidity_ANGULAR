import { Subscription } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { Component, OnInit } from '@angular/core';
import { connectAccount } from '../services/web3-instance';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
  subscription: Subscription = new Subscription();
  connectedAccount!: string;
  balance!: string;
  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.subscription.add(
      this.campaignService.getAccounts().subscribe((acc) => {
        if(acc) {
          this.connectedAccount = acc.slice(0,6).concat('...').concat(acc.slice(-5));
          this.campaignService
            .getBalanceOfAddress(acc)
            .subscribe((bal) => (this.balance = bal.slice(0,6)));
        }
      })
    );
  }
  onConnectToMetamask() {
    connectAccount();
  }

}
