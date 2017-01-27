
app.controller("ThirdCtrl", function($scope ,$mdDialog, getFactory, createBoardFactory, nameBoardFactory, boardArrayFactory, $location, createPinsFactory, $interval) {



function tryAgain() {
  //if there is not current user, wait .5 sec, then try checking for one again
  if(firebase.auth().currentUser === null) {
    console.log("trying again")
    setTimeout(tryAgain, 500)
    return
    }
//once a user is found, run these two functions
  $scope.UserName = firebase.auth().currentUser.email
  $scope.refresh()

}
//test for current user, if not found, will call tryagain function
function testUser() {
  if(firebase.auth().currentUser === null) {
    tryAgain()
    return
  }
  $scope.UserName = firebase.auth().currentUser.email
}
//calls the test for User function
testUser()





  //get array of boards for user
  $scope.refresh = function() {
  let boardsArray = boardArrayFactory.boardArray()
    .then((val) =>{
      $scope.boards = val
      console.log($scope.boards)
    })
    .then(getFactory.getData)
    .then(function (data) {
      $scope.pins = data.data;
      console.log($scope.pins);
    })
    .then(function() {

      for(var i = 0; i < $scope.boards.length; i++) {
        $scope.boards[i].images = [];

        Object.keys($scope.pins).forEach(function(id) {
          if($scope.pins[id].boardID === $scope.boards[i].name) {
            $scope.boards[i].images.push($scope.pins[id].img);
          }
        })
      }
    });
}
  $scope.refresh();
  $scope.boardArray = "";
  $scope.fetchBoards = function () {
    getFactory.getBoards().then((data) => {
//filter by current user

      let currentUserId = firebase.auth().currentUser
      console.log("currentUser", currentUserId)
      $scope.boardNames = data.data;

      Object.keys($scope.boardNames).forEach(function(id) {
        console.log("id", id)
        console.log("scopeboarNames[id]", $scope.boardNames[id])
        if($scope.boardNames[id].uid === currentUserId.uid) {
          $scope.boardArray += $scope.boardNames[id].title + ", ";
          }
        })
      console.log("boardArray", $scope.boardArray)
      // });

    }).then(function()  {

        $scope.oneBoard = $scope.boardArray.split(/, +/g)
        .map( function(board) {
          return {
            value: board.toLowerCase(),
            display: board
          };
        });
      })
  };




//goes to selected user board
$scope.goToBoard = (value) => {
  let boardUID = value.name
  $location.url(`/boards/${boardUID}`)
}


//displays user's pins
$scope.goToPins = ()=>{
  $(".userPins").removeClass("ng-hide")
  $(".userBoards").addClass("ng-hide")
}

//displays user's boards
$scope.goToBoards = ()=>{
  $(".userBoards").removeClass("ng-hide")
  $(".userPins").addClass("ng-hide")
}



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
          $scope.refresh();
        })
       }
       //if new board wasn't created, do nothing
       else {

       }//end of if statement
    }) // end of then
    .catch(console.log)
  }; //end of showPrompt Function


  function DialogController($scope, $mdDialog, getFactory) {
    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.answer = function (answer) {
      $mdDialog.hide(answer);
    };

    $scope.savePin = function(evnt) {

      var boardId = evnt.path[2].children[0].children[2].children[0].children[0].value;

      // Find selected boards uid
      $scope.boardKey = _.findKey($scope.boardNames, ["title", boardId]);
      console.log($scope.boardKey);

      var tagData = evnt.path[2].children[0].children[3].children[1].value;
      //stores the image url, title, tags into an object
      var pinData = {
        img: $scope.result1,
        title: $scope.result2,
        tag: tagData,
        boardID: $scope.boardKey
      }


      createPinsFactory.postPin(pinData).then(console.log)
        .then($scope.refresh)
      $mdDialog.cancel();

    }

    // next three functions are used for autocomplete of board selection
     function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(board) {
        return (board.value.indexOf(lowercaseQuery) === 0);
      };
    };

    $scope.querySearch = function(query) {
      return query ? $scope.oneBoard.filter( createFilterFor(query) ) : $scope.oneBoard;
    };

  };


  $scope.createPin = function(e) {
    console.log(e);
    $scope.fetchBoards();
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
      $scope.result1 = result;
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
        $scope.result2 = result2;
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


        })

    })
  }) //first .then

 } //$scope.createPin


  $scope.showAdvanced = function(ev) {
    console.log(ev);
    $scope.pinImg = ev.path[0].currentSrc;
    $scope.pinTitle = ev.path[1].children[1].innerText;
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'app/partials/profilePinPartial.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      targetEvent: ev,
      clickOutsideToClose: true,
      disableParentScroll: true,
      fullscreen: $scope.customFullscreen,
    });
  };

// function progress() {
//       var self = this;

//       self.activated = true;
//       self.determinateValue = 30;

//       // Iterate every 100ms, non-stop and increment
//       // the Determinate loader.
//       $interval(function() {

//         self.determinateValue += 1;
//         if (self.determinateValue > 100) {
//           self.determinateValue = 30;
//         }

//       }, 100);
//     }







}) //end of ThirdCtrl
