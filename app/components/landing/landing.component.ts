import { Component, OnInit, ViewChild } from '@angular/core';  
import { LoggingService } from 'src/app/services/logging/logging.service';
import { RestService } from '../../services/rest/rest.service';
import { SharedService } from 'src/app/services/common/shared.service';
import { TransitionCheckState } from '@angular/material';
import {constants} from '../../services/common/constants';
import { ActivatedRoute, Router } from "@angular/router";
import { ApplicationStateService } from 'src/app/services/application/application-state.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  dealerName : string;
  products:any

  constructor(private logservice:LoggingService,private appService:ApplicationStateService,private rest:RestService,private shared:SharedService,private route: ActivatedRoute, private router : Router) { }

  ngOnInit() { 
    let dealerId  :string;

    dealerId=this.route.snapshot.paramMap.get("dealerId");

    // this.route.queryParams.subscribe(params => {
    //   dealerId = params['dealerId'];
      
    // });
    console.log('DealerId '+dealerId); 

    if ( dealerId == null || dealerId == 'undefined' ) {
      dealerId  = "34089";
    }

    let requestParams = new Map();
    requestParams.set("id",dealerId);

    this.shared.setProductList(this.products);

    this.rest.handleRestCall(constants.GET_DEALER_BY_NUMBER,requestParams,"").subscribe(
      response=>{      
       // console.log('response '+response.dlrNm);
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
        this.router.navigate(["error"]);
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
