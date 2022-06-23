import { Request } from './../models/request';
import { web3 } from 'src/app/services/web3-instance';
import { Injectable } from '@angular/core';
import CampaignFactoryContract from './campaign-factory';
import Campaign from './campaign';
import {
  BehaviorSubject,
  from,
  map,
  Observable,
  ObservableInput,
  switchMap,
  forkJoin,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  private web3js: any;
  CampaignFactoryContract: any;
  CampaignContract: any;
  account!: string;

  private txHash: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public txHash$ = this.txHash.asObservable();

  private stopTxHash: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public get stopTxHash$() {
    return this.stopTxHash;
  }

  constructor() {
    this.web3js = web3;
    this.CampaignFactoryContract = CampaignFactoryContract;
    this.getAccounts().subscribe((acc) => (this.account = acc));
  }

  public getAccounts() {
    return from<string>(this.web3js.eth.getAccounts()).pipe(
      map((accounts) => {
        return accounts[0];
      })
    );
  }

  /**
   * CampaignFactory create a Campaign
   * @param libelle
   * @param minimumContribution
   */
  public createCampaign(
    libelle: string,
    minimumContribution: number
  ): Observable<any> {
    return from(
      this.CampaignFactoryContract.methods
        .createCampaign(this.web3js.utils.toWei(minimumContribution), libelle)
        .send({ from: this.account })
        .on('transactionHash', (hash: string) => {
          this.txHash.next(hash);
        })
    );
  }

  /**
   * Returns a list of deployed campaigns
   * @returns CampaignList[]
   */
  public getDeployedCampaigns(): Observable<any> {
    let result$ = from(
      this.CampaignFactoryContract.methods.getDeployedCampaignsCount().call()
    ).pipe(
      map((count: any) => Array(parseInt(count)).fill(null)),
      switchMap((count: any[]) => {
        return forkJoin(
          [count.map((c, i) =>
            this.CampaignFactoryContract.methods.deployedCampaigns(i).call()
          ) as unknown as string[]]
        );
      })
    );
    return result$;
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

  public contribute(address: string, amount: number): Observable<any> {
    this.instantiateCampaignContract(address);
    return from(
      this.CampaignContract.methods
        .contribute()
        .send({ from: this.account, value: web3.utils.toWei(amount, 'ether') })
        .on('transactionHash', (hash: string) => {
          this.txHash.next(hash);
        })
    );
  }

  public getRequestsCount(address: string): Observable<any> {
    this.instantiateCampaignContract(address);
    return from<any>(
      this.CampaignContract.methods
        .getRequestsCount()
        .call({ from: this.account })
    );
  }
  public getApproversCount(address: string): Observable<string> {
    this.instantiateCampaignContract(address);
    return from<string>(
      this.CampaignContract.methods
        .approversCount()
        .call({ from: this.account })
    );
  }

  public getRequests(address: string): Observable<Request[]> {
    return this.getRequestsCount(address).pipe(
      map((count: any) => Array(parseInt(count)).fill(null)),
      switchMap((count: any[]) => {
        return forkJoin(
          [(count.map((c, i) => this.CampaignContract.methods.requests(i).call()) as unknown as Request[])]
        );
      })
    );
  }

  public createRequest(
    address: string,
    description: string,
    value: number,
    recipient: string
  ): Observable<any> {
    this.instantiateCampaignContract(address);
    return from(
      this.CampaignContract.methods
        .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
        .send({ from: this.account })
        .on('transactionHash', (hash: string) => {
          this.txHash.next(hash);
        })
    );
  }

  public approveRequest(address: string, requestId: number): Observable<any> {
    this.instantiateCampaignContract(address);
    return from(
      this.CampaignContract.methods
        .approveRequest(requestId)
        .send({ from: this.account })
        .on('transactionHash', (hash: string) => {
          this.txHash.next(hash);
        })
    );
  }

  public finalizeRequest(address: string, requestId: number): Observable<any> {
    this.instantiateCampaignContract(address);
    return from(
      this.CampaignContract.methods
        .finalizeRequest(requestId)
        .send({ from: this.account })
        .on('transactionHash', (hash: string) => {
          this.txHash.next(hash);
        })
    );
  }

  public getManager(address: string): Observable<string> {
    this.instantiateCampaignContract(address);
    return from<string>(this.CampaignContract.methods.manager().call());
  }

  private instantiateCampaignContract(address: string) {
    this.CampaignContract = Campaign(address);
  }
  public getBalanceOfAddress(address: string): Observable<string> {
    return from<string>(this.web3js.eth.getBalance(address)).pipe(
      map((bal) => {
        return this.web3js.utils.fromWei(bal);
      })
    );
  }
  public isAnApprover(
    campaignAddress: string,
    userAddress: string
  ): Observable<any> {
    this.instantiateCampaignContract(campaignAddress);
    return from<any>(
      this.CampaignContract.methods.approvers(userAddress).call()
    );
  }
}
