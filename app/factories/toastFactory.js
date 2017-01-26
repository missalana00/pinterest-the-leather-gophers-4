app.factory('toastFactory', function ($mdToast) {
  return {
     toastMaker : (e, p) => {
      $mdToast.show($mdToast.simple()
        .textContent(e)
        .position(p)
        .hideDelay(2000)
        )//end of show Toast
     } //end of show toastMaker
    } //end of object
  }) //end of factory
