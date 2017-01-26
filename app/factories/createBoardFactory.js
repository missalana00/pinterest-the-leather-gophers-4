app.factory('createBoardFactory',  function($http){
  return {
    writeBoard : (result) => {
        let userID = firebase.auth().currentUser
        let newBoard = {
          "title" : result,
          "uid" : userID.uid
        } // end of newboard object
        console.log("newboard object", newBoard)
        return $http
        .post("https://pinterestleathergophers.firebaseio.com/boards.json", JSON.stringify(newBoard))
        .then((val)=>{
          console.log("val in function", val)
          return val.data.name

        })
      //}//end of if statement

    },// end of writeBoard()
    renameBoard : (newName, boardName) => {

        let boardUID = boardName
        let rename = {
          "title" : newName
        } // end of newName object
        //rename the board on the userpage
        console.log("I'm trying to change the name")
        $(`[data-name=${boardUID}] .md-headline`).text(newName)
        //write the new name to firebase
        return $http
        .patch(`https://pinterestleathergophers.firebaseio.com/boards/${boardUID}.json`, JSON.stringify(rename))

    }// end of writeBoard()
  }; // end of factory object
})// end of factory
