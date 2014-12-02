// javascript for find a teacher tab of seattleyoganews.com

"use strict";

var tasksUrl = 'https://api.parse.com/1/classes/reviews';
var formIsShown = false;

angular.module('CustomerReviewApp', ['ui.bootstrap'])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = '8KggxA5XW1zh5OoudfgNJLMHiwMjWenbfWOnjMUq';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'CZ5YUhxPMa8ObW9XU6W6dn39QdOCg9PvruwJ4rLc';
    })
    .controller('ReviewController', function($scope, $http) {
        $scope.refreshTasks = function() {
            $http.get(tasksUrl)
                .success(function (data) {
                    $scope.studios = data.results;
                });
        };
        $scope.refreshTasks();
    });