import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TheaterFormModel } from 'src/app/model/theater-form.model';
import { Theater } from 'src/app/model/theater.model';
import { TheaterService } from 'src/app/services/theater/theater.service';

@Component({
  selector: 'app-theater-list',
  templateUrl: './theater-list.component.html',
  styleUrls: ['./theater-list.component.css']
})

export class TheaterListComponent implements OnInit {

  theaters: Theater[];
  userId: number;
  theaterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private theaterService: TheaterService,
    private toastr: ToastrService
  ) {
    this.theaters = [];
    this.userId = 0;
    this.theaterForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      numberOfScreens: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    if (localStorage.getItem("userId")) {
      this.userId = Number(localStorage.getItem("userId"));
      this.fetchTheaters();
    }
  }

  fetchTheaters(): void {
    this.theaterService.getAllTheatersOfOwner(this.userId).subscribe({
      next: (response) => this.theaters = response,
      error: (error) => this.toastr.error("Error", error.message),
      complete: () => { }
    });
  }

  submit(): void {
    let name: string = this.theaterForm.get("name")?.value;
    let location: string = this.theaterForm.get("location")?.value;
    let phoneNumber: string = this.theaterForm.get("phoneNumber")?.value;
    let numberOfScreens: string = this.theaterForm.get("numberOfScreens")?.value;
    if (this.theaterForm.invalid) {
      this.toastr.error("Error", "Invalid form");
      return;
    }
    let signUpFormModel: TheaterFormModel = new TheaterFormModel(this.userId, name, location, phoneNumber, Number(numberOfScreens));
    this.theaterService.registerTheater(signUpFormModel).subscribe({
      next: (response) => this.fetchTheaters(),
      error: (error) => this.toastr.error("Error", error.message),
      complete: () => { }
    });
  }
}
