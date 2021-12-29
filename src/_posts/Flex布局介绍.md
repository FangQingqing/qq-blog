---
title: Flex弹性布局
date: 2019-06-25 16:50:00
tags:
 - Flex布局
---

在使用flex布局之前，关于页面元素的布局都是使用的定位或者浮动，使用定位还得注意层级关系，使用浮动还得清除浮动。使用了flex布局后让页面的排版变得简单了许多，也提高了开发效率，一起来看看flex的用法吧。

<!-- more -->

## 弹性布局
- 任何一个容器可以指定为flex布局，行内元素也可以使用flex布局
```css
.box {
  display: flex;
}
/* 行内元素 */
.box {
  display: inline-flex;
}
```
**注意** webkit内核的浏览器必须加上-webkit前缀 
```css
.box {
  display: -webkit-flex;
}
```

## 概念
采用flex布局的元素，称为flex容器，他的所有子元素自动成为容器成员，称为flex项目，简称项目。

## 容器的属性
**flex-direction** 决定项目排列方向，取值：
- row(默认值): 水平方向，起点在左端
- row-reverse: 水平方向，起点在右端
- column: 垂直方向，从上到下排列
- column-reverse: 垂直方向，从下到上排列

**flex-wrap** 决定如何换行
- nowrap(默认值): 不换行
- wrap: 换行，第一行在上方
- wrap-reverse: 换行，第一行在下方

**flex-flow** flex-direction 和 flex-wrap 的简写，默认row nowrap

**justify-content** 决定项目在主轴上的对齐方式，取值：
- flex-start(默认值): 左对齐
- flex-end: 右对齐
- center: 居中
- space-between: 两端对齐，项目之间间隔相等
- space-around: 每个项目两侧间隔相等

**algin-items** 决定项目在交叉轴上如何对齐，取值：
- flex-start: 交叉轴起点对齐
- flex-end: 交叉轴终点对齐
- center: 中点对齐
- baseline: 项目第一行文字的基线对齐（文字底部）
- stretch(默认值): 如果项目未设置高度或设为auto，将占满整个容器的高度

**align-content** 定义了多根轴线的对齐方式，如果项目只有一根轴线，将不起作用，取值：
- flex-start: 从上到下
- flex-end: 从下面对齐
- center: 与中点对齐
- space-between: 两端对齐，轴线之间间隔平均分布
- space-around: 每根轴线两侧间隔相等
- stetch(默认值): 轴线占满整个交叉轴

## 项目的属性
**order** 定义项目的排序顺序，数值越小，排序越靠前，默认0

**flex-grow** 定义项目的放大比例，默认0，如果存在剩余空间，也不放大

**flex-shrink** 定义项目的缩小比例，默认为1，如果空间不足，该项目将缩小

**flex-basis** 定义了在分配多余空间前，项目占据的主轴空间，可以设跟width和height一样的值

**flex** 是flex-grow,flex-shrink,flex-basis的简写，默认为0 1 auto
- 快捷值：auto(1 1 auto) none(0 0 auto)

**align-self** 允许单个项目和其他项目不一样的对齐方式，可覆盖align-items的属性，默认auto,表示继承父元素的align-items属性，如果没有父元素，则等同于stretch
- 取值：auto, flex-start, flex-end, center, baseline, stretch