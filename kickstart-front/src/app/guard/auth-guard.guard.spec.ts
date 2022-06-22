import { CampaignService } from 'src/app/services/campaign.service';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from '../kickstart/kickstart-routing.module';

describe('AuthGuardGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let location: Location;
  let service: Partial<CampaignService> = {
    getAccounts: () => of('0x039483d2dr9')
  };

  let errorService = { ...service };
  errorService.getAccounts = () => of('');
  describe("using correct service", () => {
    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [RouterTestingModule.withRoutes(routes)], providers: [{ provide: CampaignService, useValue: service }] });
      guard = TestBed.inject(AuthGuard);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });
    it("should let the user navigate if user is connected", () => {
      router.navigate(['/detail/0x1234567abc']).then(() => {
        expect(location.path()).toBe('/detail/0x1234567abc');
      })
    })
  })


  describe("using fakeErrorService", () => {

    beforeEach(() => {
      TestBed.configureTestingModule({ imports: [RouterTestingModule], providers: [{ provide: CampaignService, useValue: errorService }] });
      guard = TestBed.inject(AuthGuard);
      router = TestBed.inject(Router);
      location = TestBed.inject(Location);
    });

    it("should be created", () => {
      expect(guard).toBeTruthy();
    })

    it("should redirect user if user is not connected", () => {
      router.navigate(['/detail/0x1234567abc']).then(() => {
        expect(location.path()).toBe('/');
      });
    })
  });
});