import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../_models/User';
import { partslist } from '../_models/partslist';
import { CompanyPart } from '../_models/companypart';
import { PartsListService } from '../_services/parts-list.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';




@Component({
  selector: 'app-searchcompany',
  templateUrl: './searchcompany.component.html',
  styleUrls: ['./searchcompany.component.css']
})
export class SearchcompanyComponent implements OnInit {
  companies: User[];
  parts: partslist[];
  companyid:number;
  partid:number;
  filteredCompanies: User[];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    
  }

  /*
  filterCompanies(searchString: string)
  {
     var a =  this.companies.filter(company=> company.companyName.toLowerCase().indexOf(searchString.toLowerCase())!== -1);
     return a;
  }*/

  constructor(private partService: PartsListService, private alertify: AlertifyService,
    private route: ActivatedRoute) {}

  ngOnInit() {
      this.companies = this.route.snapshot.data['users'].result;
      this.parts = this.route.snapshot.data['parts'].result;
      this.filteredCompanies = this.companies;
     
  }
  
  initializepartdropdown() {
    var partsdropdown = (document.getElementById("partsdropdown")) as HTMLSelectElement;
    var opt = partsdropdown.options[0];
    var val =(<HTMLOptionElement>opt).value;
    this.partid = Number(val);
  }

  initializecompanydropdown() {
    var companydropdown = (document.getElementById("companydropdown")) as HTMLSelectElement;
    var opt = companydropdown.options[0];
    var val = (<HTMLOptionElement>opt).value;
    this.companyid = Number(val);
  }

  getcompanyid(event: any)
  {
    this.companyid = (event.target.value);
  }

  getpartid(event: any)
  {
    this.partid = event.target.value;
  }

  AddAssociation() {
      if (this.partid===undefined) this.initializepartdropdown();
      if (this.companyid===undefined) this.initializecompanydropdown();

      this.partService.addPartToCompany({UserId:this.companyid, OrderPartId:this.partid}).subscribe(()=>{
        this.alertify.success('Company Assigned Part');
      }, error => {
        this.alertify.error(error);
      });
  }

  RemoveAssociation() {

  }
  }
