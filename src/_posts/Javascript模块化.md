---
title: Javascript模块化
date: 2022-01-06 10:47:00
tags:
 - JS模块化
 - JavaScript
---

最近面试被问到了JS模块化有哪些以及他们的区别，之前一直都没怎么看懂，这次彻底看懂了，把它记录下来给需要的人看。

<!-- more -->

### 无模块化
以前JS写法没有模块化概念，需要什么文件直接引入到项目中就行。如果文件直接有依赖，被依赖的文件须放在前面，否则使用的时候就会报错。

缺点：
- 污染全局作用域
- 维护成本高
- 依赖关系不明显

### CommonJS规范
该规范最初是用在node服务中，他有四个重要的环境变量为模块化的实现提供支持：**module**，**exports**，**require**，**global**。实际使用时，用**module.exports**定义当前模块对外输出的接口，用**require**加载模块。

优点：
- 解决了依赖，全局变量污染的问题

缺点：
- CommonJS采用同步的方式加载模块，由于网络的限制，不适合浏览器端模块加载

### AMD规范
AMD规范是非同步加载模块，允许指定回调函数。AMD是RequireJS在推广过程中对模块定义的规范化产出，推崇依赖前置，提前执行。

AMD标准中，定义了三个API：
- **require([module], callback)**
- **define(id, [depends], callback)**
- **require.config()**

即通过define来定义一个模块，然后使用require来加载一个模块，使用require.config()指定引用路径

使用步骤：
- 首先在require.js管网下载最新版，然后引入页面
```js
<script data-main="./alert" scr="./require.js"></script>
```

- 定义模块
```js
// alert.js
define(function() {
  var alertName = function(str) {
    alert("I am" + str);
  }
  var alertAge = fucntion(age) {
    alert("I am" + age + "years old");
  }
  return {
    alertName: alertName,
    alertAge: alterAge
  }
});
```
- 引用模块
```js
require(["alert"], function(alert) {
  alert.alertName("Bob");
  alert.alertAge(27);
});
```
优点：
- 适合在浏览器环境中异步加载模块，并行加载多个模块

缺点：
- 不能按需加载，开发成本大


### CMD规范
CMD是SeaJS在推广过程中对模块定义的规范化产出，推崇依赖就近，延迟执行。

写法：
```js
// AMD写法
define(["a", "b", "c", "d"], function(a, b, c, d) {
  // 在最前面声明并初始化要用到的模块
  a.doSomething();
  if (false) {
    // 即使没用到某个模块b，但b还是提前执行了
    b.doSomething();
  }
});

// CMD写法
define(function(require, exports, module) {
  var a = require("./a"); // 在需要时声明
  a.doSomething();
  if (false) {
    var b = require("./b");
    b.doSomething();
  }
});
```
很明显，CMD是按需加载，就近原则。

### ES6模块化
在ES6中，我们可以使用import关键字引入模块，通过exports关键字导出模块，功能较前几个方案更为强大，也是我们所推崇的。
```js
// 定义模块 utils.js
var baseNum = 0;
var sum = function(a, b) {
  return a + b;
}
export {
  baseNum,
  sum
}

// 引用模块
import { baseNum, sum } from "./utils";
funtion test(ele) {
  ele.textContent = sum(10 + baseNum);
}
```
ES6在导出的时候有个默认导出**export default**，使用他导出后，在import的时候，不需要加上{}，模块名字可以随意取。该名字实际上就是个对象，包含导出模块里面的函数或者变量。
```js
// 定义输出
export default { baseNum, sum };

// 引入
import utils from "./utils";
function test(ele) {
  ele.textContent = utils.sum(10 + utils.baseNum);
}
```
一个模块只能有一个export default

