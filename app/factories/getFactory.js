app.factory("getFactory", function($http) {

  function getData() {
    return $http.get("https://pinterestleathergophers.firebaseio.com/pins.json")
  }

  function getBoards() {
    return $http.get("https://pinterestleathergophers.firebaseio.com/boards.json")
  }


  return {
    getData,
    getBoards
  }

});
