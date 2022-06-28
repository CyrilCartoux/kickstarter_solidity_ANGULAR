import { MatTableModule } from '@angular/material/table';
import { routes } from './../kickstart-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CampaignDetailRequestListComponent } from './detail-request-list.component';

describe('CampaignDetailRequestListComponent', () => {
  let component: CampaignDetailRequestListComponent;
  let fixture: ComponentFixture<CampaignDetailRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignDetailRequestListComponent ],
      imports: [RouterTestingModule.withRoutes(routes), MatTableModule ],schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
