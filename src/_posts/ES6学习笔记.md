---
title: ES6学习笔记
date: 2019-07-14 11:08:00
tags:
 - ES6
 - JavaScript
---

2015年发布的ES6语法，直到2018年才正式接触到，这次的发版提供了很多新语法。对于开发来说，还大大地简化了代码量。

<!-- more -->

## ECMAScript6简介
#### Babel转码器
- 作用：可以将ES6代码转为ES5代码
- 配置文件：.babelrc 存放在项目的根目录下，用来设置转码规则和插件
- 安装：
```
npm install --save-dev babel-preset-lastest (最新规则)
npm install --save-dev babel-preset-react (react规则)
```

## let和const
#### let
- 声明变量，只在let命令所在的代码块内有效
- 声明的变量一定要在声明后使用，否则报错
- 不允许重复声明变量
- 可以在块级作用域中声明函数，在块级作用域之外不可引用
#### const
- 只读常量，一旦声明，常量的值不再改变
- 一旦声明立刻初始化，否则会报错。
- 只在声明所在的块级作用域内有效
- 不可重复声明，保证的是变量指向的内存地址不得改动

## Symbol
symbol是JS语言的第七种数据类型，表示独一无二的值。更多使用于对象的属性命名，防止属性名的冲突。

每一个Symbol值都是不相等的，用于对象的属性名时，就能保证不会出现同名的属性。这个对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。
```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = "hello!";

// 第二种写法
let a = {
  [mySymbol]: "hello!"
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: "hello!" });

// 以上写法都得到同样结果
a[mySymbol] // "hello!"
```
注意：
- Symbol值作为对象名时，不能用点运算符
- 在对象内部，使用Symbol值定义属性时，Symbol值必须放在方括号中
- Symbol值作为属性名时，该属性还是公开属性，不是私有属性
- Symbol作为属性名，遍历对象的时候，该属性不会出现在for...in，for...of循环中，也不会被Object.keys()，Object.getOwnPropertyNames()，JSON.stringify()返回

## 变量的解构赋值
####  数组的解构赋值
- ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值
```js
let [a, b, c] = [1, 2, 3];
```
#### 对象的解构赋值
- 变量必须与属性同名
```js
let {foo, bar} = {foo: 'aaa', bar: 'bbb'};
```
- 内部机制：先找到同名属性，然后再赋值给对应的变量，真正被赋值的是后者，而不是前者
- 对象的解构赋值也可以指定默认值，生效的前提是对象的属性值严格等于undefined
#### 字符串的解构赋值
- 字符串此时被转换成了一个类似数组的对象
```js
const [a, b, c, d, e] = 'hello';
```
#### 数值和布尔值的解构赋值
```js
let {toString: s} = 123;
let {toString: s} = true;
```
- 解构赋值规则：只要等号右边的值不是对象或数组，就先将其转为对象
#### 函数参数的解构赋值
```js
function add([x, y]) {
  return x + y;
}
add([1, 2]); // 3
```
#### 不使用圆括号的情况
- 变量声明语句
```js
let [(a)] = [1];
```
- 函数参数
```js
function f([(z)]) {
  return z;
}
```
- 赋值语句的模式
```js
({p: a}) = {p: 42};
```
- 可以使用圆括号的情况：赋值语句的非模式部分
#### 用途
- 变换变量的值
```js
let x = 1;
let y = 2;
[x, y] = [y, x];
```
- 从函数返回多个值
```js
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
```
- 函数参数的定义
- 提取JSON数据
- 函数参数的默认值
- 遍历Map结构
- 输入模块的指定方法

## 字符串的扩展
- 字符的Unicode表示法：'\uxxxx'
- codePointAt()：能够正确处理4个字节储存的字符，返回一个字符的码点
- String.fromCodePoint()：用于从码点返回对应字符
- 字符串的遍历器接口：for...of
- at()：返回字符串给定位置的字符
- includes()：返回布尔值，表示是否找到参数字符串
- startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部
- endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部
- repeat()：返回新字符串，表示将原字符值重复n次
```js
'x'.repeat(3); // 'xxx'
```

