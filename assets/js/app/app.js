var app = angular.module('App', ['ngAnimate', 'ngSanitize', 'ui.select', 'angular-chartist']);

app.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

app.factory('schools', function($http) {
    var loaded_overview = null;
    return {
        overview: function(cb) {
            if (!loaded_overview) {
                $http({
                    url: 'https://lab.okfn.de/jedeschule/data/all_schools_geocoded.json',
                    method: "GET"
                })
                    .then(function(response) {
                        loaded_overview = response.data;
                        cb(null, response.data)
                    })
            } else {
                return loaded_overview;
            }
        }
    }
});