import { Component, OnInit, ViewChild, ElementRef, Input, Inject, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
import { HttpClient } from '@angular/common/http';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { LoggingService } from 'src/app/services/logging/logging.service';
import { BrochureModalComponent } from '../brochure-modal/brochure-modal.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedService } from 'src/app/services/common/shared.service';
import { Router, ActivatedRoute } from '@angular/router';

declare var window: any;
@Component({
  selector: 'app-product-detail-modal',
  templateUrl: './product-detail-modal.component.html',
  styleUrls: ['./product-detail-modal.component.css'],
  queries: {
    "tabsContentRef": new ViewChild( "tabsContentRef" )
},
})
export class ProductDetailModalComponent implements OnInit {
 
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChild('tabTemplateRef') tabTemplateRef: TemplateRef<any>;
  public tabsContentRef!: ElementRef;
  videoUrl: string;
  isVideoComOpen: boolean;
  vedioImageURL:string;
  dealersList:any;
  delaerPlan:any;
  salesClasses :any;
  showDropdown: boolean = false;
  @Input() productDetailValues: any;
  @Input() dealerPlan:any;
  @Input()salesClassArr:any;
  @Input()selectedValue:any;
  @Input()selectedSalesClassArr:any;
  hideNextIcon:boolean = true;
  hidePrevIcon:boolean = true;
  productDetailJson : string;
  private currentSlide = 0;
  constructor(
    private router: Router, private route: ActivatedRoute,
    public dialogRef: MatDialogRef<ProductDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog,private http:HttpClient,public tabset: NgbTabset,
    private logservice:LoggingService,public shared:SharedService) {
    this.logservice.log(this.data.productDetail);
    }

ngOnInit() {
  this.reload()
}

reload(){
  this.hidePrevIcon = true;
  this.hideNextIcon = true;
  var pList = this.shared.productDetailList;
   for(var i =0; i< pList.length; i++ ) {
    if(this.shared.productDetailList[i].objectId === this.data.productDetail[0].objectId ) {
      if(i==0) {
        this.hidePrevIcon = false;
      } else if(i+1 == pList.length) {
        this.hideNextIcon = false;
      }
    }
  }
  this.tabsContentRef.nativeElement.parentNode.parentNode.scrollTo( 0, 0 );
  this.productDetailValues = this.data.productDetail[0];
  //to check for VSA type products which has multiple sales classes
  if(this.data.productDetail[0].salesClasses.salesClass.length >1){
  this.selectedValue=this.data.productDetail[0].salesClasses.salesClass[2].id !="" ?"New Vehicle":"";
  }
  this.productDetailJson  = JSON.stringify(this.data.productDetail[0]);
  this.salesClassArr = this.data.productDetail[0].salesClasses.salesClass;
  
  //Default show to NEW 
  if( this.selectedValue!=null && this.selectedValue!="") {
    this.showDropdown=true;
    this.selectedSalesClassArr = this.data.productDetail[0].salesClasses.salesClass[2];
  }else{
    this.selectedSalesClassArr = this.data.productDetail[0].salesClasses.salesClass[0];
  }

}

toggleVideo(event: any) {
  this.videoplayer.nativeElement.play();
}

onChange(event,selectedValue):any{
  this.selectedValue= selectedValue;
  for (let i=0;i<this.data.productDetail[0].salesClasses.salesClass.length;i++) {
    if(this.data.productDetail[0].salesClasses.salesClass[i].id==this.selectedValue)
    {
      this.selectedSalesClassArr = this.data.productDetail[0].salesClasses.salesClass[i];
    }
  }
  this.logservice.log(" this.selectedSalesClassArr "+ JSON.stringify(this.selectedSalesClassArr));
} 
goToLanding(){
  this.dialogRef.close();
}
next() {
  this.selectedValue="";
  this.data.productDetail[0]=this.shared.getNext(this.data.productDetail[0].objectId);
  this.reload();
}
prev() {
  this.selectedValue="";
  this.data.productDetail[0]=this.shared.getPrevious(this.data.productDetail[0].objectId);
  this.reload();
}

openVideoCompo(imageUrl,videoUrl){   
  this.videoUrl="limelight_player_989811";
  this.vedioImageURL=this.selectedSalesClassArr.content.productVideoUrl;
  const dialogRef = this.dialog.open(ModalComponent, {
    width: '800px',
    height:'800x',
    panelClass: 'custom-dialog-container',
    data: {videoUrl:this.videoUrl,isVideoComOpen:true,vedioImageURL:this.vedioImageURL}
  });

  dialogRef.afterClosed().subscribe(result => {
  });
 
  dialogRef.afterOpened().subscribe(result => {
    window.LimelightPlayerUtil.embed({
      "mediaId":this.vedioImageURL,
      "playerForm":"Player",        
      width: '800px',
      height:'455px',
      "playerId":this.videoUrl,
      "autoPlay ":true
    });
  });     
}

showPDFBrochure(pdfUrl) {
  const dialogRef = this.dialog.open(BrochureModalComponent, {
    width: '90%',
    height:'90%',
    data: {pdfSrc:pdfUrl}
  });
  dialogRef.afterClosed().subscribe(result => {
  });
  dialogRef.afterOpened().subscribe(result => {
  });     
}
onCloseModal(): void {
  this.dialogRef.close();
}

}