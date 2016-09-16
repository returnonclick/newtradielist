//Tradies service used to communicate Tradies REST endpoints
(function () {
  'use strict';

  angular
    .module('categories')
    .factory('CategoriesService', CategoriesService);

  CategoriesService.$inject = ['$resource'];

  function CategoriesService($resource) {
    return $resource('api/categories/:categoryId', {
      categoryId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
