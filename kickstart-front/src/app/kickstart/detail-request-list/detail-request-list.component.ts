import { Subscription, Subject } from 'rxjs';
import { Request } from '../../models/request';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from '../../services/campaign.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {web3} from 'src/app/services/web3-instance';
import Web3 from 'web3';

@Component({
  selector: 'app-campaign-detail-request-list',
  templateUrl: './detail-request-list.component.html',
  styleUrls: ['./detail-request-list.component.less'],
})
export class CampaignDetailRequestListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public web3js!: Web3;
  public approversCount!: number;
  public manager!: string;
  public connectedAccount!: string;
  public isApprover = false;
  subscription: Subscription = new Subscription();
  address!: string;
  REQUEST_DATA: Request[] = [];
  displayedColumns: string[] = [
    'index',
    'description',
    'value',
    'recipient',
    'approvalCount',
    'approve',
    'finalize',
    'complete',
  ];
  dataSource!: MatTableDataSource<Request>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: ActivatedRoute,
    private campaignService: CampaignService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.subscription.add(
      this.router.params.subscribe((params) => {
        this.address = params['address'];
        this.web3js = web3;
        this.getApproversCount();
        this.getRequests();
      })
    );
    this.subscription.add(
      this.campaignService.getManager(this.address).subscribe((account) => {
        this.manager = account;
      })
    );
    this.subscription.add(
      this.campaignService.getAccounts().subscribe((acc) => {
        this.connectedAccount = acc;
        this.isAnApprover(this.connectedAccount);
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getApproversCount() {
    this.campaignService.getApproversCount(this.address).subscribe((count) => {
      this.approversCount = +count;
    });
  }

  getRequests() {
    this.campaignService
      .getRequests(this.address)
      .subscribe((requests: any) => {
        this.REQUEST_DATA = requests;
        this.dataSource = new MatTableDataSource<Request>(this.REQUEST_DATA);
      });
  }

  onApprove(element: Request, index: number) {
    this.subscription.add(
      this.campaignService
        .approveRequest(this.address, index)
        .subscribe((result) => {
          this.campaignService.stopTxHash$.next(true);
        })
    );
  }
  onFinalize(element: Request, index: number) {
    this.subscription.add(
      this.campaignService
        .finalizeRequest(this.address, index)
        .subscribe((result) => {
          this.campaignService.stopTxHash$.next(true);
        })
    );
  }

  hasEnoughApprovals(element: Request): boolean {
    return +element.approvalCount > this.approversCount / 2;
  }

  isAnApprover(userAddress: string) {
    this.subscription.add(
      this.campaignService
        .isAnApprover(this.address, userAddress)
        .subscribe((result: boolean) => {
          this.isApprover = result;
        })
    );
  }
}
