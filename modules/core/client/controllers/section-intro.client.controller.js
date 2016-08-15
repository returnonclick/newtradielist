(function() {
  'use strict';

  angular
    .module('core')
    .controller('SectionIntroController', SectionIntroController);

  SectionIntroController.$inject = ['$scope'];

  function SectionIntroController($scope) {
    var vm = this;

    // Section intro controller logic
    // ...

    $scope.myPattern = 'modules/core/client/img/intro/parallax-intro-bg.jpg';

    init();

    function init() {
      
    }
  }
})();
