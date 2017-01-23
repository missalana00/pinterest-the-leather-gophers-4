app.factory("getFactory", function($http) {

  function getThingOne() {
    return $http.get("")
  }

  function getThingTwo() {
    return $http.get("")
  }


  return {
    getThingOne,
    getThingTwo
  }
});