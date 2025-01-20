import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddScreenModel } from 'src/app/model/screens/add-screen.model';
import { ShowtimeForm } from 'src/app/model/showtime-form.model';
import { Theater } from 'src/app/model/theater.model';
import { TimeslotRequestDTO } from 'src/app/model/timeslot-request-dto.model';
import { EncryptionService } from 'src/app/services/encryption/encryption.service';
import { ScreenService } from 'src/app/services/screeen/screen.service';
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
  addScreensForm: FormGroup;
  addTimeslotsForm: FormGroup;
  addShowsForm: FormGroup;
  minDate: String;

  @ViewChild("openAddScreenModalButton") openAddScreenModalButton?: ElementRef;
  @ViewChild("closeAddScreenModalButton") closeAddScreenModalButton?: ElementRef;

  @ViewChild("openTimeslotModalButton") openTimeslotModalButton?: ElementRef;
  @ViewChild("closeTimeslotModalButton") closeTimeslotModalButton?: ElementRef;

  @ViewChild("openAddShowModalButton") openAddShowModalButton?: ElementRef;
  @ViewChild("closeAddShowModalButton") closeAddShowModalButton?: ElementRef;

  constructor(
    private theaterService: TheaterService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private showtimeService: ShowtimeService,
    private timeslotService: TimeslotService,
    private toastr: ToastrService,
    private encryption: EncryptionService,
    private screenService: ScreenService
  ) {
    this.theaterId = 0;
    this.minDate = "";
    this.addScreensForm = this.formBuilder.group({
      name: ['', Validators.required],
      rows: ['', Validators.required],
      cols: ['', Validators.required]
    });
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
    this.theaterId = Number(this.encryption.decryptRouteParam(this.activatedRoute, "theaterId"));
    if (this.theaterId > 0) {
      this.fetchData();
    }
  }

  fetchData(): void {
    this.theaterService.getTheaterById(this.theaterId).subscribe({
      next: (response) => this.theater = response,
      error: (error) => this.toastr.error("Error", error.message),
      complete: () => { }
    });
  }

  openAddScreenModal(): void {
    this.initAddScreenModal();
    this.openAddScreenModalButton?.nativeElement.click();
  }

  initAddScreenModal(): void {
    let length = this.theater?.screens.length;
    let placeholderValue = "";
    if (length != undefined && length != null) {
      placeholderValue = "Screen " + String(length + 1);
    }
    this.addScreensForm.reset();
    this.addScreensForm.get("name")?.patchValue(placeholderValue);
  }

  submitScreensForm(): void {
    if (this.addScreensForm.invalid) {
      this.toastr.error("Invalid form", "Fill all fields");
      return;
    }
    let name = this.addScreensForm.get("name")?.value;
    let cols = this.addScreensForm.get("cols")?.value;
    let rows = this.addScreensForm.get("rows")?.value;
    let model = new AddScreenModel(this.theaterId, name, Number(cols), Number(rows));
    this.screenService.addScreen(model).subscribe({
      next: (response) => {
        this.theater?.screens.push(response);
        this.toastr.success("Screen added");
        this.closeAddScreenModalButton?.nativeElement.click();
      },
      error: (error) => this.toastr.error("Error", error.message)
    });
  }

  openAddTimeslotModal(): void {
    this.initAddTimeslotModal();
    this.openTimeslotModalButton?.nativeElement.click();
  }

  initAddTimeslotModal(): void {
    this.addTimeslotsForm.reset();
  }

  submitTimeslotForm(): void {
    if (this.addTimeslotsForm.invalid) {
      this.toastr.error("Invalid form", "Fill all fields");
      return;
    }
    let startHH = Number(this.addTimeslotsForm.get("startHH")?.value);
    let startMM = Number(this.addTimeslotsForm.get("startMM")?.value);
    if (startHH < 0 || startHH > 23) {
      this.toastr.error("Invalid form", "Start hours is invalid");
      return;
    }
    if (startMM < 0 || startMM > 59) {
      this.toastr.error("Invalid form", "Start minutes is invalid");
      return;
    }
    let timeslotRequestDTO = new TimeslotRequestDTO(startHH, startMM, this.theaterId);
    this.timeslotService.addTimeSlot(timeslotRequestDTO).subscribe({
      next: (response) => {
        this.theater?.timeslots.push(response);
        this.closeTimeslotModalButton?.nativeElement.click();
      },
      error: (error) => this.toastr.error("Error", error.message)
    });
  }

  openAddShowModal(): void {
    this.initAddShowModal();
    this.openAddShowModalButton?.nativeElement.click();
  }

  initAddShowModal(): void {
    this.addShowsForm.reset();
    this.refeshTimeSlotsCheckBoxes();
    this.addShowsForm.get("screenId")?.patchValue("0");
    this.addShowsForm.get("movieId")?.patchValue("0");
    this.minDate = DateUtils.getTodayDateString();
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
      this.toastr.error("Fill all fields", "Invalid form.");
      return;
    }
    let fromDate: Date = new Date(Date.parse(this.addShowsForm.get("fromDate")?.value));
    let toDate: Date = new Date(Date.parse(this.addShowsForm.get("toDate")?.value));
    let screenId = Number(this.addShowsForm.get("screenId")?.value);
    let movieId = Number(this.addShowsForm.get("movieId")?.value);
    let todayDate = new Date();
    if (fromDate < todayDate) {
      this.toastr.error("Error", "'From' date cannot be older than today.");
      return;
    }
    if (fromDate > toDate) {
      this.toastr.error("Error", "'To' date cannot be earlier than 'From' date.");
      return;
    }
    if (screenId == 0) {
      this.toastr.error("Error", "Please select a screen.");
      return;
    }
    if (movieId == 0) {
      this.toastr.error("Error", "Please select a movie.");
      return;
    }
    let formModel = this.generateShowtimeFormArray(fromDate, toDate, movieId, screenId);
    if (formModel.length == 0) {
      this.toastr.error("Error", "Please choose at least one timeslot.");
      return;
    }
    this.showtimeService.addShowtime(formModel).subscribe({
      next: (showtimes) => {
        showtimes.forEach(showtime => {
          this.theater?.showtimes.push(showtime);
        });
        this.closeAddShowModalButton?.nativeElement.click();
        this.toastr.success("Success", "Show added.")
      },
      error: (error) => this.toastr.error("Error", error.message),
      complete: () => { }
    });
  }

  generateShowtimeFormArray(fromDate: Date, toDate: Date, movieId: number, screenId: number): ShowtimeForm[] {
    let arr: ShowtimeForm[] = [];
    let currentDate = new Date(fromDate);
    while (currentDate <= toDate) {
      for (let i = 0; i < this.timeslotsFormChecksArray?.length; i++) {
        let timeslot = this.theater?.timeslots?.[i];
        if (timeslot != undefined && timeslot != null && this.timeslotsFormChecksArray.value[i]) {
          arr.push(new ShowtimeForm(this.theaterId, screenId, movieId, timeslot.id, new Date(currentDate)));
        }
      }
      currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
    }
    return arr;
  }

  get timeslotsFormChecksArray() {
    return this.addShowsForm.get('timeslotsFormChecks') as FormArray;
  }

  encryptedId(id: number): string {
    return this.encryption.encrypt(String(id));
  }

}
