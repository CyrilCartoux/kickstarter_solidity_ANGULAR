import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDetailRequestNewComponent } from './detail-request-new.component';

describe('CampaignDetailRequestNewComponent', () => {
  let component: CampaignDetailRequestNewComponent;
  let fixture: ComponentFixture<CampaignDetailRequestNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDetailRequestNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDetailRequestNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
