import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fallproof-image',
  templateUrl: './fallproof-image.component.html',
  styleUrls: ['./fallproof-image.component.css']
})
export class FallproofImageComponent implements AfterViewInit {
  
  fallbackImageSrc = "../../../assets/logo.png";
  
  @Input('src') fallProofPicSrc: string = "";
  @Input('class') class: string = "";
  @Input('alt') alt: string = "";
  @Input('style') style: string = "";
  @ViewChild('fallProofPic') fallProofPic!:ElementRef;
  
  ngAfterViewInit(): void {
    this.fallProofPic.nativeElement.addEventListener("error", (e:any) => {
      this.fallProofPicSrc = this.fallbackImageSrc;
    });
  }
}
