import { routes } from './../kickstart/kickstart-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CampaignService } from './../services/campaign.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent], schemas: [CUSTOM_ELEMENTS_SCHEMA],imports: [RouterTestingModule.withRoutes(routes)]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a button if user is not connected', () => {
    component.connectedAccount = undefined;
    const element: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();
    const button = element.querySelector('button');
    expect(button).toBeTruthy();
  })
  it("should not have a button if user is logged in", () => {
    component.connectedAccount = "0x1234567abc";
    const element: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();
    const button = element.querySelector('button');
    expect(button).toBeFalsy();
  })
  it("button should call onConnectToMetamask when clicked", () => {
    const element: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();
    const button = element.querySelector('button');
    spyOn(component, 'onConnectToMetamask');
    button?.click();
    expect(component.onConnectToMetamask).toHaveBeenCalled();
  });
  it("should display the connected account", () => {
    component.connectedAccount = "0x1234567abc";
    const element: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();
    const account = element.querySelector('#account');
    expect(account?.textContent).toContain("0x1234567abc");
  })
  it("should display user balance", () => {
    component.balance = "0x1234567abc";
    component.connectedAccount = "0x1234567abc";
    const element: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();
    const balance = element.querySelector('#balance');
    expect(balance?.textContent).toContain("0x1234567abc");
  })
})
