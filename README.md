<!--
 * @Author: mrrs878@foxmail.com
 * @Date: 2021-04-29 10:34:33
 * @LastEditTime: 2021-04-29 10:45:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gifMaker\README.md
-->
# 生成打字机动画gif

## 简介

项目初衷：为了在markdown文件中添加动态的代码生成图。在普通网页中有[typed.js](https://github.com/mattboldt/typed.js)这种js库可以生成炫酷的打字机动画，但仅限于网页，不方便在markdown文件中使用(需要自己截屏生成gif)。于是打算自己开发一个可以直接生成打字机动画gif的库/网页

本项目核心功能(js生成gif)使用[gif.js](https://github.com/jnordberg/gif.js)实现

![预览](./assets/sample.gif)

## bugs

- 第二行及以后的行一次添加两个字符

- 生成的gif圆角莫名消失

## todo

- 动态设置生成的图片大小

- 动态设置文字颜色

- 动态设置文本字体