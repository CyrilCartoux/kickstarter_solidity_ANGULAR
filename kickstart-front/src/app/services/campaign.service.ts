import { CampaignList } from './../models/campaign-list';
import { Injectable } from '@angular/core';
import web3 from './web3-instance';
import CampaignFactoryContract from './campaign-factory';
import Campaign from './campaign';
import { from, map, Observable, ObservableInput, switchMap, take } from 'rxjs';

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
    this.getAccounts();
  }

  public getAccounts() {
    from<string>(this.web3js.eth.getAccounts())
      .pipe(
        map((accounts) => {
          return accounts[0];
        })
      )
      .subscribe((acc) => (this.account = acc));
  }

  /**
   * CampaignFactory create a Campaign
   * @param libelle
   * @param minimumContribution
   */
  public createCampaign(libelle: string, minimumContribution: number) {
    this.CampaignFactoryContract.methods
      .createCampaign(this.web3js.utils.toWei(minimumContribution), libelle)
      .send({ from: this.account });
  }

  /**
   * Returns a list of deployed campaigns
   * @returns CampaignList[]
   */
  public async getDeployedCampaigns(): Promise<CampaignList[]> {
    const campaignsCount = await this.CampaignFactoryContract.methods
      .getDeployedCampaignsCount()
      .call();
    const campaigns = await Promise.all(
      Array(parseInt(campaignsCount))
        .fill(campaignsCount)
        .map((element, index) => {
          return this.CampaignFactoryContract.methods
            .deployedCampaigns(index)
            .call();
        })
    );
    return campaigns;
  }

  public getSummary(address: string): Observable<any> {
    this.instantiateCampaignContract(address);
    return from<ObservableInput<any>>(
      this.CampaignContract.methods.getSummary().call()
    ).pipe(
      map((summary: any) => {
        return {
          libelle: summary[0],
          minimumContribution: this.web3js.utils.fromWei(summary[1]),
          balance: this.web3js.utils.fromWei(summary[2]),
          requests: summary[3],
          approversCount: summary[4],
          manager: summary[5],
        };
      })
    );
  }

  public contribute(address:string, amount: number) {
    this.instantiateCampaignContract(address);
    this.CampaignContract.methods.contribute().send({from: this.account, value: web3.utils.toWei(amount, "ether")});
  }

  private instantiateCampaignContract(address: string) {
    this.CampaignContract = Campaign(address);
  }
}
