app.controller("ThirdCtrl", function($scope ,$mdDialog, getFactory, createBoardFactory, nameBoardFactory, boardArrayFactory, createPinsFactory) {


  $scope.boardArray = [];

  //get array of boards for user
  let boardsArray = boardArrayFactory.boardArray()
    .then((val) =>{
      $scope.boards = val
    })

  $scope.goToBoard = (value) => {
  $location()
  };

  $scope.querySearch = function (query) {
    return query ? $scope.boardArray.filter($scope.createFilterFor(query)) : $scope.boardArray;
    //return $scope.boardArray
  };

  $scope.createFilterFor = function(query) {
    var lowerCaseQuery = angular.lowercase(query);

    return function filterFN() {
      return ($scope.boardArray.indexOf(lowerCaseQuery) === 0)
    };
  }

  $scope.fetchBoards = function () {
    getFactory.getBoards().then((data) => {
      $scope.boardNames = data.data;
      Object.keys($scope.boardNames).forEach(function(id) {
        $scope.boardArray.push($scope.boardNames[id].title)
      });
    console.log("Hello James", $scope.boardArray);
    });
  };


//function for module that allows you to edit the board name
  $scope.editBoardName = (val)=>{
    console.log("edit this board:", val.name);
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



}) //end of ThirdCtrl
