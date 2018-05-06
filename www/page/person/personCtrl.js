angular.module('app.controllers')
  .controller('personCtrl',function($scope,$ionicHistory,$ionicScrollDelegate,$state) {

    $scope.$on("$ionicView.beforeEnter",function () {
      console.log('person page --');
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
    $scope.imgArr = [];
      window.imagePicker.getPictures(
        function(results) {
        //  $scope.imgArr = results;
          for (var i = 0; i < results.length; i++) {
            //"data:image/jpeg;base64,"+
            var imgData = results[i];
            $scope.imgArr.push(imgData);
            console.log('图片路径是: ' + results[i] );
          }
          console.log('输出了。。。' );
          console.log($scope.imgArr);
          console.log('shuzu长度： ' + $scope.imgArr.length );
          $state.reload(); 
        }, function (error) {
          console.log('错误信息为: ' + error);
        },{
          maximumImagesCount: 9
        }
      );
    }

  
   
  })
