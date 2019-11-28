import { Component, OnInit, ViewChild } from '@angular/core';
import { partslist } from '../../_models/partslist';
import { PartsListService } from '../../_services/parts-list.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-parts-detail',
  templateUrl: './parts-detail.component.html',
  styleUrls: ['./parts-detail.component.css']
})
export class PartsDetailComponent implements OnInit {
  part: partslist;
  @ViewChild('memberTabs') memberTabs: TabsetComponent;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: PartsListService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() { 
    this.route.data.subscribe(data => {
      this.part = data['orderparts'];
    });
  
  
  this.route.queryParams.subscribe(params => {
    const selectedTab = params['tab'];
    this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
  });

  this.galleryOptions = [
    {
      width: '500px',
      height: '500px',
      imagePercent: 100,
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false
    }
  ];
  this.galleryImages = this.getImages();
}

  getImages() {
   const imageUrls = [];
    for (let i = 0; i < this.part.photos.length; i++) {
      imageUrls.push({
      small: this.part.photos[i].url,
      medium: this.part.photos[i].url,
      big: this.part.photos[i].url,
      description: this.part.photos[i].description
      });
    }
    return imageUrls;
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

}
