import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDetailRequestListComponent } from './detail-request-list.component';

describe('CampaignDetailRequestListComponent', () => {
  let component: CampaignDetailRequestListComponent;
  let fixture: ComponentFixture<CampaignDetailRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDetailRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDetailRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
