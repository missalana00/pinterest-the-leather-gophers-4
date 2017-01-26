app.factory('boardArrayFactory',  function($http, getFactory){

  // function getUser() {

  //  return $q(function(resolve, reject) {
  //   let userId = firebase.auth().currentUser
  //   resolve(userId)
  //   reject()
  //   })




  // }

console.log("getfact", getFactory.getBoards())
// console.log("getuser", getUser())


  return {
    boardArray : () => {

        return getFactory.getBoards()
        .then((val)=>{
          console.log("val", val)
          let newArray = []
        // let currentUser = val[1].uid
          let currentUser = firebase.auth().currentUser.uid
          console.log("currentUser uid", currentUser)
        for(var key in val.data) {
          // console.log ("key, ", key)
          // console.log("val.data", val.data)
          // console.log("uid of board", val.data[key].uid )
          if(val.data[key].uid === currentUser){
            let boardObj = {
              "name" : val.data[key].name,
              "title" : val.data[key].title,
              "uid" : val.data[key].uid
            } //end of object

          // if(boardObj.uid === currentUser){
          newArray.push(boardObj)
          } //end of if
        }//end of for
        console.log(newArray)
        return newArray


      })//end of then
    }// end of boardArray()
  }; // end of factory object
})// end of factory
