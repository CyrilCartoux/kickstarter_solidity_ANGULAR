import { routes } from './../kickstart-routing.module';
import { FormsModule } from '@angular/forms';
import { ShowTxhashComponent } from './../../show-txhash/show-txhash.component';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CampaignDetailComponent } from './detail.component';
import { CampaignService } from 'src/app/services/campaign.service';
import { ActivatedRoute } from '@angular/router';

import { from, of } from "rxjs";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CampaignDetailComponent', () => {
  let component: CampaignDetailComponent;
  let fixture: ComponentFixture<CampaignDetailComponent>;
  let campaignService: CampaignService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampaignDetailComponent, ShowTxhashComponent],
      imports: [RouterTestingModule.withRoutes(routes), FormsModule], providers: [CampaignService, {
        provide: ActivatedRoute, useValue: {
          params: of({ address: '0x123' })
        }
      }],schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDetailComponent);
    component = fixture.componentInstance;
    campaignService = TestBed.inject(CampaignService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get the address in the url and call campaignDetail', fakeAsync(() => {
    const spy = spyOn(campaignService, 'getSummary').and.returnValue(of({
      libelle: "test",
      minimumContribution: 150000000000,
      balance: 150000000000,
      requests: {},
      approversCount: 4,
      manager: "0x123",
    }));
    component.ngOnInit()
    fixture.detectChanges()
    expect(component.address).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  }));
  it("should display 5 mat-card", fakeAsync(() => {
    const spy = spyOn(campaignService, 'getSummary').and.returnValue(of({
      libelle: "test",
      minimumContribution: 150000000000,
      balance: 150000000000,
      requests: {},
      approversCount: 4,
      manager: "0x123",
    }));
    component.ngOnInit()
    fixture.detectChanges()
    let element: HTMLElement = fixture.nativeElement;
    const cards = element.querySelectorAll("mat-card");
    expect(cards.length).toBe(5);
  }));
});
