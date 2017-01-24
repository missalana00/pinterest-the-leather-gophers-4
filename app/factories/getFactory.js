app.factory("getFactory", function($http) {

  function getData() {
    return $http.get("https://pinterestleathergophers.firebaseio.com/pins.json")
  }

  function getThingTwo() {
    return $http.get("")
  }


  return {
    getData,
    getThingTwo
  }

});
