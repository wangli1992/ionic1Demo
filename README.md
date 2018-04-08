# ionic1Demo
 ionic1 中适配ios11 导航栏高度。
在 index.html中head标签 增加 viewport-fit=cover属性，如下
 1.<meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width ,viewport-fit=cover">
 2.在 index.html中的<ion-nav-view class="global_ios"></ion-nav-view> 设置一个 class类型
 在style.css中
 .global_ios {
 margin-bottom: constant(safe-area-inset-bottom);
 height: calc(100% - constant(safe-area-inset-bottom) - constant(safe-area-inset-top));
 margin-top: constant(safe-area-inset-top);
 background-color: transparent;
 /*margin-top: 20px;*/
 }
 //************ 2018-04-08 by wangli**********************

