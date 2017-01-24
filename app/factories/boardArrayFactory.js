app.factory('boardArrayFactory',  function($http, getFactory){



  return {
    boardArray : () => {
        return getFactory.getBoards()
        .then((val)=>{
        let newArray = []


        for(var key in val.data){
          // console.log ("key, ", key)
          // console.log("val.data", val.data)
          let boardObj = {
            "name" : val.data[key].name,
            "title" : val.data[key].title
          }
          newArray.push(boardObj)

        }

        return newArray


      }) //end of then
    }// end of boardArray()
  }; // end of factory object
})// end of factory
