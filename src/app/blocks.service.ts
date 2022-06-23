import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlocksService {
  email = 'battistafranco@gmail.com';
  baseUrl = 'https://rooftop-career-switch.herokuapp.com/';
  tokenEndpoint = 'token?email=';
  blockEndpoint = 'blocks?token=';
  checkEndpoint = 'check?token=';
  token = '';
  constructor(public http: HttpClient) {}



  public getToken() {
    return this.http.get(`${this.baseUrl}${this.tokenEndpoint}${this.email}`);
  }

  public getBlock(token: string) {
    return this.http.get(`${this.baseUrl}${this.blockEndpoint}${token}`);
  }

  public buildPayload(blocks: Array<string>, isFinal: boolean) {
    let payload = {};
    if (isFinal) {
      payload = {
        encoded: blocks.join(''),
      };
    } else {
      payload = {
        blocks,
      };
    }

    return payload;
  }

  public async postCheck(payload: any, token: string) {
    const result$ = this.http.post(
      `${this.baseUrl}${this.checkEndpoint}${token}`,
      payload
    );

    const result = (await lastValueFrom(result$)) as any;

    return result.message;
  }
}
