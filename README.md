# vxp

WEB 应用插件化框架。

## 使用

``` js
import Vxp, { VueAdapter } from "vxp";

const viewAdapter = new VueAdapter();
const plugins = [];

new Vxp(viewAdapter).use(plugins).render("#app");
```
