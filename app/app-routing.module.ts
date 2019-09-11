import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router, PreloadAllModules } from "@angular/router";
import { MobileLandingComponent } from './components/mobile/mobile-landing/mobile-landing.component';
import { ApplicationStateService } from './services/application/application-state.service';
import { LandingComponent } from './components/landing/landing.component';
import { CardsComponent } from './components/cards/cards.component';
import { MobileProductDetailComponent } from './components/mobile/mobile-product-detail/mobile-product-detail.component';
import {ErrorComponent} from './components/error/error.component';
import {MobileErrorComponent} from './components/mobile/mobile-error/mobile-error.component';


const routes: Routes = [
  {
    path: "pp/:dealerId",
    component: LandingComponent
  },
  {
    path: "error",
    component: ErrorComponent,
  }    
  
];

const mobile_routes: Routes = [
  {
    path: "pp/:dealerId",
    component: MobileLandingComponent
  },
  {
    path: "productDetail",
    component: MobileProductDetailComponent,
  },
  {
    path: '**',
    component: ErrorComponent,
  }    
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

  public constructor(private router: Router,
    private applicationStateService: ApplicationStateService) {
   
    if (applicationStateService.getIsMobileResolution()) {
      router.resetConfig(mobile_routes);
    }
  }

}
