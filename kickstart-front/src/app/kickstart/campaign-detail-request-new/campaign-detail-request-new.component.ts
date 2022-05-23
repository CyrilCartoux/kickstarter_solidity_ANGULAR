import { ActivatedRoute } from '@angular/router';
import { CampaignService } from './../../services/campaign.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-campaign-detail-request-new',
  templateUrl: './campaign-detail-request-new.component.html',
  styleUrls: ['./campaign-detail-request-new.component.less'],
})
export class CampaignDetailRequestNewComponent implements OnInit {
  requestForm!: FormGroup;
  address!: string;

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

  initForm() {
    this.requestForm = this.formBuilder.group({
      description: ['', Validators.required],
      value: ['0', Validators.required],
      recipient: ['', Validators.required],
    });
  }
  onSendRequest() {
    this.campaignService.createRequest(
      this.address,
      this.requestForm.value.description,
      this.requestForm.value.value,
      this.requestForm.value.recipient
    );
  }
}
