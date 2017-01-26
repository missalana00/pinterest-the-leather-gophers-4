app.controller("FirstCtrl", function($scope, getFactory, $mdDialog) {
  console.log("FirstCtrl");

  // Get DATA from firebase
  getFactory.getData()
    .then(function (data) {
      console.log(data.data);
      $scope.pins = data.data;
    })
    .then(function() {  //Add random col/row spans to each pin to randomize layout
      Object.keys($scope.pins).forEach(function(id) {
        $scope.pins[id].rowspan = random(),
        $scope.pins[id].colspan = random(),
        $scope.pins[id].colspansm = random(),
        $scope.pins[id].colspanxs = random()
      });
    });


  // Function to return random number for col/row spans
  var random = function() {
    var r = Math.random();
    if (r < 0.2) {
      return 1;
    } else if (r < 0.5) {
      return 2;
    } else {
      return 3;
    }
  };

  //mdDialog opens when save button is click on any pin
  $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showAdvanced = function(ev) {
    //console.log(ev.path[2].children[0].src);
    $scope.pinImg = ev.path[1].children[0].src;
    $scope.pinTitle = ev.path[1].children[2].innerText;
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
      fullscreen: $scope.customFullscreen,
    });
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
