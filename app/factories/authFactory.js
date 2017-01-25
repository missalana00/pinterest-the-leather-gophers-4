app.factory('authFactory', function () {
  return {
    login: (email, password) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
    },
    register: (email, password) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
  }
    // getUserId() {
    //   return firebase.auth().currentUser.uid
    // }

})
