import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:typedef
  getCardMaximumAmount(id: string) {
    return this.http.post<any>('/data/getDetailsInfo', id);
  }

  updateCardLimit(id: string, cardLimit: any) {
    const options = {
      cardId: id,
      cardLimit: cardLimit,
    };
    return this.http.post<any>('/data/updateCardList', options);
  }

  sendSuccessInfo() {
    return this.http.get<any>('/data/sendSuccessInfo');
  }
}
