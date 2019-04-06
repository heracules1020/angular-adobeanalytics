import { Component, OnInit, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {environment} from '../../../environments/environment';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { LoggingService } from 'src/app/services/logging/logging.service';
import { HttpClient } from '@angular/common/http';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-brochure-modal',
  templateUrl: './brochure-modal.component.html',
  styleUrls: ['./brochure-modal.component.css']
})
export class BrochureModalComponent implements OnInit {
  @Input() pdfSrc : any;
  @Input() productDetailValues: any;
  constructor(
    public dialogRef: MatDialogRef<BrochureModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private http:HttpClient,
    private logservice:LoggingService) {
      this.logservice.log(this.data.productDetailValues);
    }
    
  ngOnInit() {
    if(environment.production==true)
      this.pdfSrc= window.location.origin+"/"+environment.base_url +environment.get_pdf_brochure_by_object_id_endpoint+"/"+this.data.pdfSrc;
    else
    this.pdfSrc= environment.base_url +environment.get_pdf_brochure_by_object_id_endpoint+"/"+this.data.pdfSrc;
    this.logservice.log({"msg":"pdf url ","base":window.location.origin,"data":this.pdfSrc});
  }
  
  onCloseModal(): void {
    this.dialogRef.close();
  }
   
  }
  
