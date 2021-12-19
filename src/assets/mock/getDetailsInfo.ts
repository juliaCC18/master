import * as Mock from "mockjs";

// 获取最大额度值
Mock.mock('/data/getDetailsInfo', 'post', function (option: any) {
    const data = [
      {
        id: 'S0000001',
        maximumAmount: 144000.00
      },
      {
        id: 'S0000002',
        maximumAmount: 156000.00
      },
      {
        id: 'S0000003',
        maximumAmount: 132000.00
      },
      {
        id: 'S0000004',
        maximumAmount: 179000.00
      }, 
      {
        id: 'S0000005',
        maximumAmount: 167000.00
      },
      {
        id: 'S0000006',
        maximumAmount: 115000.00
      }
    ];

    let result = data.filter(item => {
      return item.id == option.body
     });

     if (result) {
       return Mock.mock({
         status: 200,
         message: '成功获得最大值信息',
         data: result[0].maximumAmount.toFixed(2),
       });
     } else {
       return Mock.mock({
         status: 500,
         message: '操作失败',
       });
     }
  });