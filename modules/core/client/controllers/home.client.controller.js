'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'stellar',
  function ($scope, Authentication, stellar) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    stellar.against(window);
  }
]);
