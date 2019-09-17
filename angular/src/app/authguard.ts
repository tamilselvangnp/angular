import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private auth: AuthorizationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.auth.isLoggedin()) {
            this.router.navigate(['/']);
            return false;
        } else {
            return true;
        }
    }
}