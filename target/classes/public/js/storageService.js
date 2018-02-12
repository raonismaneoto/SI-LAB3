(function() {
    "use strict";
    var app = angular.module("main");

    app.service("StorageService", function StorageService($mdToast, $http, $q) {
        var service = this;

        service.user = {};

        service.sayHello = function () {
            var deferred = $q.defer();
            $http({method:'GET', url:'http://localhost:8080/hello'}).then(function success(response) {
                console.log(response);
                deferred.resolve(response);
            });
            return deferred.promise;
        };

        service.startUser = function startUser() {
        	service.user = new User();
        };

        service.showToast = function showToast(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .action('FECHAR')
                    .highlightAction(true)
                    .hideDelay(5000)
                    .position('bottom right')
            );
        }

        service.startUser();
	});
})();