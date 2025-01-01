import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ShowtimeForm } from 'src/app/model/showtime-form.model';
import { Theater } from 'src/app/model/theater.model';
import { TimeslotRequestDTO } from 'src/app/model/timeslot-request-dto.model';
import { Timeslot } from 'src/app/model/timeslot.model';
import { ShowtimeService } from 'src/app/services/showtime/showtime.service';
import { TheaterService } from 'src/app/services/theater/theater.service';
import { TimeslotService } from 'src/app/services/timeslot/timeslot.service';

@Component({
  selector: 'app-theater-actions',
  templateUrl: './theater-actions.component.html',
  styleUrls: ['./theater-actions.component.css']
})
export class TheaterActionsComponent {

  theaterId: number;
  theater!: Theater;
  addTimeslotsForm: FormGroup;
  addShowsForm: FormGroup;
  timeslots: Timeslot[];

  @ViewChild('cancelAddTimeslotsModalButton') modalCloseBtn!: ElementRef;

  constructor(
    private theaterService: TheaterService,
    private activatedroute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private showtimeService: ShowtimeService,
    private timeslotService: TimeslotService
  ) {
    if (this.activatedroute.snapshot.paramMap?.has("theaterId")) {
      this.theaterId = Number(this.activatedroute.snapshot.paramMap.get("theaterId"));
      this.fetchData();
    }
    this.theaterId = 0;
    this.timeslots = [];
    this.addTimeslotsForm = this.formBuilder.group({
      startHH: ['', Validators.required],
      startMM: ['', Validators.required]
    });
    this.addShowsForm = this.formBuilder.group({});
  }

  fetchData(): void {
    this.theaterService.getTheaterById(this.theaterId).subscribe({
      next: (response) => {
        this.theater = response;
        this.timeslots = this.theater.timeslots;
      },
      error: (error) => {
        alert(error);
      },
      complete: () => { }
    });
  }

  submitTimeslotForm(): void {
    if (this.addTimeslotsForm.invalid) {
      alert("Invalid form");
      return;
    }
    this.modalCloseBtn.nativeElement.click();
    let startHH = this.addTimeslotsForm.get("startHH")?.value;
    let startMM = this.addTimeslotsForm.get("startMM")?.value;
    let timeslotRequestDTO = new TimeslotRequestDTO(Number(startHH), Number(startMM), this.theater.id);
    this.timeslotService.addTimeSlot(timeslotRequestDTO).subscribe({
      next: (response) => { this.timeslots.push(response) },
      error: (error) => { alert(error.message); }
    });

  }

  submitShowsForm(): void {
    if (this.addShowsForm.invalid) {
      alert("Invalid form.");
      return;
    }
    let movieId: string = this.addShowsForm.get("movieId")?.value;
    let formModel: ShowtimeForm[] = [];
    formModel.push(new ShowtimeForm(Number(movieId), 2, this.theaterId, 9, 30));
    formModel.push(new ShowtimeForm(Number(movieId), 2, this.theaterId, 1, 0));
    formModel.push(new ShowtimeForm(Number(movieId), 2, this.theaterId, 5, 0));
    formModel.push(new ShowtimeForm(Number(movieId), 2, this.theaterId, 7, 0));
    this.showtimeService.addShowtime(formModel).subscribe({
      next: (showtime) => {
        alert("Added.")
      },
      error: (error) => {
        alert(error.status + " " + error.message);
      },
      complete: () => { }
    });
  }

}
