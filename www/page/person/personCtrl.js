angular.module('app.controllers')
  .controller('personCtrl',function($scope,$ionicHistory,$ionicScrollDelegate,$state) {

    $scope.$on("$ionicView.beforeEnter",function () {
      console.log('person page --');
      $scope.selecteExamSubject = 0;
      $scope.selectExamSubjectIndex = 0;
      $scope.subjectExamDetailArr = [];//初始化学科考试详情数组
      $scope.selectExamSubject = {};//所选择的考试，默认显示数组第一个

      $scope.testImg = "data:image/jpeg;base64,"
      +
       "";
      console.log('classId:'+$scope.classId+'--examId:'+$scope.examId);
      //测试数据
    })

    $scope.chooseSubjectStatistical = function (index) {

    }

    //选择相册
    $scope.choosePhotos = function(){
      console.log('----点击了 ');
    //   var imgs=document.getElementsByClassName('imgView');
    //   var args = {
    //     'selectMode': 101,//101=PICKER_IMAGE_VIDEO , 100=PICKER_IMAGE , 102=PICKER_VIDEO
    //     'maxSelectCount': 40, //default 40 (Optional)
    //     'maxSelectSize': 188743680,//188743680=180M (Optional)
    //   };
    //  window.MediaPicker.getMedias(args,function(dataArray){
    //     //dataArray [{mediaType: "image", path:'/storage/emulated/0/DCIM/Camera/20170808_145202.jpg', size: 21993}]
    //     console.log('----');
    //    $scope.getThumbnail(dataArray);
    // },err());



      $scope.imgArr = [];
      window.imagePicker.getPictures(
        function(results) {
         $state.reload(); 
         $scope.imgArr = results;
          // for (var i = 0; i < results.length; i++) {
          //   var imgData = results[i];
          //   $scope.imgArr.push(imgData);
          //   console.log('图片路径是: ' + results[i] );

          // }
          console.log('输出了。。。' );
          console.log($scope.imgArr);
          console.log('shuzu长度： ' + $scope.imgArr.length );
        }, function (error) {
          console.log('错误信息为: ' + error);
        },{
          maximumImagesCount: 9
        }
      );
    }

    $scope.getThumbnail = function (dataArray) {
      for (var i = 0; i < dataArray.length; i++) {
        MediaPicker.extractThumbnail(dataArray[i], function (data) {
          imgs[data.index].src = 'data:image/jpeg;base64,' + data.thumbnailBase64;
          imgs[data.index].setAttribute('style', 'transform:rotate(' + data.exifRotate + 'deg)');
        }, err());
      }
    }
  
    $scope.convertImgToBase64URL = function(url, callback, outputFormat){
      var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        var dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
      };
      img.src = url;
    }
  })
