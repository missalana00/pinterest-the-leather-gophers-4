app.controller('FourthCtrl',  function ($scope, getFactory, $routeParams, $mdDialog) {

  $scope.boardUniqueId = $routeParams.boardName

  getFactory.getBoards().then((val)=>{
    console.log("val returned from get board", val.data[$scope.boardUniqueId].title)
    //get the title of the board name from the board object
    $scope.boardName = val.data[$scope.boardUniqueId].title;
  })

  getFactory.getData()
    .then(function (data) {
      console.log(data.data);

      $scope.pins = data.data;
    })

    .then(function() {
      Object.keys($scope.pins).forEach(function(id) {
        if($scope.pins[id].boardID !== $scope.boardUniqueId) {
         delete $scope.pins[id];
        }

      });

    })
    .then(function() {  //Add random col/row spans to each pin to randomize layout
      Object.keys($scope.pins).forEach(function(id) {
        $scope.pins[id].rowspan = random()
      });
    });


  // Function to return random number for col/row spans
  // var random = function() {
  //   var r = Math.random();
  //   if (r < 0.3) {
  //     return 1;
  //   } else if (r < 0.7) {
  //     return 2;
  //   } else {
  //     return 3;
  //   }
  // };

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
