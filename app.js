var app = angular.module('app', ['ngAnimate']);

app.controller('MainController', ['$scope', '$window', function($scope, $window) {
    $scope.$window = $window;

    $scope.headMenu = ['Fichier', 'Edition', 'Format', 'Affichage'];

    $scope.items = [{'name': 'Fichier', 'visible': false, 'margin': '259px', 'items': ['Partager...','', 'Nouveau', 'Ouvrir...', 'Renommer','Créer une copie...', 'Déplacer vers...', 'Placer dans la corbeille','', 'Historique des versions','','Télécharger au format','Publier sur le Web','Envoyer un e-mail aux collaborateurs...','Envoyer par e-mail en pièce jointe...','','Détails du document...','Langue','Configuration de la page','Imprimer']},
        {'name': 'Edition', 'visible': false, 'margin': '374px', 'items': ['Nouveau2', 'Ouvrir', 'Enregistrer', 'Enregistrer sous']},
        {'name': 'Format', 'visible': false, 'margin': '492px', 'items': ['Nouveau3', 'Ouvrir', 'Enregistrer', 'Enregistrer sous']},
        {'name': 'Affichage', 'visible': false, 'margin': '609px', 'items': ['Nouveau4', 'Ouvrir', 'Enregistrer', 'Enregistrer sous']}];

    $scope.mode = "normal";

    $scope.openMenu = function(item, mode) {
        $scope.mode = mode;
        $scope.closeAll();
        switch(item) {
            case 'Fichier':
                $scope.items[0].visible = true;
                break;
            case 'Edition':
                $scope.items[1].visible = true;
                break;
            case 'Format':
                $scope.items[2].visible = true;
                break;
            case 'Affichage':
                $scope.items[3].visible = true;
                break;
        }
    };

    $scope.closeAll = function() {
        for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].visible = false;
        }
    };

    $scope.selection = "";

    $scope.fire = function(item) {
        $scope.selection = item.toString();
    }
}]);

app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});