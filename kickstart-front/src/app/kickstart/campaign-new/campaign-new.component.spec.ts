import { FormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignNewComponent } from './campaign-new.component';

describe('CampaignNewComponent', () => {
  let component: CampaignNewComponent;
  let fixture: ComponentFixture<CampaignNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignNewComponent ],schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
