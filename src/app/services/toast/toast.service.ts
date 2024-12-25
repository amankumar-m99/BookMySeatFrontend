import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<{ message: string; duration: number }>();
  toast$ = this.toastSubject.asObservable();

  showToast(message: string, duration: number = 3000): void {
    this.toastSubject.next({ message, duration });
  }
}
