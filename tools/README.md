# 常用的工具库

## 如果按需加载的话，使用如下方式引入
### 需注意，引入名需与包名相同

```
    import { copyNewValue } from 'hcttop-tools'
    copyNewValue()
```
## 如果一次引入，则可使用require方式全部导出

```
    const tools = require('hcttop-tools');
    //tools.copyNewValue()  //
```