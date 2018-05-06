angular.module('app.controllers')
  .controller('personCtrl',function($scope,$ionicHistory,$ionicScrollDelegate,$state) {

    $scope.$on("$ionicView.beforeEnter",function () {
      console.log('person page --');
      $scope.imgArr = [];
      $scope.imageArr = [];
      $scope.selecteExamSubject = 0;
      $scope.selectExamSubjectIndex = 0;
      $scope.subjectExamDetailArr = [];//初始化学科考试详情数组
      $scope.selectExamSubject = {};//所选择的考试，默认显示数组第一个

      $scope.testImg = "data:image/jpeg;base64,"
      $scope.localImg = 'img/adam.jpg';
      
      console.log('classId:'+$scope.classId+'--examId:'+$scope.examId);
      //测试数据
    })

    $scope.chooseSubjectStatistical = function (index) {

    }

    //选择相册
    $scope.choosePhotos = function(){
      console.log('----点击了 ');

    
      var imageData = '';
      window.imagePicker.getPictures(
        function(results) {
       
          $scope.imgArr = results;
          $scope.imageArr = results;
          console.log($scope.imgArr);
          console.log('shuzu长度： ' + $scope.imgArr.length );
          $scope.$apply();
        }, function (error) {
          console.log('错误信息为: ' + error);
        },{
          maximumImagesCount: 9,
          width:100,
          height:100,
          quality:50
        }
      );
    }

    // $scope.getThumbnail = function (dataArray) {
    //   for (var i = 0; i < dataArray.length; i++) {
    //     MediaPicker.extractThumbnail(dataArray[i], function (data) {
    //       imgs[data.index].src = 'data:image/jpeg;base64,' + data.thumbnailBase64;
    //       imgs[data.index].setAttribute('style', 'transform:rotate(' + data.exifRotate + 'deg)');
    //     }, err());
    //   }
    // }
  
    // $scope.convertImgToBase64URL = function(url, callback, outputFormat){
    //   var canvas = document.createElement('CANVAS'),
    //     ctx = canvas.getContext('2d'),
    //     img = new Image();
    //   img.crossOrigin = 'Anonymous';
    //   img.onload = function () {
    //     var dataURL;
    //     canvas.height = img.height;
    //     canvas.width = img.width;
    //     ctx.drawImage(img, 0, 0);
    //     dataURL = canvas.toDataURL(outputFormat);
    //     callback(dataURL);
    //     canvas = null;
    //   };
    //   img.src = url;
    // }
  })
