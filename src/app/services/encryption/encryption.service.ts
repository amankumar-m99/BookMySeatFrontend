import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class EncryptionService {
  private secretKey = 'your-secret-key';

  encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  decryptRouteParam(activatedRoute: ActivatedRoute, param: string): string {
    let result = "";
    if (activatedRoute.snapshot.paramMap?.has(param)) {
      let obj = activatedRoute.snapshot.paramMap.get(param);
      if (obj != undefined && obj != null) {
        result = this.decrypt(obj);
      }
    }
    return result;
  }
}
