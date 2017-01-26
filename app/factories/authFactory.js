app.factory('authFactory', function ($location, $q) {
  return {
    login: (email, password) => {
     return $q.resolve(firebase.auth().signInWithEmailAndPassword(email, password))
    },
    register: (email, password) => {
      return $q.resolve(firebase.auth().createUserWithEmailAndPassword(email, password))
    }
  }

})
