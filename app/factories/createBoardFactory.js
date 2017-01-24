app.factory('createBoardFactory',  function($http){
  return {
    writeBoard : (result) => {
      if(result !== null) {
        let newBoard = {
          "title" : result
        } // end of newboard object
        console.log("newboard", newBoard)
        return $http
        .post("https://pinterestleathergophers.firebaseio.com/boards.json", JSON.stringify(newBoard))
        .then((val)=> {console.log("return from posting board", val)})
      }//end of if statement
    }// end of writeBoard()
  }; // end of factory object
})// end of factory
