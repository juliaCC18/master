import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// 测试是否可以引入mock数据
// if (environment.isMock) {
//   import('./assets/mock/cardList').then(res => {
//     console.log('引入mock数据成功', res)
//   })
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
