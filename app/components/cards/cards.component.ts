import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductDetailModalComponent } from '../product-detail-modal/product-detail-modal.component';
import { RestService } from '../../services/rest/rest.service';
import { LoggingService } from 'src/app/services/logging/logging.service';
import {constants} from '../../services/common/constants';
import { ApplicationStateService } from 'src/app/services/application/application-state.service';
import { MobileProductDetailComponent } from 'src/app/components/mobile/mobile-product-detail/mobile-product-detail.component';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/common/shared.service';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  dialogRef : any;
  @Input() productDetailList:any;
  productDetailArray: Array<Object>;
  @ViewChild('productDetail')
  productDetail: ProductDetailModalComponent;
  @Input() productid:String;
  @ViewChild('mobileProductDetail')
  mobileProductDetail:MobileProductDetailComponent;

  constructor( private rest:RestService,private  dialog:  MatDialog,
    private appService:ApplicationStateService, private router : Router,private shared:SharedService, private logservice:LoggingService) { }

  ngOnInit() {
    //this.productDetailList=[""];
    let requestParams = new Map();
    requestParams.set("id",this.productid);

    // this.rest.handleRestCall(constants.GET_PRODUCT_BY_ID,requestParams,"").subscribe(
    //   response=>{      
    //   var arrCase = response as object ;
    //     this.productDetailList = arrCase['dealers']     
    //     console.log("this.productDetailList in cards" +this.productDetailList);   
    //   });
    
      
  }

  getProductDetail(){
    //onclick learnmore button---------------------------------2019.08.01-------------------------------
    this.trackLog();
    this.showProductDetail();

  }
  trackLog(){  //display tracking log when user clicks learnmore button.
    let logstr = {
      'dealer_brand': 'Toyota',
      'dealer_code':this.productDetailList.dealerId,
      'dealer_name': 'n/a',
      'dealer_zip_code': 'n/a',
      'dealer_city':'n/a',
      'dealer_state':'n/a',
      'dealer_metro':'n/a',
      'dealer_has_txm':'n/a',
      'dealer_has_espanol':'n/a',
      'dealer_has_tire-center':'n/a',
      'dealer_has_schedule_service':'n/a',
      'dealer_service_only':'n/a',
      'link_text':'n/a',
      'href':"n/a"
    }
    console.log("fireTag('aa-link',", logstr,")");
  }

  showProductDetail(){
    if(this.appService.isMobileResolution){
      this.shared.setMobileProductDetailList(this.productDetailList);
      this.router.navigate(['/productDetail']);
    }else{
    const dialogRef = this.dialog.open(ProductDetailModalComponent, {
      width:'60%',
      height:'100%',
      position: {left: '40%'},
      data: {productDetail:[this.productDetailList]}
    });
  }
  }
}
