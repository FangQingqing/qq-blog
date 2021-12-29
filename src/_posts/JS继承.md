---
title: JS继承
date: 2019-06-24 16:00:00
tags:
 - JavaScript
---

对于JS继承，一直只知道原型链的方式，在工作中因为还没涉及到设计模式，所以很少用到这一块知识点，但继承在面试中经常会被问到。所以这里在网上收集整理了一下，也便于以后的复习。

<!-- more --> 

**原型**
``` js
// B是A的原型
A.prototype = B

// A是B的构造函数
B.constructor = A
```

**约定**
```js
// 父类
function Super () {
  this.property = 'Super Property'
}
Super.prototype.getProperty = function () {
  return this.property
}
```

## 构造继承
### 基本思想
通过使用call,apply方法可以在新创建的对象上执行构造函数，用父类的构造函数来增加子类的实例
### 具体实现
```js
// 子类
function Sub () {
  Super.call(this)
  this.property = 'Sub Property'
}
```
### 优缺点

**优点**
- 简单明了，直接继承超类构造函数的属性和方法

**缺点**
- 无法继承原型链上的属性和方法

## 原型链继承
### 基本思想
利用原型链来实现继承，超类的一个实例作为子类的原型
### 具体实现
```js
// 子类
function Sub () {
  this.property = 'Sub Property'
}
Sub.prototype = new Super()
Sub.prototype.constructor = Sub
```
### 优缺点
**优点**
- 简单明了，容易实现
- 实例是子类的实例，实际上也是父类的一个实例
- 父类新增原型方法/原型属性，子类都能访问到

**缺点**
- 所有子类的实例的原型都共享同一个超类实例的属性和方法
- 无法实现多继承

## 组合继承
### 基本思想
利用构造继承和原型链组合
### 具体实现
```js
// 子类
function Sub () {
  Super.call(this)
  this.property = 'Sub Property'
}
Sub.prototype = new Super()
Sub.prototype.constructor = Sub
```
### 优缺点
**优点**
- 解决了构造函数和原型链继承的两个问题

**缺点**
- 实际上子类会拥有超类的两份属性，只是子类的属性覆盖了超类的属性

## 原型式继承
### 基本思想
采用原型式继承并不需要定义一个类，传入参数obj，生成一个继承obj对象的对象
### 具体实现
```js
function objectCreate (obj) {
  function F () {}
  F.prototype = obj
  return new F()
}
```
### 优缺点
**优点**
- 直接通过对象生成一个继承该对象的对象

**缺点**
- 不是类式继承，而是原型式基础，缺少了类的概念

## 寄生式继承
### 基本思想
创建一个仅仅用于封装继承过程的函数，然后在内部以某种方式增强对象，最后返回对象
### 具体实现
```js
function objectCreate (obj) {
  function F () {}
  f.prototype = obj
  return new F()
}
function createSubObj (superInstance) {
  var clone = objectCreate(superInstance)
  clone.property = 'Sub Proerty'
  return clone
}
```
### 优缺点
**优点**
- 原型式继承的一种拓展

**缺点**
- 依旧没有类的概念

## 寄生组合式继承
### 基本思想
结合寄生式继承和组合式继承，完美实现不带两份超类属性的继承方式
### 具体实现
```js
function inheritPrototype (Super, Sub) {
  var superProtoClone = Object.create(Super.prototype)
  superProtoClone.constructor = Sub
  Sub.prototype = Super
}
// 子类
function Sub () {
  Super.call()
  Super.property = 'Sub Property'
}
inheritPrototype(Super, Sub)
```
### 优缺点
**优点**
- 完美实现继承，解决了组合式继承带两份属性的问题

**缺点**
- 过于繁琐，不如组合继承
