import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MobileLandingComponent } from './components/mobile/mobile-landing/mobile-landing.component';
import { NgModule } from '@angular/core';
import {NgbModule, NgbTabset} from '@ng-bootstrap/ng-bootstrap';
import { EnvServiceProvider } from './services/env/env.service.provider';
import { ApplicationStateService } from './services/application/application-state.service';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LandingComponent } from './components/landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { CarouselComponent, CarouselItemElement } from './components/carousel/carousel.component';
import { CarouselItemDirective } from './components/carousel/carousel-item.directive';
import { CardsComponent } from './components/cards/cards.component';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material';
import { ProductDetailModalComponent } from './components/product-detail-modal/product-detail-modal.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule, MatInputModule } from '@angular/material';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BrochureModalComponent } from './components/brochure-modal/brochure-modal.component';
import { MobileProductDetailComponent } from './components/mobile/mobile-product-detail/mobile-product-detail.component';
import { MobileVideoModalComponent } from './components/mobile/mobile-video-modal/mobile-video-modal.component';
import { MobileBrochureModalComponent } from './components/mobile/mobile-brochure-modal/mobile-brochure-modal.component';
import { MobileCardsComponent } from './components/mobile/mobile-cards/mobile-cards.component';
import { ErrorComponent } from './components/error/error.component';
import { MobileErrorComponent } from './components/mobile/mobile-error/mobile-error.component';


@NgModule({
  declarations: [
    AppComponent,
    MobileLandingComponent,LandingComponent,
    CarouselComponent,CarouselItemDirective, CarouselItemElement,CardsComponent,
    ProductDetailModalComponent,
    ModalComponent,
    BrochureModalComponent,
    MobileProductDetailComponent,
    MobileVideoModalComponent,
    MobileBrochureModalComponent,
    MobileCardsComponent,
    ErrorComponent,
    MobileErrorComponent
  ],
  imports: [    
    BrowserModule,
    BrowserAnimationsModule,
    DeviceDetectorModule.forRoot(),
    NgbModule,
    MatDialogModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatExpansionModule, MatInputModule, PdfViewerModule
  ],
  providers: [ ApplicationStateService,EnvServiceProvider,HttpClient,NgbTabset],
  bootstrap: [AppComponent],
  entryComponents:[LandingComponent,MobileLandingComponent,ProductDetailModalComponent,
    ModalComponent,BrochureModalComponent,MobileProductDetailComponent,MobileVideoModalComponent,
    MobileBrochureModalComponent,MobileVideoModalComponent]
})
export class AppModule { }
