import {Injectable} from '@angular/core';
import {partslist} from '../_models/partslist';
import {Resolve, Router, ActivatedRouteSnapshot} from '@angular/router';
import { UserService } from '../_services/user.service';
import { PartsListService } from '../_services/parts-list.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ActivatedRoute } from '../../../node_modules/@angular/router';


@Injectable()
export class PartsListResolver implements Resolve<partslist[]> {
    pageNumber = 1;
    pageSize = 5;
    companyfilter: number;

    constructor(private partsListService: PartsListService, private router: Router,
        private alertify: AlertifyService, private aroute:ActivatedRoute) {}

    resolve(route: ActivatedRouteSnapshot): Observable<partslist[]> {
    this.aroute.paramMap.subscribe(params => {
    this.companyfilter = +params.get('id');
    }
    )

        return this.partsListService.getOrderParts(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/partslist']);
                return of(null);
            })
        );
    }
}
