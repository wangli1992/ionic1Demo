/**
 * Created by hewz on 2018/4/10.
 */
angular.module('app.directive',[])
.directive('testdirective',['$scope',function () {
  //指令A
  return {
    restrict: 'EA',
    replace: true,
    transclude: true,
    scope: {
      title: '=testdirectiveTitle'
    },
    template: '<div>'
    + '<div class="title" ng-click="toggle()">{{title}}</div>'
    + '<div class="body" ng-show="showMe" ng-transclude></div>'
    + '</div>',
    link: function (scope, element, attrs) {
      scope.showMe = false;
      scope.toggle = function toggle() {
        scope.showMe = !scope.showMe;
      }
    }
  }

}])
.directive('emotionPicker',function(){
    return {
        restrict :'EA',
        scope:{
        emotion:'=bind'
        },
        template:'<div style="height:195px;border-top: 1px solid #cfcece;width:100%;">'+
        '<div style="padding:10px;height:195px;width:100%;">'+
        '<ion-slides>'+
        '<ion-slide-page ng-repeat="item in items" style="height:195px;width:100%;">'+
        '<span ng-repeat="emotion in item" ng-click="setValue(emotion)" style="display: block;float: left;width: 12.5%; height: 42px; font-size: 1.2em;line-height: 42px;text-align: center;margin-bottom: 10px;">'+
        '{{emotion}}'+
        '</span>'+
        '</ion-slide-page>'+
        '</ion-slides>'+
        '</div>'+
        '</div>',
        link: function (scope,element, attrs) {
            scope.content = '';
            var EMOJIS =
                "😀 😃 😄 😁 😆 😅 😂 🤣 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 🤡 🤠 😏 😒 😞 😔 😟 😕 🙁" +
                " ☹️ 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 🤤 😭 😓 😪 😴 🙄 🤔 🤥 😬 🤐 🤢 🤧 😷 🤒 🤕 😈 👿" +
                " 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤘 👌 👈 👉 👆 👇 ☝️ ✋ 🤚" +
                " 🖐 🖖 👋 🤙 💪 🖕 ✍️ 🤳 💅 🖖 💄 💋 👄 👅 👂 👃 👣 👁 👀 🗣 👤 👥 🕶 🌂 ☂️";
            var EmojiArr = EMOJIS.split(" ");
            var groupNum = Math.ceil(EmojiArr.length / 24);
              scope.items = [];

            for (var i = 0; i < groupNum; i++) {
                scope.items.push(EmojiArr.slice(i * 24, (i + 1) * 24));
            }
            //设置值
            scope.setValue = function(emotion){
                console.log('点击了:'+emotion);
             scope.emotion +=emotion;
             
            };
        }
    }
})

.directive("itemEnd",function () {
  return{
    restrict:'A',
    link:function (scope,element,attrs,ctrl) {
      element.css({
        'float': 'left',
      });

    }
  }
})
.directive('compile', ['$compile', function ($compile) {
  return function (scope, element, attrs) {
      scope.$watch(function (scope) {
              return scope.$eval(attrs.compile);
          },
          function (value) {
              element.html(value);
              $compile(element.contents())(scope);
          }
      );
  };
}])

