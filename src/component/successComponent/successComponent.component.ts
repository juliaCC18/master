import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-successs',
  templateUrl: './successComponent.component.html',
  styleUrls: ['./successComponent.component.scss'],
})
export class SuccessComponent implements OnInit {
  public cardCode: any;
  public updateDate: any;
  public newLimitValue: any;
  dataList = [];
  cardId = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // 取路由里的值，如果可以用类似redux的东西就不需要传这么多值，可以只传一个id
    this.route.queryParams.subscribe(params => {
      this.cardCode = params['card_code'];
      this.newLimitValue = params['increase_limit'];
      let date = params['update_date'].replace(/\-/g, '\/'); 
      let finalDate = date.substring(0, 10);
      this.updateDate = finalDate;
  });
  }

  backPage() {
    window.history.back();
  }
}
