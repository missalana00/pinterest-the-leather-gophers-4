app.factory("getFactory", function($http) {

  function getData() {
    return $http.get("app/mock/mockdb.json")
  }

  function getThingTwo() {
    return $http.get("")
  }


  return {
    getData,
    getThingTwo
  }
});