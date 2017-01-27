app.factory("getFactory", function($http) {

  function getData() {
    return $http.get("https://pinterestleathergophers.firebaseio.com/pins.json")
  }

  function getBoards() {
    // return $q.resolve(firebase.auth().currentUser)
    // .then(()=> {
    //   // console.log("val.uid", val.uid)
    //   let fireUser = firebase.auth().currentUser.uid
    //    return $http.get(`https://pinterestleathergophers.firebaseio.com/boards.json?orderBy="uid"&equalTo="${fireUser}"`)
    // })
    return $http.get(`https://pinterestleathergophers.firebaseio.com/boards.json`)
    }



  return {
    getData,
    getBoards
  }

});
