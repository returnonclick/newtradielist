/**
 * Created by lucasnascimento on 12/08/2016.
 */
'use strict';

angular.module('core', [])
    .factory('stellar', function() {
        return {
            window: function() {
                window.jQuery(window).stellar();
            },
            against: function(selector, args) {
                window.jQuery(selector).stellar(args);
            }
        };
    })
    .directive('stellarBackground', function() {
        return {
            restrict: 'A',
            compile: function(elem, attrs, transcludeFn) {
                elem.attr('data-stellar-background-ratio', attrs.stellarBackground);
                return function link (scope, element, attrs) {};
            },
        };
    })
    .directive('stellar', function() {
        return {
            restrict: 'A',
            compile: function(elem, attrs, transcludeFn) {
                elem.attr('data-stellar-ratio', attrs.stellar);
                return function link (scope, element, attrs) {};
            },
        };
    })
    .directive('stellarHor', function() {
        return {
            restrict: 'A',
            compile: function(elem, attrs, transcludeFn) {
                elem.attr('data-stellar-horizontal-offset', attrs.stellarHor);
                return function link (scope, element, attrs) {};
            },
        };
    })
    .directive('stellarVert', function() {
        return {
            restrict: 'A',
            compile: function(elem, attrs, transcludeFn) {
                elem.attr('data-stellar-vertical-offset', attrs.stellarVert);
                return function link (scope, element, attrs) {};
            },
        };
    })
;
