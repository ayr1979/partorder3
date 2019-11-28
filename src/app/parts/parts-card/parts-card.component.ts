import { Component, OnInit, Input } from '@angular/core';
import { partslist } from '../../_models/partslist';


@Component({
  selector: 'app-parts-card',
  templateUrl: './parts-card.component.html',
  styleUrls: ['./parts-card.component.css']
})
export class PartsCardComponent implements OnInit {
  @Input() part: partslist;

  constructor() { }

  ngOnInit() {
   
  }

}