## 数值的扩展
- 二进制表示：前缀0b or 0B，八进制表示：前缀0o or 0O
- Number.isFinite()：判断数值是否为有限的，非数值一律返回false
- Number.isNaN()：只有对NaN才返回true，非NaN一律返回false
- Number.parseInt(), Number.parseFloat()
- Number.isInteger()：判断一个值是否为整数
- Number.EPSILON：极小常数  2.220446049250313e-16
- Number.isSafeInteger()：判断一个整数是否在安全范围内
```
整数范围：-2^53 - 2^53
最大值: Number.MAX_SAFE_INTEGER
最小值: Number.MIN_SAFE_INTEGER
```
- Math对象的扩展
```
Math.trunc()：除一个数的小数部分，返回整数部分
Math.sign()：判断一个数到底是正数(+1),负数(-1),零(+0,-0),还是其他值(NaN)
Math.cbrt()：计算一个数的立方根
Math.clz32()：返回一个数的32位无符号整数形式有多少个前导0
Math.imul()：返回两个数以32位带符号整数形式相乘的结果
Math.hypot()：返回所有参数的平方和的平方根
```
- 指数运算符：**
- 对数方法
```
Math.expml()：e^x - 1
Math.log1p()：Math.log(1 + x), x小于-1返回NaN
Math.log1o()：Math.log2(x), x小于0返回NaN
```
- Integer数据类型
```
运算：几乎所有的Number运算符都可以用在Integer
Integer类型不能与Number类型进行混合运算
双等==不可以混合运算，全等===可以混合运算
```

## 函数的扩展
- rest参数：形式为...变量名，用于获取函数的多余参数
```
注意：
rest参数之后不能再有其他参数
函数的length(计算函数参数个数)属性，不包括rest参数
```
- 严格模式：只要函数参数使用了默认值，解构赋值或者扩展运算符，就不能设定为严格模式
```
规避这种限制：
1.设定全局的严格模式
2.把函数包在一个无参数的立即执行函数里面
```
- name属性：返回该函数的函数名
```
Function构造函数返回的函数实例，name属性的值为anonymous
bind返回的函数，name属性值会加上bind前缀
function foo() {}; foo.bind({}).name
```
- 箭头函数：ES6允许使用箭头(=>)定义函数
```js
let f = v => v;
let f = function(v) {
  return v;
}
// 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
```
- 绑定this：函数绑定运算符是并排两个冒号(::),双冒号左边是一个对象，右边是一个函数

## 数组的扩展
- 扩展运算符：(...) 可以展开数组
```
应用：
合并数组：[1, 2, ...more]
与解构赋值结合：const [first, ...rest] = [1, 2, 3, 4, 5]
函数返回值：可以返回多个值
字符串：[...'hello'] // ['h', 'e', 'l', 'l', 'o']
```
- Array.from()：用于将两类对象转为真正的数组
- Array.of()：用于将一组值转换为数组
- 数组实例的copyWithin()：在当前数组内部，将指定位置的成员复制到其他位置；接收三个参数：target(起始位置开始替换)，start(从该位置开始读取数据)，end(到该位置前停止读取数据)
- 数组实例的find()和findIndex()：找出第一个符合条件的数组成员和他所在位置
- fill()：用给定值填充一个数组，常用于空数组初始化
- keys()：对键名的遍历
- values()：对键值的遍历
- entries()：对键值对的遍历
- includes()：返回布尔值，表示某个数组是否包含给定的值

## 对象的扩展
- object.is()：用来比较两个值是否严格相等
```js
// 不同之处：+0 != -0, NaN等于自身
+0 === -0 // true
NaN === NaN // false
Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```
- Object.assign()：用于对象的合并
```
为对象添加属性和方法
克隆对象
合并多个对象
为属性指定默认值
```
- keys(), values(), entries()
- Object.getPropertyDescriptors()：返回某个对象属性的描述对象
- Null传导运算符：?. 只要其中一个返回null或undefined，就不再往下运算，而是返回undefined
```
obj?.prop or obj?.expr // 读取对象属性
func?.(...args) //函数或对象方法的调用
new C?.(...args) //构造函数的调用
```
- Symbol：原始数据类型(独一无二，防止对象的属性重名)
```js
let s = Symbol()
typeof s // symbol
```
```
Symbol值不能与其他类型进行运算，但可以显示转为字符串和布尔值，但不能转为数组
属性名的遍历：Object.getOwnPropertySymbols()返回一个数组，成员是当前对象的所有用作属性名的symbol值
Symbol.for()：判断有没有这个值，有返回这个值，没有返回一个新的Symbol值
Symbol.keyFor()：返回一个已登记的Symbol类型值的key
```

