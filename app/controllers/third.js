app.controller("ThirdCtrl", function($scope,$mdDialog, createBoardFactory, nameBoardFactory ) {

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
      return result;
    }, function() {
      $scope.status = 'You cancelled your board.';
      //takes the name the user supplied, and creates a new board with it
    }).then((result)=>{
      createBoardFactory.writeBoard(result)
      .then((val)=>{
        console.log("val from first function", val)
        nameBoardFactory.addName(val)
    })//end of then
    // .then((val)=> {
    //       idOfBoard =  val.data.name
    //       console.log("idOfBoard", idOfBoard)
    //       return idOfBoard;
    //     })

    })
  }; //end of showPrompt Function


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
  } // end of dialogController function
}) //end of ThirdCtrl
