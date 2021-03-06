(function () {
  'use strict';

  // Tradies controller
  angular
    .module('tradies')
    .controller('TradiesController', TradiesController);

  TradiesController.$inject = ['$scope', '$timeout', '$window', '$state', 'Authentication', 'FileUploader', 'tradieResolve'];

  function TradiesController ($scope, $timeout, $window, $state, Authentication, FileUploader, tradie) {
    var vm = this;

    vm.authentication = Authentication;
    vm.tradie = tradie;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.uploadPicture = uploadPicture;
    vm.cancelUpload = cancelUpload;

    vm.imageURL = vm.tradie.image;

    // Remove existing Tradie
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.tradie.$remove($state.go('tradies.list'));
      }
    }

    // Save Tradie
    function save(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.tradieForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.tradie._id) {
        vm.tradie.$update(successCallback, errorCallback);
      } else {
        vm.tradie.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('tradies.view', {
          tradieId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/tradies/picture/' + vm.tradie._id,
      alias: 'newPicture'
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
    function uploadPicture() {
      // Clear messages
      vm.success = $scope.error = null;

      // Start upload
      vm.uploader.uploadAll();
    }

    // Cancel the upload process
    function cancelUpload() {
      vm.uploader.clearQueue();
      //vm.imageURL = vm.tradie.image;
    }
  }
})();
