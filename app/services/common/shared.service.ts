import { Injectable, Input } from '@angular/core';
import { LoggingService } from '../logging/logging.service';
import { MobileProductDetailComponent } from 'src/app/components/mobile/mobile-product-detail/mobile-product-detail.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  productDetailList:Array<any>;
  mobileProductDetailList:Array<any>;
  objectId:String;
  dealerId:String="";

 public mobileProductDetail:MobileProductDetailComponent;
  constructor(private logger:LoggingService) { }

  setDealerId(dId){
    this.dealerId=dId;
  }

  setProductList(plist){
    this.productDetailList = plist;
  }

  setMobileProductDetailList(plist){
    this.mobileProductDetail = plist;
  }

  public getNext(objId){
    
    this.objectId=objId
    var objectIndex = this.findIndex();
    if(objectIndex<=this.productDetailList.length-2){   
      return this.productDetailList[objectIndex+1]
    }else{
      return this.productDetailList[objectIndex]
    }
  }


  public getPrevious(objId){
    this.objectId=objId
    var objectIndex = this.findIndex();
    if(objectIndex>0){  
      return this.productDetailList[objectIndex-1]
    }

  }
  public getNextForMobile(objId){
    this.objectId=objId
    var objectIndex = this.findIndex();
    if(objectIndex<=this.productDetailList.length-2){   
      this.mobileProductDetail=this.productDetailList[objectIndex+1];
      return this.mobileProductDetail
    }else{
      this.mobileProductDetail=this.productDetailList[objectIndex];
      return this.mobileProductDetail
    }
  }

  public  findIndex(){
    return this.productDetailList.map(function (element) { return element.objectId; }).indexOf(this.objectId);
  }

  public getPreviousForMobile(objId){
    this.objectId=objId
    var objectIndex = this.findIndex();
    if(objectIndex>0){  
      this.mobileProductDetail=this.productDetailList[objectIndex-1];
      return this.mobileProductDetail     
    }else{
      this.mobileProductDetail=this.productDetailList[objectIndex];
      return this.mobileProductDetail
    }

  }
  isObjectId(element){
     return element.objectId== '5cfaafd231272f87ecb42bec';
  }
}