## Set数据结构
- 类似数组，成员值唯一
- 在Set内部，两个NaN相等，而两个对象不相等
- 实例属性：Set.prototype.constructor:构造函数，默认是Set函数；Set.prototype.size():返回Set实例的成员总数
- 操作方法：add(value),delete(value),has(value),clear()
- 遍历操作：keys(),values(),entries(),forEach()

## WeakSet数据结构
- 成员值唯一，但成员只能是对象(弱引用，不使用时回收)，成员个数不确定，不可遍历
- 方法：WeakSet.prototype.add(value), WeakSet.prototype.delete(value), WeakSet.prototype.has(value)
- 用途：存储DOM节点，不用担心DOM节点从文档移除时，引发内存泄漏

## Map数据结构
- 类似对象(键值对集合)，键的范围不限于字符串，各种类型的值都可以当作键
- 属性：size(返回Map结构的成员总数)
- 方法：set(key, value)：设置键名和对应值;
- get(key)：取key对应的值;
- has(key)
- delete(key)
- clear()
- 遍历方法：keys(), values(), entries(), forEach()

## WeakMap数据结构
- 用于生成键值对的集合
- 与Map区别：1.只接受对象作为键名(null除外), 2.WeakMap的键名所指向对象不计入垃圾回收机制
- 应用：在网页的DOM元素上添加数据
- 方法：get(), set(), has(), delete()

## Proxy
- 用于修改某些操作的默认行为
- 方法：get(): 拦截读取操作;
- set(): 拦截赋值操作;
- apply(): 拦截函数的调用;
- has(): 拦截hasProperty操作; 
- construct(): 拦截new命令;
- deleteProperty(), defineProperty(), getOwnPropertyDescriptor(), getPrototypeof()

## Reflect
- 将object对象一些明显属于语言内部方法放到Reflect对象上
- 修改某些object方法的返回结果，让其变得合理
- 让object操作都变成函数行为
- Reflect对象的方法与Proxy对象的方法一一对应

## Promise对象
- 是异步编程的一种解决方案
- 是一个容器，里面保存着某个未来才会结束的事件
- 是一个对象，从它可以获取异步操作的消息
- 特点：对象的状态不受外界影响(pending, fulfilled, rejected), 一旦状态改变，就不会再变
- 创造Promise实例
```js
var promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */) {
    resolve(value);
  } else {
    reject(error);
  }
});
// resolve函数作用：将Promise对象的状态从“未完成”变成“成功”
// reject函数作用：将Promise对象的状态从“未完成”变成“失败”
// Promise新建后立即执行
```
- 方法：Promise.prototype.then():为Promise实例添加状态改变时的回调函数，Promise.prototype.catch():用于指定发生错误时的回调函数，Promise.all():将多个Promise实例包装成一个新的Promise实例

## Iterator 和 for...of循环
- Iterator概念：遍历器，接口，为不同数据结构提供统一的访问机制，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”
- 原生具备Iterator接口的数据结构如下：Array, Map, Set, string, TypedArray, 函数的arguments对象
- 方法：next():返回value和done，必须部署，return(),throw()：可选部署
- for...of循环：使用范围：Set, Map, arguments对象, DOM, NodeList对象, Generator对象, 字符串, 数组
- for...in缺点：数组的键名是数字，for...in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型键上的值，某些情况下，for...in循环会以任意 顺序遍历键名
- for...of优点：有着同for...in一样简洁语法，但是没有for...in那些缺点；不同于forEach方法，他可以与break, continue和return配合使用；提供了遍历所有数据结构的统一操作接口

