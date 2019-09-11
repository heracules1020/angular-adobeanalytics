import { AfterViewInit, Component, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CarouselItemDirective } from './carousel-item.directive';
import { animate, AnimationBuilder, AnimationFactory, AnimationPlayer, style } from '@angular/animations';

@Directive({
  selector: '.carousel-item'
})
export class CarouselItemElement {
}

@Component({
  selector: 'carousel',
  exportAs: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
  
})
export class CarouselComponent implements AfterViewInit {
  @ContentChildren(CarouselItemDirective) items : QueryList<CarouselItemDirective>;
  @ViewChildren(CarouselItemElement, { read: ElementRef }) private itemsElements : QueryList<ElementRef>;
  @ViewChild('carousel') private carousel : ElementRef;
  @Input() timing = '250ms ease-in';
  @Input() showControls = false;
  private player : AnimationPlayer;
  private itemWidth : number;
  private currentSlide = 0;
  carouselWrapperStyle = {}

  next() {
    var numberOfItemsOnScreen = window.outerWidth/(this.itemWidth*1.25);
    numberOfItemsOnScreen=(numberOfItemsOnScreen|0);
   if( this.currentSlide  === this.items.length-numberOfItemsOnScreen ) return;
 
    this.currentSlide = (this.currentSlide + 1) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;
    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  private buildAnimation( offset ) {
    return this.builder.build([
      animate(this.timing, style({ transform: `translateX(-${offset}px)` }))
    ]);
  }

  prev() {
    if( this.currentSlide === 0 ) return;

    this.currentSlide = ((this.currentSlide - 1) + this.items.length) % this.items.length;
    const offset = this.currentSlide * this.itemWidth;

    const myAnimation : AnimationFactory = this.buildAnimation(offset);
    this.player = myAnimation.create(this.carousel.nativeElement);
    this.player.play();
  }

  constructor( private builder : AnimationBuilder ) {
  }

  ngAfterViewInit() {
    // For some reason only here I need to add setTimeout, in my local env it's working without this.
    setTimeout(() => {
      this.itemWidth = 480;
      var w = window.innerWidth;
      this.carouselWrapperStyle = {
        width: `${((w-213)/(460+10)) * (this.itemWidth)}px`
      }
    });
    
  }
  onSwipe(evt) {
    const x = Math.abs(evt.deltaX) > 40 ? (evt.deltaX > 0 ? 'right' : 'left'):'';
    const y = Math.abs(evt.deltaY) > 40 ? (evt.deltaY > 0 ? 'down' : 'up') : '';

      //`${x} ${y}<br/>`;
      if(x=='left')this.next();
      if(x=='right')this.prev();
  }

}