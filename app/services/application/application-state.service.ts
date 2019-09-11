import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector'

@Injectable()
export class ApplicationStateService {

  public isMobileResolution: boolean;
  deviceInfo = null;

  width:number;
  height:number;

  constructor(private deviceService:DeviceDetectorService) {
  
    this.epicFunction()

    this.width=window.innerWidth
    this.height=window.innerHeight

    if (window.innerWidth < 700) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  public getIsMobileResolution(): boolean {
    return this.isMobileResolution;
  }


  epicFunction() {
   
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
  }

}