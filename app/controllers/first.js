app.controller("FirstCtrl", function($scope, getFactory, $mdDialog) {
  console.log("FirstCtrl");

  getFactory.getData().then(function (data) {
    console.log(data.data.img);
    $scope.images = data.data.img;

  });

  $scope.status = '  ';
  $scope.customFullscreen = false;


  $scope.showAdvanced = function(ev) {
    //console.log(ev.path[2].children[0].src);
    $scope.pinImg = ev.path[1].children[0].src;
    console.log(ev);
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'app/partials/pinModalPartial.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      targetEvent: ev,
      clickOutsideToClose:true,
      disableParentScroll: true,
      fullscreen: $scope.customFullscreen,  // Only for -xs, -sm breakpoints.
    });
             //.then(function(answer) {
             //  $scope.status = 'You said the information was "' + answer + '".';
             //});
  };

  function DialogController($scope, $mdDialog) {


    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

  }
});









