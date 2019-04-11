import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ProductDetailModalComponent } from '../../product-detail-modal/product-detail-modal.component';
import { RestService } from '../../../services/rest/rest.service';
import {constants} from '../../../services/common/constants';
import { ApplicationStateService } from 'src/app/services/application/application-state.service';
import { MobileProductDetailComponent } from 'src/app/components/mobile/mobile-product-detail/mobile-product-detail.component';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/common/shared.service';
import { LoggingService } from 'src/app/services/logging/logging.service';


@Component({
  selector: 'mobile-cards',
  templateUrl: './mobile-cards.component.html',
  styleUrls: ['./mobile-cards.component.css']
})
export class MobileCardsComponent implements OnInit {
    dialogRef : any;
    @Input() productDetailList:any;
    productDetailArray: Array<Object>;
    @ViewChild('productDetail')
    productDetail: ProductDetailModalComponent;
    mobileProductDetail:MobileProductDetailComponent;
    @Input() productid:String;
    @ViewChild('mobileProductDetail')  
  
    constructor( private rest:RestService,private  dialog:  MatDialog,
      private appService:ApplicationStateService, private router : Router,private shared:SharedService,
      private logger:LoggingService) { }
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
      this.showProductDetail();
    }
    showProductDetail(){
        this.shared.setMobileProductDetailList([this.productDetailList]);
       // this.router.navigate(['/productDetail']);
        this.router.navigateByUrl('productDetail', { skipLocationChange: true }); 
    }
  }