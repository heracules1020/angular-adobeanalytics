import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationStateService } from 'src/app/services/application/application-state.service';
import { LoggingService } from 'src/app/services/logging/logging.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { SharedService } from 'src/app/services/common/shared.service';
import {constants} from 'src/app/services/common/constants';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-mobile-landing',
  templateUrl: './mobile-landing.component.html',
  styleUrls: ['./mobile-landing.component.css']
})
export class MobileLandingComponent implements OnInit {

  dealerName : string;
  products:any
  
  constructor(private appService:ApplicationStateService,private logservice:LoggingService,private rest:RestService, private shared:SharedService,private route: ActivatedRoute, private router : Router) { }

  ngOnInit() {

    this.dealerName = 'Toyota Seeger';

    let dealerId  :string;
    // this.route.queryParams.subscribe(params => {
    //   dealerId = params['dealerId'];
      
    // });

    dealerId=this.route.snapshot.paramMap.get("dealerId");
    this.shared.setDealerId(dealerId);
    if ( dealerId == null || dealerId == 'undefined' ) {
      dealerId  = "34089";
    }

    let requestParams = new Map();
    requestParams.set("id",dealerId);
    this.shared.setProductList(this.products);
     
    this.rest.handleRestCall(constants.GET_DEALER_BY_NUMBER,requestParams,"").subscribe(
      response=>{   
        if(response.dealerName == undefined)
        {
          console.log("dealer not found ");
        }
        this.dealerName = response.dlrNm;
      });
      
    this.rest.handleRestCall(constants.GET_PRODUCTS_BY_DEALER,requestParams,"").subscribe(
      response=>{      
      var arrCase = response as object ;
        this.products = arrCase['dealers']             
        this.shared.setProductList(this.products) ;
      },
      err=>{
        this.router.navigate(['/error']);
      }
    );
  }
  @ViewChild('carousel') carousel; 
  next() {
    this.carousel.next();
  }
  prev() {
    this.carousel.prev();
  }  
}
