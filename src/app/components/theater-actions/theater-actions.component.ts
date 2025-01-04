import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShowtimeForm } from 'src/app/model/showtime-form.model';
import { Theater } from 'src/app/model/theater.model';
import { TimeslotRequestDTO } from 'src/app/model/timeslot-request-dto.model';
import { ShowtimeService } from 'src/app/services/showtime/showtime.service';
import { TheaterService } from 'src/app/services/theater/theater.service';
import { TimeslotService } from 'src/app/services/timeslot/timeslot.service';
import { DateUtils } from 'src/app/utils/date-utils';

@Component({
  selector: 'app-theater-actions',
  templateUrl: './theater-actions.component.html',
  styleUrls: ['./theater-actions.component.css']
})
export class TheaterActionsComponent implements OnInit {

  theaterId: number;
  theater?: Theater;
  addTimeslotsForm: FormGroup;
  addShowsForm: FormGroup;
  minDate: String;

  @ViewChild('cancelAddTimeslotsModalButton') modalCloseBtn?: ElementRef;
  @ViewChild('openAddShowFormModal') openAddShowFormModal?: ElementRef;
  @ViewChild('closeAddShowFormModalButton') closeAddShowFormModalButton?: ElementRef;
  @ViewChild('customDatePicker') customDatePicker?: ElementRef;

  constructor(
    private theaterService: TheaterService,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private showtimeService: ShowtimeService,
    private timeslotService: TimeslotService
  ) {
    this.theaterId = 0;
    this.minDate = "";
    this.addTimeslotsForm = this.formBuilder.group({
      startHH: ['', Validators.required],
      startMM: ['', Validators.required]
    });
    this.addShowsForm = this.formBuilder.group({
      fromDate: ["", Validators.required],
      toDate: ["", Validators.required],
      screenId: ["0", Validators.required],
      movieId: ["0", Validators.required],
      timeslotsFormChecks: this.formBuilder.array([]),
    });
  }
  ngOnInit(): void {
    if (this.activatedroute.snapshot.paramMap?.has("theaterId")) {
      this.theaterId = Number(this.activatedroute.snapshot.paramMap.get("theaterId"));
      this.fetchData();
    }
    this.customDatePicker?.nativeElement.datepicker({
      multidate: true,
      format: 'dd-mm-yyyy'
    });
  }

  fetchData(): void {
    this.theaterService.getTheaterById(this.theaterId).subscribe({
      next: (response) => this.theater = response,
      error: (error) => alert(error),
      complete: () => { }
    });
  }

  initAddShowForm(): void {
    this.refeshTimeSlotsCheckBoxes();
    this.minDate = DateUtils.getTodayDateString();
    this.openAddShowFormModal?.nativeElement.click();
  }

  refeshTimeSlotsCheckBoxes(): void {
    let checkBoxrray = this.timeslotsFormChecksArray;
    checkBoxrray.clear();
    this.theater?.timeslots.forEach(timeslot => {
      checkBoxrray.push(this.formBuilder.control(true, Validators.required));
    })
  }

  submitShowsForm(): void {
    if (this.addShowsForm.invalid) {
      alert("Invalid form.");
      return;
    }
    let fromDateValue: string = this.addShowsForm.get("fromDate")?.value;
    let toDateValue: string = this.addShowsForm.get("toDate")?.value;
    let screenId: string = this.addShowsForm.get("screenId")?.value;
    let movieId: string = this.addShowsForm.get("movieId")?.value;
    let fromDate: Date = new Date(Date.parse(fromDateValue));
    let toDate: Date = new Date(Date.parse(toDateValue));
    if (fromDate < new Date()) {
      alert("'From' date connot be older than today.");
      return;
    }
    if (fromDate > toDate) {
      alert("'To' date is earlier than 'From' date.");
      return;
    }
    if (screenId == "0") {
      alert("Please select a screen.");
      return;
    }
    if (movieId == "0") {
      alert("Please select a movie.");
      return;
    }
    let formModel = this.generateShowtimeFormArray(fromDate, toDate, movieId, screenId);
    if (formModel.length == 0) {
      alert("Please choose at least one timeslot.");
      return;
    }
    this.showtimeService.addShowtime(formModel).subscribe({
      next: (showtimes) => {
        showtimes.forEach(showtime => {
          this.theater?.showtimes.push(showtime);
        });
        this.closeAddShowFormModalButton?.nativeElement.click();
        alert("Added.")
      },
      error: (error) => alert(error.status + ":" + error.message),
      complete: () => { }
    });
  }

  generateShowtimeFormArray(fromDate: Date, toDate: Date, movieId: string, screenId: string): ShowtimeForm[] {
    let arr: ShowtimeForm[] = [];
    let currentDate = new Date(fromDate);
    while (currentDate <= toDate) {
      for (let i = 0; i < this.timeslotsFormChecksArray?.length; i++) {
        let timeslot = this.theater?.timeslots?.[i];
        if (timeslot != undefined && timeslot != null && this.timeslotsFormChecksArray.value[i]) {
          arr.push(new ShowtimeForm(this.theaterId, Number(screenId), Number(movieId), timeslot.id, new Date(currentDate)));
        }
      }
      currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
    }
    return arr;
  }

  get timeslotsFormChecksArray() {
    return this.addShowsForm.get('timeslotsFormChecks') as FormArray;
  }

  submitTimeslotForm(): void {
    if (this.addTimeslotsForm.invalid) {
      alert("Invalid form");
      return;
    }
    this.modalCloseBtn?.nativeElement.click();
    let startHH = this.addTimeslotsForm.get("startHH")?.value;
    let startMM = this.addTimeslotsForm.get("startMM")?.value;
    let timeslotRequestDTO = new TimeslotRequestDTO(Number(startHH), Number(startMM), this.theaterId);
    this.timeslotService.addTimeSlot(timeslotRequestDTO).subscribe({
      next: (response) => { this.theater?.timeslots.push(response) },
      error: (error) => { alert(error.message); }
    });
  }

}
