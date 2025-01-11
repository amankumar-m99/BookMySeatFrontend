import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { AppData } from 'src/app/data/app.data';
import { UserPersonalDetails } from 'src/app/model/user-personal-details.model';
import { ProfilePicService } from 'src/app/services/profile-pic/profile-pic.service';
import { UserPersonalDetailsService } from 'src/app/services/user/user-personal-details.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user?: UserPersonalDetails;
  profilePicSrc = "../../../assets/logo.png";
  fileName = "";
  imageChangedEvent: any = '';
  selectedFile!: File;

  imageCroppedEvent!: ImageCroppedEvent;
  croppedImage: any = '';
  transform: ImageTransform = {};

  @ViewChild('profilePic') profilePic!: ElementRef;
  @ViewChild('fileInputTag') fileInputTag!: ElementRef;
  @ViewChild('profilePicPreviewModalCloseButton') profilePicPreviewModalCloseButton!: ElementRef;
  @ViewChild('profilePicPreviewModalLaunchButton') profilePicPreviewModalLaunchButton!: ElementRef;

  constructor(
    private userService: UserPersonalDetailsService,
    private profilePicService: ProfilePicService,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if (AppData.isLoggedIn()) {
      this.profilePicSrc = AppData.baseUrl + "/image/profile-pic/" + localStorage.getItem("userId");
      this.fetchData(Number(localStorage.getItem("userId")));
    }
  }

  fetchData(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (response) => this.user = response,
      error: (error) => this.toastr.error("Error", error.message)
    });
  }

  fileChangeEvent(event: any): void {
    if (event.srcElement.files.length < 1) {
      this.toastr.info("No files selected.");
      return;
    }
    this.imageChangedEvent = event;
    this.fileName = event.srcElement.files[0].name;
  }

  openFileChooser() {
    this.fileInputTag.nativeElement.click();
  }

  closeProfilePicPreviewModal() {
    this.profilePicPreviewModalCloseButton.nativeElement.click();
  }

  uploadProfilePic(): void {
    if (this.imageCroppedEvent.blob != null) {
      const file = new File([this.imageCroppedEvent.blob], this.fileName);
      this.profilePicSrc = "";
      this.profilePicService.uploadProfilePic(Number(localStorage.getItem("userId")), file).subscribe({
        next: (response) => {
          if (response) {
            this.toastr.success("Success", "Profile pic updated");
          }
          else {
            this.toastr.error("Error", "Profile pic not updated");
          }
        },
        error: (error) => {
          this.toastr.error("Error", error.message);
        },
        complete: () => {
          this.closeProfilePicPreviewModal();
        }
      });
    }
  }

  openProfilePicPreviewModal() {
    this.profilePicPreviewModalLaunchButton.nativeElement.click();
  }

  imageCropped(event: ImageCroppedEvent) {
    let testStr: string = "";
    if (typeof event.objectUrl == "string") {
      testStr = event.objectUrl;
    }
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(testStr);
    // event.blob can be used to upload the cropped image
    this.imageCroppedEvent = event;
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
    this.openProfilePicPreviewModal();
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }

  rotateLeft() {
    this.transform = {
      ...this.transform,
      rotate: (this.transform.rotate || 0) - 90,
    };
  }

  rotateRight() {
    this.transform = {
      ...this.transform,
      rotate: (this.transform.rotate || 0) + 90,
    };
  }

}
