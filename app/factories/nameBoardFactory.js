app.factory('nameBoardFactory',  function($http){
  return {
    addName : (val) => {
        let newBoardName = val
        let nameBoard = {
          "name" : newBoardName
          } // end of newboard object

        return $http
        .patch(`https://pinterestleathergophers.firebaseio.com/boards/${newBoardName}.json`, JSON.stringify(nameBoard))
        .then((e)=> {console.log(e)})
      //}//end of if statement

    }// end of writeBoard()
  }; // end of factory object
})// end of factory
