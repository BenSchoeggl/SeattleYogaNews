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

        //orders the code based of the user's selected sort want
        $scope.sortCol = 'style';
        $scope.sortBy = function(sortCol) {
            $scope.sortCol = sortCol;
        }
        $scope.isSortedBy = function (sortCol) {
            return $scope.sortCol == sortCol;
        }

        //filters based off their selected categories
        $scope.filterStyle = function (studio) {
            var searchStyle = $('#style-selector option:selected').text();

            return (searchStyle == 'Any Style' || searchStyle == 'Style...' || searchStyle == studio.style1
                || searchStyle == studio.style2 || searchStyle == studio.style3);
        }

        $scope.filterPrice = function() {
            var searchPrice = $('#price-selector option:selected').val();

            if (searchPrice == 'any') {
                return true;
            } else {
                return searchPrice;
            }
        }

        $scope.filterHours = function (studio) {
            var searchHours = $('#hours-selector option:selected').val();

            if (searchHours == 'any' || searchHours == "") {
                return studio.numberOfHours;
            } else {
                return searchHours;
            }
        }

        $scope.filterZip = function() {
            var searchZip = $('#zip-input').val();
            console.log(searchZip);
            return searchZip;
        }

        //collapse navbar for mobile
        $(".navbar-nav li a").click(function(event) {
            $(".navbar-collapse").collapse('hide');
        });

        //add rating code
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
    });