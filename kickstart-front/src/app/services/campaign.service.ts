import { Injectable } from '@angular/core';
import web3 from './web3-instance';
import CampaignFactoryContract from './campaign-factory';
import Campaign from '../../contracts/Campaign.json';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private web3js: any;
  CampaignFactoryContract: any;
  CampaignContract: any;
  account!: string;

  constructor() {
    this.web3js = web3;
    this.CampaignFactoryContract = CampaignFactoryContract;
    this.CampaignContract = Campaign;
    this.getAccounts();
  }

  public getAccounts(){
    from<string>(this.web3js.eth.getAccounts()).pipe(
      map((accounts) => {
        return accounts[0];
      })
    )
    .subscribe(acc => this.account = acc);
  }

  /**
   * CampaignFactory create a Campaign
   * @param libelle
   * @param minimumContribution
   */
  public createCampaign(libelle: string, minimumContribution: number) {
    this.CampaignFactoryContract.methods.createCampaign(
      this.web3js.utils.toWei(minimumContribution),
      libelle
    ).send({from: this.account});
  }
}
