app.factory('createBoardFactory',  function($http){
  return {
    writeBoard : (result) => {
      // let idOfBoard = ""
      // if(result !== null) {
        let newBoard = {
          "title" : result
        } // end of newboard object

        return $http
        .post("https://pinterestleathergophers.firebaseio.com/boards.json", JSON.stringify(newBoard))
        .then((val)=>{
          console.log("val in function", val)
          return val

        })
      //}//end of if statement

    }// end of writeBoard()
  }; // end of factory object
})// end of factory
