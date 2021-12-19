import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { DashboardService } from 'src/component/dashboardComponent/dashboard.component.service';

import '../../assets/mock/getCardList';
import '../../assets/mock/getDetailsInfo';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  optionList: string[] = [];
  selectedCards = 'Default';
  dataList: any[] = [];
  isLoading = false;
  editValue = '';
  submitEditValue = '';;
  maxAmount = 0;
  cardInfo = {
    cardCode: '',
    name: '',
    cardId: '0',
    cardType: 0,
    cardLimit: 0,
    updateDate: ''
  };

  //  chartDom选择
  chartDom = document.getElementById('main');

  // 转换卡号（卡号加密）
  strFormat(str: string) {
    let starStr = '';
    for (let i = 0; i < str.length - 4; i++) {
      starStr += '*';
    }
    return starStr + str.substring(str.length - 4, str.length);
  }

  maximumAmount: Observable<number> = this.dashboardService
    .getCardMaximumAmount('S0000001')
    .pipe(
      catchError(() => {
          this.router.navigate(['/error']);
          return of({ results: [] })
        }),
      map((res: any) => {
        return res.data;
      })
    );

  // 获取最大值
  getCardMaximumAmount(id: string) {
    this.dashboardService.getCardMaximumAmount(id).subscribe((data: any) => {
        if(data.status == 200) {
            this.maxAmount = data.data;
            this.initCharts();
            return data.data;
        } else {

        }
    });
    this.editValue = this.formatMoney(this.cardInfo.cardLimit.toString(), 2);
  }

  // 获取card详细信息
  getCardDetails(value: string) {
    let cardInfo = new Promise((resolve, reject) => {
      this.dataList.map((item) => {
        if (item.name == value) {
          this.cardInfo.cardId = item.id;
          this.cardInfo.cardCode = this.strFormat(item.code);
          this.cardInfo.name = item.name;
          this.cardInfo.cardType = item.type;
          this.cardInfo.cardLimit = item.limit;
          this.editValue = item.limit;
          this.cardInfo.updateDate = item.update_date;
        }
        return this.cardInfo;
      });
      resolve(this.cardInfo);
    });
    return cardInfo;
  }

  // 选择不同的Card
  onChange(value: string) {
    this.getCardDetails(value).then((data) => {
      this.getCardMaximumAmount(this.cardInfo.cardId);
      this.submitEditValue = this.cardInfo.cardLimit.toString();
    });
  }

  /* eslint-disable @typescript-eslint/no-explicit-any */
  getRandomNameList: Observable<string[]> = this.http
    .get('/data/getCardList')
    .pipe(
      catchError(() => {
          this.router.navigate(['/error']);
          return of({ results: [] });
        }),
      map((res: any) => {
          if(res.status == 200) {
            return res.data;
          } else {
            this.router.navigate(['/error']);
          }
      })
    )
    .pipe(
      map((list: any) =>
        list.map((item: any, index: number) => {
          this.dataList.push(item);
          if (index == 0) {
            this.cardInfo.cardId = item.id;
            this.cardInfo.cardCode = this.strFormat(item.code);
            this.cardInfo.name = item.name;
            this.cardInfo.cardType = item.type;
            this.cardInfo.cardLimit = item.limit;
            this.editValue = item.limit;
            this.getCardMaximumAmount(item.id);
            this.submitEditValue = item.limit.toString();
            this.cardInfo.updateDate = item.update_date;
          }
          return `${item.name}`;
        })
      )
    );

  // 初始化charts
  initCharts() {
    echarts.use([GaugeChart, CanvasRenderer]);
    let chartDom = document.getElementById('limitChart')!;
    let limitChart = echarts.init(chartDom);
    let option;

    let gauageDateValue = (
      (Number(this.cardInfo.cardLimit) / Number(this.maxAmount)) *
      100
    ).toFixed(2);

    const gaugeData = [
      {
        value: gauageDateValue,
        name: 'Available Limit',
        title: {
          offsetCenter: ['0%', '-20%'],
        },
        detail: {
          valueAnimation: true,
          offsetCenter: ['0%', '20%'],
        },
      },
    ];
    option = {
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: {
            show: false,
          },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
          },
          axisLine: {
            lineStyle: {
              width: 20,
            },
          },
          splitLine: {
            show: false,
            distance: 0,
            length: 10,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
            distance: 50,
          },
          data: gaugeData,
          title: {
            fontSize: 14,
          },
          detail: {
            width: 100,
            height: 20,
            fontSize: 14,
            color: 'auto',
            borderColor: 'auto',
            borderRadius: 20,
            borderWidth: 1,
            formatter: `$ ${this.cardInfo.cardLimit}`,
          },
        },
      ],
    };
    option && limitChart.setOption(option);
  }

  // 格式化金额
  formatMoney(string: string, n: number) {
    // n为保留几位小数
    n = n > 0 && n <= 20 ? n : 2;
    string = parseFloat((string + '').replace(/[^\d\.-]/g, '')).toFixed(n);
    let left = string.split('.')[0].split('').reverse(),
      right = string.split('.')[1];
    let t = '';
    for (let i = 0; i < left.length; i++) {
      t += left[i] + ((i + 1) % 3 == 0 && i + 1 != left.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + right;
  }

  //  禁止输入其他字符 
  keypressValue(value: any) {
    if (
      (value.keyCode != 46 && value.keyCode != 45 && value.keyCode < 48) ||
      value.keyCode > 57
    ) {
      value.returnValue = false;
    }
  }

  // 改变时触发
  changeValue(value: string) {
    if (value.length == 0) {
      this.submitEditValue = '0';
      this.editValue = '0';
    } else {
      this.editValue = value;
      this.submitEditValue = value;
    }
  }

  // 聚焦时触发
  formatChangeValue() {
    this.editValue = parseFloat(this.submitEditValue).toFixed(2);
  }

  // 失焦时触发
  fomartValue() {
    this.submitEditValue = this.editValue;
    if (this.submitEditValue.length == 0) {
      this.submitEditValue = '0.00';
      this.editValue = '0.00';
    } else {
      this.editValue = this.formatMoney(this.editValue, 2);
    }
  }

  // 提交相关信息
  submitInfo(id: string): void {
    if (this.submitEditValue[0] == '0') {
      this.submitEditValue = this.submitEditValue.substring(1);
    }
    this.submitEditValue = parseFloat(this.submitEditValue).toFixed(2);
    if (parseFloat(this.submitEditValue) > Number(this.maxAmount)) {
      this.msg.error('新晋额度不允许超过最大额！');
      return;
    }

    if (
      parseFloat(this.submitEditValue) < this.cardInfo.cardLimit ||
      parseFloat(this.submitEditValue) == this.cardInfo.cardLimit
    ) {
      this.msg.error('新晋额度必须大于当前额度！');
      return;
    }

    this.dashboardService
      .updateCardLimit(id, this.submitEditValue)
      .subscribe((data: any) => {
        if (data.status == 200) {
            // 为了使首页数据同步更新因此做了此操作
          this.dataList = data.data;
            //   这里提取detail页面显示的数据，这里正常是只传id，暂时这样写，可以进行优化，因为时间短暂还需要后续进行学习
            //   调用详情接口，获取详情数据
          this.getCardDetails(this.cardInfo.name).then((data) => {
                this.dashboardService.getCardMaximumAmount(this.cardInfo.cardId).subscribe((data: any) => {
                    if(data.status == 200) {
                        this.maxAmount = data.data;
                        return data.data;
                    } else {
                       this.router.navigate(['/error']);
                    }
                });
                this.editValue = this.formatMoney(this.cardInfo.cardLimit.toString(), 2);

                // 提升额度后，给用户发送已成功处理的信息，跳转页面
                this.dashboardService
                  .sendSuccessInfo()
                  .subscribe((data: any) => {
                    if (data.status == 200) {
                      this.router.navigate(['/success'], {
                        queryParams: {
                          card_id: `${this.cardInfo.cardId}`,
                          increase_limit: `${this.cardInfo.cardLimit}`,
                          card_code: `${this.cardInfo.cardCode}`,
                          update_date: `${this.cardInfo.updateDate}`,
                        },
                      });
                    } else {
                      this.router.navigate(['/error']);
                    }
                  });
          });
          return;
        } else {
          this.router.navigate(['/error']);
        }
      });
  }

  constructor(
    public http: HttpClient,
    private msg: NzMessageService,
    private dashboardService: DashboardService,
    private router: Router // private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadMore();
    this.fomartValue();
  }

  loadMore(): void {
    this.getRandomNameList.subscribe((data) => {
      this.optionList = [...this.optionList, ...data];
    });

    this.maximumAmount.subscribe((data) => {
      this.maxAmount = parseFloat(JSON.stringify(data));
      return data;
    });
  }
}
