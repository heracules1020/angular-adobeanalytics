import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { LoggingService } from 'src/app/services/logging/logging.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-mobile-brochure-modal',
  templateUrl: './mobile-brochure-modal.component.html',
  styleUrls: ['./mobile-brochure-modal.component.css']
})
export class MobileBrochureModalComponent implements OnInit {
  @Input() productDetailValues: any;
  @Input() pdfSrc : any;
  constructor(
    public dialogRef: MatDialogRef<MobileBrochureModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private http:HttpClient,
    private logservice:LoggingService) {
      this.logservice.log(this.data.productDetailValues);
    }
  ngOnInit() {
    if(environment.production==true)
    this.pdfSrc= window.location.origin+"/"+environment.base_url +environment.get_pdf_brochure_by_object_id_endpoint+"/"+this.data.pdfSrc;
    else
    this.pdfSrc= environment.base_url +environment.get_pdf_brochure_by_object_id_endpoint+"/"+this.data.pdfSrc;
  }
  onCloseModal(): void {
    this.dialogRef.close();
  }

}
