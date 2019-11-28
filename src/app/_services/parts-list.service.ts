import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { partslist } from '../_models/partslist';
import {CompanyPart} from '../_models/companypart';
import { PaginatedResult } from '../_models/pagination';
import { map, partition } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartsListService {
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  add(part: partslist) {
    return this.http.post(this.baseUrl + 'orderpart/neworderpart', part);
  }

  addPartToCompany(companypart: CompanyPart) {
    return this.http.post(this.baseUrl + 'orderpart/newcompanypart', companypart);
  }

  getPart(id: number): Observable<partslist> {
    return this.http.get<partslist>(this.baseUrl + 'orderpart/' + id);
  }

  updatePart(id: number, part: partslist) {
    return this.http.put(this.baseUrl + 'orderpart/' + id, part);
  }

  setMainPhoto(companyId: number, partid: number) {
    return this.http.post(this.baseUrl + 'partphotos/' + companyId + '/photos/' + partid + '/setMain', {});
  }

  deletePhoto(companyId: number, partid: number) {
    return this.http.delete(this.baseUrl + 'partphotos/' + companyId + '/photos/' + partid);
  }
  
  getCompanyOrderParts(page,itemsPerPage,companyid):Observable<PaginatedResult<partslist[]>> {
    const paginatedResult: PaginatedResult<partslist[]> = new PaginatedResult<partslist[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<partslist[]>(this.baseUrl + 'OrderPart/GetCompanyOrderParts', { observe: 'response', params})
      .pipe(
        map(response => {
          
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
    }

  getOrderParts(page?, itemsPerPage?, userParams?, likesParam?, companyfilter?): Observable<PaginatedResult<partslist[]>> {
    const paginatedResult: PaginatedResult<partslist[]> = new PaginatedResult<partslist[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<partslist[]>(this.baseUrl + 'OrderPart', { observe: 'response', params})
      .pipe(
        map(response => {
          
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
    }

    changeMemberPhoto(photoUrl: string) {
      this.photoUrl.next(photoUrl);
    }

    
    }
  