.directive('comImageBox', [function() {
  var comImageBox = {
      restrict: 'E',
      template: '<div class="LightBox" style="display:none;" ng-click="hideBigImage()"><div class="ImgViewer"><img src="{{Url}}"></div></div>',
      transclude: false,
      templateNamespace: 'html',
      scope: false,
      link: {
          pre: function preLink(scope, element, attrs, controller) {
              //图片大小
              var elWidth, elHeight;
              //元素大小
              var outWidth, outHeight;
              // 当前操作模式 pinch:缩放 swipe:滑动
              var mode = '';

              // 双指触摸点的距离 (缩放模式)
              var distance = 0;
              var initialDistance = 0;

              // 图片缩放参数
              var scale = 1;
              var relativeScale = 1;
              var initialScale = 1;
              var maxScale = parseInt(attrs.maxScale, 10);
              if (isNaN(maxScale) || maxScale <= 1) {
                  maxScale = 20;
              }

              // position of the upper left corner of the element
              var positionX = 0;
              var positionY = 0;

              var initialPositionX = 0;
              var initialPositionY = 0;

              // central origin (缩放模式)
              var originX = 0;
              var originY = 0;

              // start coordinate and amount of movement （滑动模式）
              var startX = 0;
              var startY = 0;
              var moveX = 0;
              var moveY = 0;


              outWidth = $(".LightBox").width();
              outHeight = $(".LightBox").height();


              scope.Url = "";
              scope.bigImage = false;

              //显示图片
              scope.showBigImage = function(imageName) {
                  scope.Url = imageName;
                  scope.bigImage = true;

                  $(".LightBox").show(150, function() {
                      $("ion-header-bar").hide();
                      $(".Main .tab-nav").hide();
                      $(".LightBox .ImgViewer img").each(function() {

                          $(this).css({
                              width: "100%"
                          });

                          elWidth = $(this).width();
                          elHeight = $(this).height();
                          //居中
                          $(this).css({

                              marginLeft: elWidth / 2 * (-1),
                              marginTop: elHeight / 2 * (-1)
                          })
                      });
                  });

                  //console.info(element.find("img"));
                  //每次点击放大图片之后需要绑定事件
                  element.find("img").on('touchstart', touchstartHandler);
                  element.find("img").on('touchmove', touchmoveHandler);
                  element.find("img").on('touchend', touchendHandler);
              };
              //隐藏图片
              scope.hideBigImage = function() {
                  scope.bigImage = false;
                  $(".LightBox").hide(200);
                  // 当前操作模式 pinch:缩放 swipe:滑动
                  mode = '';

                  // 双指触摸点的距离 (缩放模式)
                  distance = 0;
                  initialDistance = 0;

                  // 图片缩放参数
                  scale = 1;
                  relativeScale = 1;
                  initialScale = 1;
                  maxScale = parseInt(attrs.maxScale, 10);
                  if (isNaN(maxScale) || maxScale <= 1) {
                      maxScale = 20;
                  }

                  // position of the upper left corner of the element
                  positionX = 0;
                  positionY = 0;

                  initialPositionX = 0;
                  initialPositionY = 0;

                  // central origin (缩放模式)
                  originX = 0;
                  originY = 0;

                  // start coordinate and amount of movement （滑动模式）
                  startX = 0;
                  startY = 0;
                  moveX = 0;
                  moveY = 0;

                  transformElement();
              };


              /****************************************** 图片缩放功能开始 20161104 qinxiankang 添加 ***************************/






              /**
               * @param {object} 点击开始，初始化
               */
              function touchstartHandler(evt) {
                  //console.info("touchstart");
                  var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;

                  startX = touches[0].clientX;
                  startY = touches[0].clientY;
                  initialPositionX = positionX;
                  initialPositionY = positionY;
                  moveX = 0;
                  moveY = 0;
              }

              /**
               * @param {object} 手指移动
               */
              function touchmoveHandler(evt) {
                  //console.info("touch move");
                  var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;
                  var leftX = positionX - elWidth * scale / 2 + outWidth / 2;
                  var rightX = outWidth - (leftX + elWidth * scale);
                  var topY = positionY - elHeight * scale / 2 + outHeight / 2;
                  var bottomY = outHeight - (topY + elHeight * scale);



                  if (mode === '') {
                      if (touches.length === 1) {

                          mode = 'swipe';

                      } else if (touches.length === 2) {

                          mode = 'pinch';

                          initialScale = scale;
                          initialDistance = getDistance(touches);
                          originX = touches[0].clientX -
                              parseInt((touches[0].clientX - touches[1].clientX) / 2, 10) -
                              element.find("img")[0].offsetLeft - initialPositionX;
                          originY = touches[0].clientY -
                              parseInt((touches[0].clientY - touches[1].clientY) / 2, 10) -
                              element.find("img")[0].offsetTop - initialPositionY;

                      }
                  }

                  if (mode === 'swipe') {
                      //移动
                      evt.preventDefault();
                      moveX = touches[0].clientX - startX;
                      moveY = touches[0].clientY - startY;

                      positionX = initialPositionX + moveX;
                      positionY = initialPositionY + moveY;

                      transformElement();

                      //左右有空余，左右间距相同，禁止上下滑动
                      if (leftX > 0 && rightX > 0) {
                          positionX = 0;
                          transformElement();
                      }
                      //上下都有空余，禁止左右滑动
                      if (topY > 0 && bottomY > 0) {
                          positionY = 0;
                          transformElement();
                      }



                  } else if (mode === 'pinch') {
                      //缩放
                      evt.preventDefault();
                      distance = getDistance(touches);
                      relativeScale = distance / initialDistance;

                      //


                      scale = relativeScale * initialScale;

                      positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
                      positionY = originY * (1 - relativeScale) + initialPositionY + moveY;

                      transformElement();
                      positionX = 0;
                      positionY = 0;
                      transformElement();
                  }



                  //console.info(leftX, topY, rightX, bottomY);
              }

              /**
               * @param {object} 点击结束
               */
              function touchendHandler(evt) {
                  //console.info("图片大小", elWidth, elHeight);
                  //console.info("容器大小", outWidth, outHeight);

                  //console.info("touch end");
                  var touches = evt.originalEvent ? evt.originalEvent.touches : evt.touches;

                  if (mode === '' || touches.length > 0) {
                      return;
                  }
                  //缩放比例小于原比例
                  if (scale < 1) {

                      scale = 1;
                      positionX = 0;
                      positionY = 0;

                  } else if (scale > maxScale) {
                      //缩放比例过大
                      scale = maxScale;
                      relativeScale = scale / initialScale;
                      positionX = originX * (1 - relativeScale) + initialPositionX + moveX;
                      positionY = originY * (1 - relativeScale) + initialPositionY + moveY;

                  }
                  //} else {
                  //    //
                  //    if (positionX > 0) {
                  //        positionX = 0;
                  //    } else if (positionX < elWidth * (1 - scale)) {
                  //        positionX = elWidth * (1 - scale);
                  //    }
                  //    if (positionY > 0) {
                  //        positionY = 0;
                  //    } else if (positionY < elHeight * (1 - scale)) {
                  //        positionY = elHeight * (1 - scale);
                  //    }

                  //}

                  //

                  var leftX = positionX - elWidth * scale / 2 + outWidth / 2;
                  var rightX = outWidth - (leftX + elWidth * scale);
                  var topY = positionY - elHeight * scale / 2 + outHeight / 2;
                  var bottomY = outHeight - (topY + elHeight * scale);

                  if (leftX > 0 && rightX < 0) {
                      //leftX=0;
                      positionX = elWidth * scale / 2 - outWidth / 2;
                      transformElement();
                  } else if (leftX < 0 && rightX > 0) {
                      //rightX=0;
                      positionX = outWidth / 2 - elWidth * scale / 2;
                      transformElement();
                  }
                  if (topY < 0 && bottomY > 0) {
                      positionY = outHeight / 2 - elHeight * scale / 2;

                      transformElement();
                  } else if (topY > 0 && bottomY < 0) {
                      positionY = elHeight * scale / 2 - outHeight / 2;
                      transformElement();
                  }


                  leftX = positionX - elWidth * scale / 2 + outWidth / 2;
                  rightX = outWidth - (leftX + elWidth * scale);
                  topY = positionY - elHeight * scale / 2 + outHeight / 2;
                  bottomY = outHeight - (topY + elHeight * scale);
                  //console.info(leftX, rightX, topY, bottomY);
                  if (topY > 0 && bottomY > 0) {
                      //让上下边距相同，只允许左右滑动
                      //console.info(1);
                      positionY = 0;
                      transformElement();
                  }
                  if (leftX > 0 && rightX > 0) {
                      //console.info(2);
                      positionX = 0;
                      transformElement();
                  }
                  leftX = positionX - elWidth * scale / 2 + outWidth / 2;
                  rightX = outWidth - (leftX + elWidth * scale);
                  topY = positionY - elHeight * scale / 2 + outHeight / 2;
                  bottomY = outHeight - (topY + elHeight * scale);
                  //console.info(leftX, rightX,topY, bottomY);
                  transformElement(0.1);
                  mode = '';

              }

              /**
               * @param {Array} 双指touch位置
               * @return {number} 
               */
              function getDistance(touches) {
                  var d = Math.sqrt(Math.pow(touches[0].clientX - touches[1].clientX, 2) +
                      Math.pow(touches[0].clientY - touches[1].clientY, 2));
                  return parseInt(d, 10);
              }

              /**
               * @param {number} 动画时间
               */
              function transformElement(duration) {
                  //console.info("transform");
                  var transition = duration ? 'all cubic-bezier(0,0,.5,1) ' + duration + 's' : '';
                  var matrixArray = [scale, 0, 0, scale, positionX, positionY];
                  var matrix = 'matrix(' + matrixArray.join(',') + ')';

                  element.find("img").css({
                      '-webkit-transition': transition,
                      transition: transition,
                      '-webkit-transform': matrix + ' translate3d(0,0,0)',
                      transform: matrix
                  });
              }
              /****************************************** 图片缩放功能结束****************************/

          },

          post: function postLink(scope, element, attrs, controller) {}
      }
  };
  return comImageBox;
}])

