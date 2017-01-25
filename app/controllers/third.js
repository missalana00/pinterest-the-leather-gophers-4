app.controller("ThirdCtrl", function($scope, $mdDialog, createPinsFactory) {

  $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      // .templateUrl:
      .title('What is the title of your new Board?')
      .textContent('Board Titles help you organize your pins')
      .placeholder('New Board')
      .ariaLabel('Board Name')
      .initialValue('')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('Cancel New Board');

    $mdDialog.show(confirm).then(function(result) {
      $scope.status = 'Your new board is called ' + result + '.';
    }, function() {
      $scope.status = 'You cancelled your board.';
    });
  };


  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }

  $scope.createPin = function(e) {
    console.log(e)

    var firstPrompt = $mdDialog.prompt()
      // .templateUrl:
      .title('Create a new pin')
      .textContent('Enter a URL for an image to create your pin')
      .placeholder('New Pin URL')
      .ariaLabel('Pin')
      .initialValue('')
      .targetEvent(e)
      .ok('Proceed to Enter Title')
      .cancel('Cancel New Pin');
      console.log(firstPrompt)

    $mdDialog.show(firstPrompt).then(function(result) {
      console.log(result)
      var secondPrompt = $mdDialog.prompt()
      .title('Enter Title')
      .textContent('Enter a title for your pin')
      .placeholder('Title')
      .ariaLabel('Title')
      .initialValue('')
      .targetEvent(e)
      .ok('Proceed to add to your board')
      .cancel('Cancel New Pin');
      $mdDialog.show(secondPrompt).then(function (result2){

        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'app/partials/createPinPartial.html',
          parent: angular.element(document.body),
          scope: $scope,
          preserveScope: true,
          targetEvent: e,
          clickOutsideToClose:true,
          disableParentScroll: true,
          fullscreen: $scope.customFullscreen,  // Only for -xs, -sm breakpoints.

        }).then($scope.saveBoard = function(evnt) {

          console.log(evnt.path[1].children[2].children.input_4.value)

          var tagData = evnt.path[1].children[2].children.input_4.value
          //stores the image url, title, tags into an object
          var pinData = {
            img: result,
            title: result2,
            tag: tagData
          }
          console.log(pinData)

          createPinsFactory.postPin(pinData).then(console.log)

        })

    })
  }) //first .then

} //$scope.createPin



});
