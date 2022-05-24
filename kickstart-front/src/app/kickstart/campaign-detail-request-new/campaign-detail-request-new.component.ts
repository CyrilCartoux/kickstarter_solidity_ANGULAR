import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from './../../services/campaign.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-campaign-detail-request-new',
  templateUrl: './campaign-detail-request-new.component.html',
  styleUrls: ['./campaign-detail-request-new.component.less'],
})
export class CampaignDetailRequestNewComponent implements OnInit, OnDestroy {
  requestForm!: FormGroup;
  address!: string;
  subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private campaignService: CampaignService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params) => {
      if (params['address']) {
        this.address = params['address'];
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initForm() {
    this.requestForm = this.formBuilder.group({
      description: ['', Validators.required],
      value: ['0', Validators.required],
      recipient: ['', Validators.required],
    });
  }
  onSendRequest() {
    this.subscription.add(this.campaignService.createRequest(
      this.address,
      this.requestForm.value.description,
      this.requestForm.value.value,
      this.requestForm.value.recipient
    ).subscribe((result)=> {
      this.campaignService.stopTxHash$.next(true);
    }))
  }
}
