import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShowtimeForm } from 'src/app/model/showtime-form.model';
import { Theater } from 'src/app/model/theater.model';
import { TimeslotRequestDTO } from 'src/app/model/timeslot-request-dto.model';
import { ShowtimeService } from 'src/app/services/showtime/showtime.service';
import { TheaterService } from 'src/app/services/theater/theater.service';
import { TimeslotService } from 'src/app/services/timeslot/timeslot.service';

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
    this.addTimeslotsForm = this.formBuilder.group({
      startHH: ['', Validators.required],
      startMM: ['', Validators.required]
    });
    this.addShowsForm = this.formBuilder.group({
      timeslotsFormChecks: this.formBuilder.array([]),
      dayToday: [false, Validators.required],
      dayTomorrow: [false, Validators.required],
      dayThisWeek: [false, Validators.required],
      dayNextWeek: [true, Validators.required],
      screenId: ["0", Validators.required],
      movieId: ["0", Validators.required]
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
    this.closeAddShowFormModalButton?.nativeElement.click();
    let movieId: string = this.addShowsForm.get("movieId")?.value;
    let formModel: ShowtimeForm[] = [];
    for(let i=0; i< this.timeslotsFormChecksArray?.length; i++){
      let timeslot = this.theater?.timeslots?.[i];
      if(timeslot != undefined && timeslot!=null && this.timeslotsFormChecksArray.value[i]){
        formModel.push(new ShowtimeForm(Number(movieId), 2, this.theaterId, timeslot.id));
      }
    }
    this.showtimeService.addShowtime(formModel).subscribe({
      next: (showtime) => alert("Added."),
      error: (error) => alert(error.status + ":" + error.message),
      complete: () => { }
    });
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
