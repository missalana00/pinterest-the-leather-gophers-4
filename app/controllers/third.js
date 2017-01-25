app.controller("ThirdCtrl", function($scope,$mdDialog, createBoardFactory, nameBoardFactory, boardArrayFactory ) {


  //get array of boards for user
  let boardsArray = boardArrayFactory.boardArray()
    .then((val) =>{
      $scope.boards = val
    })

$scope.goToBoard = (value) => {
  $location()
}


//function for module that allows you to edit the board name
  $scope.editBoardName = (val)=>{
    console.log("edit this board:", val.name)
    let whichBoard = val.name;
    var confirm = $mdDialog.prompt()
      // .templateUrl:
      .title('What would you like to rename your board?')
      .textContent('Board Titles help you organize your pins')
      .placeholder('Rename Board')
      .ariaLabel('Board Name')
      .initialValue(val.title)
      // .targetEvent(ev)
      .ok('Okay!')
      .cancel('Cancel Board Edit');

    $mdDialog.show(confirm).then(function(result) {

      $scope.status = "You've renamed your board " + result + '.';
          return result;

    }, function() {
      $scope.status = 'You cancelled renaming board.';
      //takes the name the user supplied, and renames the board
    }).then((result)=>{
      //if the user has renamed the board, store new name of board
      if(result !== undefined) {
        createBoardFactory.renameBoard(result, whichBoard)

       }//if board wasn't renamed, do nothing
       else {

       }//end of if statement
    }) // end of then
    .catch(console.log)
  }; //end of editBoardName Function


  $scope.status = '  ';
  $scope.customFullscreen = false;

//function that allows you to create a new board (thru a module)
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
      //if the user has given a name of the board, create a new board
      if(result !== undefined) {
        createBoardFactory.writeBoard(result)
        .then((val)=>{
          console.log("val from first function", val)
          nameBoardFactory.addName(val)
        })
       }
       //if new board wasn't created, do nothing
       else {

       }//end of if statement
    }) // end of then
    .catch(console.log)
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