## Generator函数
- 概念：提供一种异步编程解决方案，返回遍历器对象
- 特征：function关键字与函数名之间有一个星号(*), 函数内部使用yield表达式；
- Generator函数分段执行，yield表达式是暂停执行标记，next方法可以恢复执行
- yield表达式只能用在Generator函数内部，用在其他地方会报错
- yield表达式如果用在另一个表达式中，必须放在圆括号里面
- next方法的参数：表示上一个yield表达式的返回值
- for...of循环：一旦next方法的返回对象的done属性为true，循环就会终止
- 应用：异步操作的同步化表达，控制流管理，部署Iterator接口，作为数据结构

## Generator函数的异步应用
- 协程：多个线程互相协作，完成异步任务；协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行
- Thunk函数：自动执行Generator函数的一种方法，是传名调用(只在执行时求值)的一种实现策略，用来替换某个表达式

## aync函数
- 是Generator函数的语法糖
- 区别：* => async, yield => await
- 改进：内置执行器；更好的语义；更广的适用性；返回值是Promise
- 用法：async函数返回一个Promise对象，可以使用then方法添加回调函数
- async函数内部return语句返回的值，会成为then方法回调函数的参数
- 正常情况下，await命令后面是一个Promise对象，如果不是，会被转成一个立即resolve的Promise对象
- await命令后面的Promise对象如果变成reject状态，则reject的参数会被catch方法的回调函数接收到
- 只要一个await语句后面的Promise变成reject，那么async函数都会中断执行；
- 防止出错的方法，将其放在try...catch代码块中，await命令放在try...catch代码块中；
- 异步遍历器：next方法返回的value和done异步产生

## class的基本语法
```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
} // 定义类不需要加function，方法之间不需要逗号分隔
```
- 类的内部定义的方法都是不可枚举的
- 类的属性名可以采用表达式
- 类和模块内部默认就是严格模式
- constructor是类的默认方法
- ES6不提供私有方法和属性，解决：加#
- class的静态方法，前面加static，实例不能继承，只能通过类调用
- 父类静态方法可以被子类继承
- new.target属性：如果构造函数不是通过new命令调用，new.target返回undefined

## class的继承
- 使用extends关键字，extends关键字不仅可以用来继承类，还可以用来继承原生的构造函数
```js
class colorPoint extends Point {
  constructor (x, y, color) {
    super(x, y);
    this.color = color;
  }
}
// super方法：表示父类的构造函数，必须在constructor中才能调用（任何一个类都有constructor方法）
// ES6继承机制：先创建父类实例对象this，再用子类的构造函数修改this
```
- object.getPrototypeof(): 用来从子类上获取父类
- 类的prototype和_proto_属性，子类的_proto_属性表示构造函数的继承，总是指向父类，子类prototype属性的_proto_属性表示方法的继承，总是指向父类的prototype属性

## Decorator修饰器
- Decorator是一个函数，用来修改类的行为
- 修饰器对类的行为的改变，是代码编译时发生的，不是在运行时
```js
function testable (target) {
  target.prototype.isTestable = true;
}
@testable
class MyTestableClass {}
let obj = new MyTestableClass();
obj.isTestable // true
```
- 修饰器只能用于类和类的方法，修饰器有注释作用，从外到内进入，从内到外执行
- 第三方模块：core-decorator.js; @autobind: 使方法中的this对象绑定原始对象；@readonly: 使属性或方法不可写
- Minxin模式(混入)：在一个对象中混入另一个对象的方法

## Module语法
- 模块功能：import(输入其他模块提供的功能)，export(模块对外接口，可以输出变量，函数和类)
```js
var firstName = "Michael";
var lastName = "Jackson";
var year = 1994;
export {
  firstName,
  lastName,
  year
}
import {
  firstName,
  lastName,
  year
} from "./profile";
```
- export default: 为模块制定默认输出，该命令只能使用一次（本质：输出一个叫做default的变量或方法，然后系统允许你为他取任意名字）
- import和export命令只能在模块的顶层
- import()函数：实现动态加载功能；使用场合：按需加载，条件加载，动态的模块路径
- import()加载模块成功后，这个模块作为对象当作then方法的参数
```js
import("./myModule.js")
.then(({export1, export2}) => {
  //
})
```
- 脚本实现异步加载，defer:渲染完再执行；async:下载完就执行
- ES6脚本加载模块：type="module" 默认defer加载