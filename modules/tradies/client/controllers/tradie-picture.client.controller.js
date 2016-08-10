(function () {
  'use strict';

  // Tradies controller
  angular
      .module('tradies')
      .controller('TradiePictureController', TradiePictureController);

  TradiePictureController.$inject = ['$scope', '$timeout', '$window', '$state', 'Authentication', 'FileUploader', 'tradieResolve'];

  function TradiePictureController ($scope, $timeout, $window, $state, Authentication, FileUploader, tradie) {
    var vm = this;

    vm.authentication = Authentication;
    vm.tradie = tradie;
    vm.error = null;

    vm.imageURL = vm.tradie.image;

    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/tradies/picture',
      alias: 'newProfilePicture'
    });

    // Set file uploader image filter
    vm.uploader.filters.push({
      name: 'imageFilter',
      fn: function (item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    // Called after the user selected a new picture file
    vm.uploader.onAfterAddingFile = function (fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);

        fileReader.onload = function (fileReaderEvent) {
          $timeout(function () {
            vm.imageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    // Called after the user has successfully uploaded a new picture
    vm.uploader.onSuccessItem = function (fileItem, response, status, headers) {
      // Show success message
      vm.success = true;

      // Populate user object
      vm.user = Authentication.user = response;

      // Clear upload buttons
      vm.cancelUpload();
    };

    // Called after the user has failed to uploaded a new picture
    vm.uploader.onErrorItem = function (fileItem, response, status, headers) {
      // Clear upload buttons
      vm.cancelUpload();

      // Show error message
      vm.error = response.message;
    };

    // Change user profile picture
    vm.uploadPicture = function () {
      // Clear messages
      vm.success = $scope.error = null;

      // Start upload
      vm.uploader.uploadAll();
    };

    // Cancel the upload process
    vm.cancelUpload = function () {
      vm.uploader.clearQueue();
      vm.imageURL = vm.tradie.image;
    };
  }
})();
