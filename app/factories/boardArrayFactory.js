app.factory('boardArrayFactory',  function($http, getFactory){



  return {
    boardArray : () => {
        return getFactory.getBoards()
        .then((val)=>{
        let newArray = []
        let currentUser = firebase.auth().currentUser.uid

        for(var key in val.data){
          // console.log ("key, ", key)
          // console.log("val.data", val.data)
          console.log("uid of board", val.data[key].uid )
          if(val.data[key].uid === currentUser){
            let boardObj = {
              "name" : val.data[key].name,
              "title" : val.data[key].title,
              "uid" : val.data[key].uid
            }

          // if(boardObj.uid === currentUser){
          newArray.push(boardObj)
          }
        }
        console.log(newArray)
        return newArray


      })//end of then
    }// end of boardArray()
  }; // end of factory object
})// end of factory
