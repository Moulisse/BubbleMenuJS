var app = angular.module('app', ['ngAnimate']);

app.controller('MainController', ['$scope', '$window', function($scope, $window) {
    $scope.$window = $window;

    $scope.items = [{'name': '!Fichier', 'visible': false, 'margin': '264px', 'items': ['Partager...','', '!Nouveau', '!Ouvrir...', 'Renommer','Créer une copie...', 'Déplacer vers...', '!Placer dans la corbeille','',
            'Historique des versions','','Télécharger au format','Publier sur le Web','Envoyer un e-mail aux collaborateurs...','Envoyer par e-mail en pièce jointe...','','Détails du document...','Langue',
            'Configuration de la page','!Imprimer']},

        {'name': 'Edition', 'visible': false, 'margin': '379px', 'items': ['Annuler', 'Rétablir','' , 'Couper', '!Copier', '!Coller', 'Coller sans la mise en forme', '', '!Tout séléctionner', 'Ne rien séléctionner', '',
                'Rechercher et remplacer']},

        {'name': 'Affichage', 'visible': false, 'margin': '497px', 'items': ['Mise en page','Mode','','Afficher la règle','Afficher la barre d\'outil d\'équation','Affichier les suggestions orthographiques','',
                'Mode compact','!Plein écran']},

        {'name': '!Format', 'visible': false, 'margin': '647px', 'items': ['!Gras', '!Italique', '!Souligner','Barrer','Exposant','Indice','','Taille de police','','Recadrer l\'image','Options de l\'image...',
                'Remplacer l\'image','Reinitialiser l\'image']}];

    $scope.mode = "";

    $scope.setMode = function(item, mode) {
        $scope.mode = mode;
        $scope.openMenu(item);
    };

    $scope.openMenu = function(item) {
        if ($scope.mode === "") return;

        for (var i = 0; i < $scope.items.length; i++) {
            if ($scope.items[i].name === item.name) {
                $scope.items[i].visible = true;
                // document.getElementById("item-"+i).className = "headMenuItem headMenuItemActive";
            } else {
                $scope.items[i].visible = false;
                // document.getElementById("item-"+i).className = "headMenuItem";
            }
        }
    };

    $scope.closeAll = function() {
        $scope.mode = "";
        for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].visible = false;
            // document.getElementById("item-"+i).className = "headMenuItem";
        }
    };

    $scope.selection = "";

    $scope.fire = function(item) {console.log(item);
        $scope.selection = item.replace('!','');
        $scope.closeAll();
    };

    $scope.size = 150;

    $scope.mouseMoved = function(event) {
        document.getElementById('mouseCircle').style.height = $scope.size.toString()+"px";
        document.getElementById('mouseCircle').style.width = $scope.size.toString()+"px";

        document.getElementById('mouseCircle').style.marginTop = (event.clientY - $scope.size/2).toString()+"px";
        document.getElementById('mouseCircle').style.marginLeft = (event.clientX - $scope.size/2).toString()+"px";

    };
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