import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { constants } from '../common/constants';
import { LoggingService } from '../logging/logging.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {
 
  constructor(private http: HttpClient,private log:LoggingService) { }
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  get(url,requestParams): Observable<any> {    
    var paramStr = this.formURLwithParams(requestParams);
    
    if(paramStr!=null && paramStr.length > 0){
      url = url +paramStr;
    }
    this.log.log({"msg":"call to url ","data":url});

    return this.http.get(url,httpOptions).pipe(
    map(this.extractData));
  }

  add (url,data): Observable<any> {
    return this.http.post<any>(url, JSON.stringify(data), httpOptions)
  }

  update(url,data): Observable<any> {
  return this.http.put(url ,JSON.stringify(data), httpOptions)
  }
  
  formURLwithParams(paramMap){
  var paramStr ="";
  if(paramMap.size >0){
    for (let entry of Array.from(paramMap.entries())) {
    let value = entry[1];
    paramStr = paramStr+'/'+value;
    }
  }
   return paramStr;
  }

  handleRestCall(operation : string,requestParams,payload){
    switch(operation) { 
        case constants.GET_PRODUCTS_BY_DEALER: { 
          return this.get(this.getUrl(operation),requestParams);
        } 
        case constants.GET_PRODUCT_BY_ID: { 
          return this.get(this.getUrl(operation),requestParams);
        } 
        case constants.GET_DEALER_BY_NUMBER: { 
          return this.get(this.getUrl(operation),requestParams);
        } 
        
        default: { 
          return this.get(this.getUrl(operation),requestParams); 
       } 
    }
  }

  getUrl( operation : string ){
     if( operation == constants.GET_PRODUCTS_BY_DEALER ){
       return GET_PRODUCTS_BY_DEALER_URL;
     }  else if   ( operation == constants.GET_PRODUCT_BY_ID ){
      return GET_PRODUCT_BY_ID;
    }   else if   ( operation == constants.GET_DEALER_BY_NUMBER ){
      return GET_DEALER_BY_NUMBER;
    } 
  }
}

const GET_PRODUCTS_BY_DEALER_URL = environment.base_url + environment.get_products_by_dealer_endpoint;
const GET_PRODUCT_BY_ID = environment.base_url + environment.get_product_by_product_id_endpoint;
const GET_DEALER_BY_NUMBER = environment.base_url + environment.get_dealer_by_number;

if(environment.mock_dealerId){
  var httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json' ,
      'dealerId': environment.dealerId,    
    })
  };
}else{
  var httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'  
    })
  };
}

  

  



