import { CampaignService } from 'src/app/services/campaign.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private campaignService: CampaignService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let account$ = new Subject<boolean>();
    this.campaignService.getAccounts().subscribe((account: string) => {
      if (account) {
        account$.next(true);
      } else {
        account$.next(false);
        this.router.navigate(['/campaign'])
      }
    });
    return account$.asObservable();
  }
}
