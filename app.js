var app = angular.module('app', []);

app.controller('MainController', ['$scope', function($scope) {
    $scope.headMenu = ['Fichier', 'Edition', 'Format', 'Affichage'];

    $scope.items = [{'name': 'Fichier', 'visible': 'none','items': ['Nouveau', 'Ouvrir', 'Enregistrer', 'Enregistrer sous']},
        {'name': 'Edition', 'visible': 'none', 'items': ['Nouveau2', 'Ouvrir', 'Enregistrer', 'Enregistrer sous']},
        {'name': 'Format', 'visible': 'none', 'items': ['Nouveau3', 'Ouvrir', 'Enregistrer', 'Enregistrer sous']},
        {'name': 'Affichage', 'visible': 'none', 'items': ['Nouveau4', 'Ouvrir', 'Enregistrer', 'Enregistrer sous']}];


    $scope.openMenu = function(item) {
        for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].visible = 'none';
        }
        switch(item) {
            case 'Fichier':
                $scope.items[0].visible = 'table';
                break;
            case 'Edition':
                $scope.items[1].visible = 'table';
                break;
            case 'Format':
                $scope.items[2].visible = 'table';
                break;
            case 'Affichage':
                $scope.items[3].visible = 'table';
                break;
        }
    }

}]);