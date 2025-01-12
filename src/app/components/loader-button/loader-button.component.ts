import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader-button',
  templateUrl: './loader-button.component.html',
  styleUrls: ['./loader-button.component.css']
})
export class LoaderButtonComponent {
  
  @Input('className')className = "btn-outline-warning";
  @Input('defaultText')defaultText = "";
  @Input('loaderText')loaderText = "";
  @Input('styleName')styleName = "";
  @Input('success') success!: (arg1: any) => void;
  @Input('observable')obs?:Observable<any>;

  hey(args: Function): void{
    args.call(1);
  }

  clicked(): void{
    if(this.success!= undefined && this.success!= null){
      this.success.call("ad", "swf");
    }
    else{
      alert("no method passed");
    }
  }

}
