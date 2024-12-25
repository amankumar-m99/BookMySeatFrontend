import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  @Input() message: string = ''; // Message to display
  @Input() duration: number = 3000; // Duration in milliseconds
  isVisible: boolean = false; // Controls visibility of the toast

  ngOnInit(): void {
    this.showToast();
  }

  showToast(): void {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, this.duration);
  }
}
