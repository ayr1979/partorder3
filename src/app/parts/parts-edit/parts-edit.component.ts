import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { partslist } from '../../_models/partslist';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { PartsListService } from '../../_services/parts-list.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-parts-edit',
  templateUrl: './parts-edit.component.html',
  styleUrls: ['./parts-edit.component.css']
})
export class PartsEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  part: partslist;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
    private partService: PartsListService, private authService: AuthService) { }

    ngOnInit() { 
      this.route.data.subscribe(data => {
        this.part = data['orderparts'];
      });
    }

    updatePart() {
        this.partService.updatePart(this.part.id, this.part).subscribe(next => {
          this.alertify.success('Profile updated successfully');
          this.editForm.reset(this.part);
        }, error => {
          this.alertify.error(error);
        });
    }
    
      updateMainPhoto(photoUrl) {
        this.part.url = photoUrl;
      }
    

}
