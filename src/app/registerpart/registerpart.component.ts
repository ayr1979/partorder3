import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PartsListService } from '../_services/parts-list.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { partslist } from '../_models/partslist';

@Component({
  selector: 'app-registerpart',
  templateUrl: './registerpart.component.html',
  styleUrls: ['./registerpart.component.css']
})
export class RegisterPartComponent implements OnInit {
  registerForm: FormGroup;
  part: partslist;

  constructor(private partsService: PartsListService, private router: Router,
    private alertify: AlertifyService, private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      partname:['', Validators.required],
      partdescription : ['', Validators.required],
      parturl: ['',null],
      sku: ['',null],
      inStock: false,
      isActive: false 
    })
  }

  registerPart() {
    if (this.registerForm.valid) {
      this.part = Object.assign({}, this.registerForm.value);
      this.partsService.add(this.part).subscribe(() => {
        this.alertify.success('Part Registered');
      }, error => {
        this.alertify.error(error);
      });
    }
  }
  
  

  showOptions(s) {
    console.log(s[s.selectedIndex].value); // get value
    console.log(s[s.selectedIndex].id); // get id
  }

}
