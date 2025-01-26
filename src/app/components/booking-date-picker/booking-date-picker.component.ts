import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-booking-date-picker',
  templateUrl: './booking-date-picker.component.html',
  styleUrls: ['./booking-date-picker.component.css']
})
export class BookingDatePickerComponent {

  dateArr: Date[];
  index = 0;
  selectedIndex = 0;
  maxSize = 5;

  @Output() dateSelected = new EventEmitter<Date>();

  constructor() {
    this.dateArr = []
    this.refreshDateArr();
  }

  refreshDateArr(): void {
    let start = this.index * this.maxSize;
    let end = start + this.maxSize;
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + start);
    this.dateArr = []
    for (let i = start; i < end; i++) {
      this.dateArr.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  next(): void {
    if (this.selectedIndex + 1 == this.maxSize * (this.index + 1)) {
      this.index++;
      this.refreshDateArr();
    }
    this.selectedIndex++;
    this.sendData();
  }

  prev(): void {
    if (this.index == 0) {
      return;
    }
    this.index--;
    this.refreshDateArr();
    this.sendData();
  }

  dateClicked(clickedIndex: number): void {
    this.selectedIndex = clickedIndex;
    this.sendData();
  }

  sendData() {
    let selectedDate: Date = this.dateArr[this.selectedIndex % this.maxSize];
    this.dateSelected.emit(selectedDate);
  }
}
