import { Component, OnInit } from '@angular/core';
import { partslist } from '../../_models/partslist';
import { PartsListService } from '../../_services/parts-list.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { VariableAst } from '@angular/compiler';

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.css']
})
export class PartsListComponent implements OnInit {
  companyfilter: number;
  partslist: partslist[];
  pagination: Pagination;
  constructor(private partListService: PartsListService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.route.data.subscribe(data => {
        this.partslist = data['partslist'].result;
        this.pagination = data['partslist'].pagination;
      });

      this.route.paramMap.subscribe(params => {
        this.companyfilter = +params.get('id');
      })

  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadParts();
  }


  loadParts() {
    this.partListService.getOrderParts(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<partslist[]>) => {
        this.partslist = res.result;
        this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
}
