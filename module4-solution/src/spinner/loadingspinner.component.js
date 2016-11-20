(function() {
    'use strict';

    angular.module('Spinner')
        .component('loadingSpinner', {
            templateUrl: 'src/spinner/loadingspinner.template.html',
            controller: SpinnerController
        });


    SpinnerController.$inject = ['$rootScope']

    function SpinnerController($rootScope) {
        var $ctrl = this;
        var cancellers = [];

        $ctrl.$onInit = function() {
            var cancel = $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams, options) {
                    $ctrl.showSpinner = true;
                });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams) {
                    $ctrl.showSpinner = false;
                });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeError',
                function(event, toState, toParams, fromState, fromParams, error) {
                    $ctrl.showSpinner = false;
                });
            cancellers.push(cancel);
        };

        $ctrl.$onDestroy = function() {
            cancellers.forEach(function(item) {
                item();
            });
        };

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeStart to ' + toState.to + '- fired when the transition begins. toState,toParams : \n', toState, toParams);
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            console.log('$stateChangeError - fired when an error occurs during transition.');
            console.log(arguments);
        });
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
        });
        $rootScope.$on('$viewContentLoading', function(event, viewConfig) {
            console.log('$viewContentLoading - view begins loading - dom not rendered', viewConfig);
        });

        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
            console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
            console.log(unfoundState, fromState, fromParams);
        });

    };

})();
