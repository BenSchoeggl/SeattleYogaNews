// javascript for find a teacher tab of seattleyoganews.com

"use strict";

var studiosUrl = 'https://api.parse.com/1/classes/Studio';
var formIsShown = false;

angular.module('YogaStudiosApp', ['ui.bootstrap'])
    .config(function($httpProvider) {
        $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = 'cozjsbGa7WfKL8FgVMbNMB039GYuFUEP8g4OQdbZ';
        $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'a7tp457XQA6aAKptoUIwUSQhiIOABiMqxhQZYEZP';
    })
    .controller('StudiosController', function($scope, $http) {
        $scope.refreshStudios = function() {
            $http.get(studiosUrl)
                .success(function (data) {
                    $scope.studios = data.results;
                    console.log('refreshed');
                });
        };  //$scope.refreshStudios
        //called to get all the studios
        $scope.refreshStudios();

        $scope.addRating = function(studio) {
            var ratingIncrement;
            if (studio.numberOfRatings > 0) {
                ratingIncrement = studio.ratingToAdd;
            } else {
                ratingIncrement = (studio.ratingToAdd * studio.numberOfRatings + studio.ratingToAdd) /
                    (studio.numberOfRatings + 1) - studio.averageRating;
            }
            var postData = {
                numberOfRatings: {
                    __op: "Increment",
                    amount: 1
                },
                averageRating: {
                    __op: "Increment",
                    amount: ratingIncrement
                }
            }
            $scope.updating = true;
            $http.put(studiosUrl + '/' + studio.objectId, postData)
                .success(function(respData) {
                    studio.rating = respData.averageRating;
                })
                .error(function(err) {
                    console.log(err);
                })
                .finally(function() {
                    $scope.updating = false;
                })
        };  //$scope.addRating

    })
    .filter('filterStudios', function() {
        function isInPriceRange(studio) {
            if (searchPrice == 'any') {
                return true;
            } else if (searchPrice == '4' && studio.price >= 4000 && studio.price < 5000) {
                return true;
            } else if (searchPrice == '4' && studio.price >= 5000 && studio.price < 6000) {
                return true;
            } else if (searchPrice == '4' && studio.price >= 6000 && studio.price < 7000) {
                return true;
            } else if (searchPrice == '4' && studio.price >= 7000 && studio.price < 8000) {
                return true;
            } else if (searchPrice == '4' && studio.price >= 8000 && studio.price < 9000) {
                return true;
            } else if (searchPrice == '4' && studio.price >= 9000 && studio.price < 10000) {
                return true;
            } else if (searchPrice == '4' && studio.price >= 10000 && studio.price < 11000) {
                return true;
            } else {
                return false
            }
        }

        function isInHourRange() {
            if (searchHour == 'any') {
                return true;
            } else if (searchHour == '2' && studio.numberOfHours >= 200 && studio.numberOfHours < 300) {
                return true;
            } else if (searchHour == '3' && studio.numberOfHours >= 300 && studio.numberOfHours < 400) {
                return true;
            } else if (searchHour == '4' && studio.numberOfHours >= 400 && studio.numberOfHours < 500) {
                return true;
            } else if (searchHour == '5' && studio.numberOfHours >= 500 && studio.numberOfHours < 600) {
                return true;
            } else {
                return false
            }
        }
        return function(input) {
            var filteredStudios;

            var searchStyle = $('#style-selector option:selected').text();
            var searchPrice = $('#price-selector option:selected').text();
            var searchHour = $('#hours-selector option:selected').text();
            var searchZip = $('#zip-input').val();

            for (var i = 0; i < input.length; i++) {
                if (input[i].style1.toLowerCase() == searchStyle.toLowerCase() ||
                    input[i].style2.toLowerCase() == searchStyle.toLowerCase() ||
                    input[i].style3.toLowerCase() == searchStyle.toLowerCase()) {
                    filteredStudios.push(input[i]);
                } else if (isInPriceRange(input[i])) {
                    filteredStudios.push(input[i]);
                } else if (isInHourRange(input[i])) {
                    filteredStudios.push(input[i]);
                } else if (!input[i].address.indexOf(searchZip) == -1) {
                    filteredStudios.push(input[i]);
                }
            }
            return filteredStudios;
        }
    });