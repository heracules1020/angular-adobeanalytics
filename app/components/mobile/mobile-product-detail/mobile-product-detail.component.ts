import { Component, OnInit, ViewChild, ElementRef, Input, Inject, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { LoggingService } from 'src/app/services/logging/logging.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedService } from 'src/app/services/common/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MobileVideoModalComponent } from '../mobile-video-modal/mobile-video-modal.component';
import { MobileBrochureModalComponent } from '../mobile-brochure-modal/mobile-brochure-modal.component';
declare var window: any;

@Component({
  selector: 'app-mobile-product-detail',
  templateUrl: './mobile-product-detail.component.html',
  styleUrls: ['./mobile-product-detail.component.css']
})

export class MobileProductDetailComponent implements OnInit {
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @ViewChild('tabTemplateRef') tabTemplateRef: TemplateRef<any>;
  videoUrl: string;
  isVideoComOpen: boolean;
  vedioImageURL:string;
  dealersList:any;
  delaerPlan:any;
  salesClasses :any;
  showDropdown: boolean = false;
  @Input() productDetailList:Array<Object>;
  @Input() mobileProductDetail: MobileProductDetailComponent;
  productDetailValues:Array<Object>;
  @Input() dealerPlan:any;
  @Input()salesClassArr:any;
  @Input()selectedValue:any;
  @Input()selectedSalesClassArr:any;
  productDetailJson : string;
  dialogRef : any;
  hideNextIcon:boolean = true;
  hidePrevIcon:boolean = true;
  
  constructor(
   public dialog: MatDialog,private http:HttpClient,public tabset: NgbTabset,
    private logservice:LoggingService,public shared:SharedService,
    private router: Router,private route: ActivatedRoute,) {
      
    }

ngOnInit() {
   this.mobileProductDetail =this.shared.mobileProductDetail;
  this.reload();

}

reload(){
  this.hidePrevIcon = true;
  this.hideNextIcon = true;
  var pList = this.shared.productDetailList;
  for(var i =0; i< pList.length; i++ ) {
    if(this.shared.productDetailList[i].objectId === this.mobileProductDetail[0].objectId ) {
      if(i==0) {
        this.hidePrevIcon = false;
      } else if(i+1 == pList.length) {
        this.hideNextIcon = false;
      }
    }
  }
  window.scroll(0,0);
  this.selectedValue=this.mobileProductDetail[0].salesClasses.salesClass[0].id !="" ?"New Vehicle":"";
  if( this.selectedValue!=null && this.selectedValue!="")
  {
    this.showDropdown=true;
  }
    this.salesClassArr = this.mobileProductDetail[0].salesClasses.salesClass;
    this.selectedSalesClassArr = this.mobileProductDetail[0].salesClasses.salesClass[0];
  }

toggleVideo(event: any) {
  this.videoplayer.nativeElement.play();
}

onChange(event,selectedValue):any{
  this.selectedValue= selectedValue;
  for (let i=0;i<this.mobileProductDetail[0].salesClasses.salesClass.length;i++) {
    if(this.mobileProductDetail[0].salesClasses.salesClass[i].id==this.selectedValue)
    {
      this.selectedSalesClassArr = this.mobileProductDetail[0].salesClasses.salesClass[i];
    }
  }
  this.logservice.log(" this.selectedSalesClassArr "+ JSON.stringify(this.selectedSalesClassArr));
} 
next() {
  this.mobileProductDetail[0]=this.shared.getNextForMobile(this.mobileProductDetail[0].objectId);
  this.reload();
}

prev() {

  this.mobileProductDetail[0]=this.shared.getPreviousForMobile(this.mobileProductDetail[0].objectId)
  this.reload();
}
goToLanding(){
  this.router.navigate(['pp/'+this.shared.dealerId]);
}
openVideoCompo(imageUrl,videoUrl){   
  this.videoUrl="limelight_player_989811";
  this.vedioImageURL=this.selectedSalesClassArr.content.productVideoUrl;
  const dialogRef = this.dialog.open(MobileVideoModalComponent, {
    width: '80%',
    height:'100%',
    data: {videoUrl:this.videoUrl,isVideoComOpen:true,vedioImageURL:this.vedioImageURL}
  });

  dialogRef.afterClosed().subscribe(result => {
  });
 
  dialogRef.afterOpened().subscribe(result => {
    window.LimelightPlayerUtil.embed({
      "mediaId":this.vedioImageURL,
      "playerForm":"Player",        
      width: '100%',
      height:'100%',
      padding: '0px',
      "playerId":this.videoUrl,
      "autoPlay ":true
    });
  });     
}

showPDFBrochure(pdfUrl) {
  console.log("PDF Brochure utl in product details", + pdfUrl);
  const dialogRef = this.dialog.open(MobileBrochureModalComponent, {
    width: '80%',
    height:'100%',
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
