import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn:'root'
})
export class SecurityService {

  constructor() { }

  key = 'ayush1995';
  encrypt(data: any) {
    console.log('encrypt', data)
    return crypto.AES.encrypt(data, this.key).toString();
  }

  decrypt(data: any) {
    return crypto.AES.decrypt(data, this.key).toString(crypto.enc.Utf8);
  }
}
 