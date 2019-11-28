import {Injectable} from '@angular/core';
import {partslist} from '../_models/partslist';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PartsListService } from '../_services/parts-list.service';

@Injectable()
export class PartsDetailResolver implements Resolve<partslist> {
    constructor(private partService: PartsListService, private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<partslist> {
        return this.partService.getPart(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/partslist']);
                return of(null);
            })
        );
    }
}
