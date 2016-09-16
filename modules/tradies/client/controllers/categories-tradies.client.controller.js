(function () {
  'use strict';

  // Categories controller
  angular
    .module('categories')
    .controller('CategoriesController', CategoriesController);

  CategoriesController.$inject = ['$scope', '$timeout', '$window', '$state', 'Authentication', 'categoryResolve', 'FileUploader', 'CategoriesService'];

  function CategoriesController ($scope, $timeout, $window, $state, Authentication, category, FileUploader, CategoriesService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.category = category;
    vm.categoriesList = CategoriesService.query();
    vm.categories = [];
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.uploadPicture = uploadPicture;
    vm.cancelUpload = cancelUpload;

    vm.imageURL = vm.category.icon;


    $scope.filterCategory = function () {
      for (var category in vm.categoriesList) {
        if (vm.category._id !== category._id) {
          vm.categories.push(category);
        }
      }
    };

    // Remove existing Category
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.category.$remove($state.go('categories.list'));
      }
    }

    // Save Category
    function save(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.categoryForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.category._id) {
        vm.category.$update(successCallback, errorCallback);
      } else {
        vm.category.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('categories.view', {
          categoryId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    // Create file uploader instance
    vm.uploader = new FileUploader({
      url: 'api/categories/picture/' + vm.category._id,
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
