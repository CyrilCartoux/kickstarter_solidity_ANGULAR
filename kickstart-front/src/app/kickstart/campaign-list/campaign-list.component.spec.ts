import { MatCardModule } from '@angular/material/card';
import { CampaignService } from 'src/app/services/campaign.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignListComponent } from './campaign-list.component';
import { from } from 'rxjs';

describe('CampaignListComponent', () => {
  let component: CampaignListComponent;
  let fixture: ComponentFixture<CampaignListComponent>;
  let service: Partial<CampaignService> = {
    getDeployedCampaigns: () => {
      return from([[{ libelle: 'test', campaignAddress: "0x1234567" }, { libelle: 'test2', campaignAddress: "0x1234567" }]]);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignListComponent], imports: [MatCardModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignListComponent],
      providers: [{ provide: CampaignService, useValue: service }]
    }).compileComponents();
    fixture = TestBed.createComponent(CampaignListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display the campaigns", () => {
    const element: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();
    const cards = element.getElementsByTagName('mat-card');
    expect(cards.length).toBe(2);
  })

});
