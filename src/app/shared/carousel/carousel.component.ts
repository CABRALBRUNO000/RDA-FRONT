import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  // styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {


  @Input() slides;
  // currentSlide = 0;
  transformationImgCasaDescanso = [{ height: '450', width: '1000' }];
  constructor() {}

  // onPreviousClick() {
  //   const previous = this.currentSlide - 1;
  //   this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  //   console.log('previous clicked, new current slide is: ', this.currentSlide);
  // }

  // onNextClick() {
  //   const next = this.currentSlide + 1;
  //   this.currentSlide = next === this.slides.length ? 0 : next;
  //   // console.log("next clicked, new current slide is: ", this.currentSlide);
  // }

  ngOnInit() {
  }

}
