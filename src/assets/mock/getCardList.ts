import * as Mock from 'mockjs';

const defaultData = [
  {
    id: 'S0000001',
    name: 'Coles Rewards MasterCard',
    code: '520202112151111',
    type: 0,
    limit: 35400.26,
    update_date: '2021/12/18',
  },
  {
    id: 'S0000002',
    name: 'Woolworths Rewards MasterCard',
    code: '520202112152222',
    type: 0,
    limit: 37900.55,
    update_date: '2021/12/18',
  },
  {
    id: 'S0000003',
    name: 'Aldi Rewards MasterCard',
    code: '520202112153333',
    type: 1,
    limit: 39200.43,
    update_date: '2021/12/18',
  },
  {
    id: 'S0000004',
    name: 'Coles Low rate Mastercard',
    code: '520202112152334',
    type: 0,
    limit: 38500.67,
    update_date: '2021/12/18',
  },
  {
    id: 'S0000005',
    name: 'Woolworths Low rate Mastercard',
    code: '520202112155555',
    type: 1,
    limit: 42200.82,
    update_date: '2021/12/18',
  },
  {
    id: 'S0000006',
    name: 'Aldi Low rate Mastercard',
    code: '520202112156666',
    type: 1,
    limit: 52600.65,
    update_date: '2021/12/18',
  },
];

Mock.mock('/data/getCardList', 'get', {
  status: 200,
  message: '获取列表成功',
  data: defaultData,
});

Mock.mock('/data/updateCardList', 'post', function (option: any) {
  let data;
  if (option.body != null) {
    let options = JSON.parse(option.body);

    data = defaultData.map((item) => {
      if (item.id == options.cardId) {
        item.limit = options.cardLimit;
        let date = new Date();
        let getMonth =
          date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
        let getDay = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
        let getHour =
          date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let getMinutes =
          date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        let second =
          date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();
        let dateFormat = `${date.getFullYear()}-${getMonth}-${getDay} ${getHour}:${getMinutes}:${second}`;
        item.update_date = dateFormat;
      }
      return item;
    });

    if (data) {
      return Mock.mock({
        status: 200,
        message: '更新成功',
        // 此处不该返值，但是为了数据同步更新，因此在此处返回了值
        data: data,
      });
    } else {
      return Mock.mock({
        status: 500,
        message: '更新失败',
        data: defaultData
      });
    }
  }
});

Mock.mock('/data/sendSuccessInfo', 'get', {
  status: 200,
  message: '已成功提升额度',
});
