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
          return val.data.name

        })
      //}//end of if statement

    },// end of writeBoard()
    renameBoard : (newName, boardName) => {
      console.log("boardName", boardName)
        let boardUID = boardName
        let rename = {
          "title" : newName
        } // end of newName object

        return $http
        .patch(`https://pinterestleathergophers.firebaseio.com/boards/${boardUID}.json`, JSON.stringify(rename))
        // .then((val)=>{
        //   console.log("val in function", val)
        //   return val.data.name

        // })
      //}//end of if statement

    }// end of writeBoard()
  }; // end of factory object
})// end of factory
