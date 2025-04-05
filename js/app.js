var app = angular.module('FitnessApp', []);

app.controller('FitnessController', function($scope, $http) {
    $scope.steps = Math.floor(Math.random() * 9000) + 1000;
    $scope.calories = Math.floor($scope.steps * 0.04);
    $scope.weather = "Loading...";
    $scope.airQuality = "Fetching...";
    $scope.tasks = [];
    $scope.user = null;

    var apiKey = "c0ef97a0e9d9b6a42bce7df6a7ea647b"; 
    var city = "New York";

    $scope.fetchWeather = function() {
        var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        $http.get(apiUrl).then(function(response) {
            var data = response.data;
            var temp = data.main.temp;
            var description = data.weather[0].description;
            
            $scope.weather = `${temp}°C, ${description}`;
            $scope.fitnessTip = temp > 30 ? "Stay Hydrated! 💧" : "Great weather for a run! 🏃";
        }).catch(function() {
            $scope.weather = "Unable to load data";
        });
    };

    $scope.addTask = function() {
        if ($scope.newTask) {
            $scope.tasks.push($scope.newTask);
            $scope.newTask = "";
        }
    };

    $scope.removeTask = function(index) {
        $scope.tasks.splice(index, 1);
    };

    var ctx = document.getElementById('progressChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            datasets: [{
                label: 'Steps',
                data: [5000, 7000, 8000, 6000, 9000, 10000, $scope.steps],
                backgroundColor: '#ff5e62'
            }]
        }
    });
});
