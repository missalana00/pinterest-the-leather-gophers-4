app.controller("ThirdCtrl", function($scope,$mdDialog ) {

  $scope.status = '  ';
  $scope.customFullscreen = false;

  // $scope.showAlert = function(ev) {
  //   // Appending dialog to document.body to cover sidenav in docs app
  //   // Modal dialogs should fully cover application
  //   // to prevent interaction outside of dialog
  //   $mdDialog.show(
  //     $mdDialog.alert()
  //       .parent(angular.element(document.querySelector('#popupContainer')))
  //       .clickOutsideToClose(true)
  //       .title('This is an alert title')
  //       .textContent('You can specify some description text in here.')
  //       .ariaLabel('Alert Dialog Demo')
  //       .ok('Got it!')
  //       .targetEvent(ev)
  //   );
  // };

  // $scope.showConfirm = function(ev) {
  //   // Appending dialog to document.body to cover sidenav in docs app
  //   var confirm = $mdDialog.confirm()
  //         .title('Would you like to delete your debt?')
  //         .textContent('All of the banks have agreed to forgive you your debts.')
  //         .ariaLabel('Lucky day')
  //         .targetEvent(ev)
  //         .ok('Please do it!')
  //         .cancel('Sounds like a scam');

  //   $mdDialog.show(confirm).then(function() {
  //     $scope.status = 'You decided to get rid of your debt.';
  //   }, function() {
  //     $scope.status = 'You decided to keep your debt.';
  //   });
  // };

  $scope.showPrompt = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.prompt()
      .templateUrl:
      .title('What is the title of your new Board?')
      .textContent('Bowser is a common name.')
      .placeholder('New Board')
      .ariaLabel('Board Name')
      .initialValue('My new board')
      .targetEvent(ev)
      .ok('Okay!')
      .cancel('Cancel New Board');

    $mdDialog.show(confirm).then(function(result) {
      $scope.status = 'Your new board is called ' + result + '.';
    }, function() {
      $scope.status = 'You cancelled your board.';
    });
  };

  // $scope.showAdvanced = function(ev) {
  //   $mdDialog.show({
  //     controller: DialogController,
  //     templateUrl: 'dialog1.tmpl.html',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose:true,
  //     fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
  //   })
  //   .then(function(answer) {
  //     $scope.status = 'You said the information was "' + answer + '".';
  //   }, function() {
  //     $scope.status = 'You cancelled the dialog.';
  //   });
  // };

  // $scope.showTabDialog = function(ev) {
  //   $mdDialog.show({
  //     controller: DialogController,
  //     templateUrl: 'tabDialog.tmpl.html',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose:true
  //   })
  //       .then(function(answer) {
  //         $scope.status = 'You said the information was "' + answer + '".';
  //       }, function() {
  //         $scope.status = 'You cancelled the dialog.';
  //       });
  // };

  // $scope.showPrerenderedDialog = function(ev) {
  //   $mdDialog.show({
  //     controller: DialogController,
  //     contentElement: '#myDialog',
  //     parent: angular.element(document.body),
  //     targetEvent: ev,
  //     clickOutsideToClose: true
  //   });
  // };

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
});







})
