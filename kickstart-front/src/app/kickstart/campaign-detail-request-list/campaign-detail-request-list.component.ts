import { Request } from './../../models/request';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from './../../services/campaign.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-campaign-detail-request-list',
  templateUrl: './campaign-detail-request-list.component.html',
  styleUrls: ['./campaign-detail-request-list.component.less']
})
export class CampaignDetailRequestListComponent implements OnInit, AfterViewInit {
  // <!-- ID
  // Description
  // Amount
  // Recipient
  // Approval Count
  // Approve
  // Finalize -->
  address! : string;
  REQUEST_DATA: Request[] = [];
  displayedColumns: string[] = ['id', 'description', 'amount', 'recipient', 'approvalCount','approve', 'finalize']
  dataSource = new MatTableDataSource<Request>(this.REQUEST_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private router: ActivatedRoute,
    private campaignService: CampaignService
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.address = params["address"];
      this.getRequests();
    })
  }

  getRequests() {
    this.campaignService.getRequests(this.address).subscribe((requests:any) => {
      this.REQUEST_DATA = requests;
    })
  }

}
