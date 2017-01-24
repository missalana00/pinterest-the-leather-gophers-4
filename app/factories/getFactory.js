app.factory("getFactory", function($http) {

  function getThingOne() {
    return $http.get("app/mock/mockdb.json")
  }

  function getThingTwo() {
    return $http.get("")
  }


  return {
    getThingOne,
    getThingTwo
  }
});