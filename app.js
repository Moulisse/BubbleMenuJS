var app = angular.module('app', ['ngAnimate']);

app.controller('MainController', ['$scope', '$window', function($scope, $window) {
    $scope.$window = $window;

    $scope.navbar = ['Fichier', 'Edition', 'Affichage', 'Format'];

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
    $scope.activeItems = [];
    $scope.lastSelected = '';

    $scope.openMenu = function(item) {
        $scope.activeItems=[item];
        $scope.changeMenu(item);
    };

    $scope.changeMenu = function(item) {
        if ($scope.activeItems.length <= 0) return;

        for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].visible = $scope.items[i].name.replace('!', '') === item;
        }
    };

    $scope.closeAll = function() {
        $scope.mode = "";
        $scope.isDragging = false;
        $scope.activeItems = [];
        $scope.lastSelected = '';
        $scope.clickInit.x = -1;
        for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].visible = false;
        }
    };

    $scope.selection = "";

    $scope.fire = function(item) {
        $scope.selection = item.replace('!','');
        $scope.closeAll();
    };

    $scope.mouseUpBackground = function(item) {
        if (typeof item === "undefined") {
            if ($scope.isDragging)
                $scope.fire($scope.activeItems[$scope.activeItems.length-1]);
        } else {
            $scope.fire(item);
        }
        $scope.closeAll()
    };

    $scope.clickInit = {x:-1,y:0};

    $scope.mouseDownBackground = function(event) {
        $scope.clickInit.x = event.clientX;
        $scope.clickInit.y = event.clientY;
    };

    $scope.distance = function(a,b) {
        return Math.sqrt( Math.pow((a.x-b.x), 2) + Math.pow((a.y-b.y), 2) );
    };

    $scope.getNearest = function(x,y,array) {
        if (array.size<=0) return;
        var item = array[0];

        for (var i=0; i<array.length; i++) {

            var pos1 = array[i].getBoundingClientRect();
            var pos2 = item.getBoundingClientRect();

            var p1 = {x:Math.min(Math.max(pos1.x, x), pos1.x+array[i].offsetWidth) , y:Math.min(Math.max(pos1.y, y), pos1.y+array[i].offsetHeight)};
            var p2 = {x:Math.min(Math.max(pos2.x, x), pos2.x+item.offsetWidth) , y:Math.min(Math.max(pos2.y, y), pos2.y+item.offsetHeight)};

            if ($scope.distance({x:x, y:y}, p1) < $scope.distance({x:x, y:y}, p2)) {
                item = array[i];
            }
        }

        return item;
    };

    $scope.size = 150;

    $scope.isDragging = false;

    $scope.mouseMoved = function(event) {
        if ($scope.clickInit.x !== -1) {
            if ($scope.distance({x:event.clientX,y:event.clientY}, $scope.clickInit) > 10)
                $scope.isDragging = true;

            if ($scope.isDragging) {
                $scope.mode = 'bubble';
                var item = $scope.getNearest(event.clientX, event.clientY, document.getElementsByClassName('active'));

                if ($scope.lastSelected !== item.innerHTML) {
                    $scope.lastSelected = item.innerHTML;
                    if ($scope.navbar.includes(item.innerHTML)) {
                        $scope.openMenu(item.innerHTML);
                    } else {
                        if ($scope.activeItems.length >= 2) $scope.activeItems.splice($scope.activeItems.length-1,1);
                        $scope.activeItems.push(item.innerHTML);
                    }
                }

                var pos = item.getBoundingClientRect();

                var p = {x:Math.min(Math.max(pos.x, event.clientX), pos.x+item.offsetWidth) , y:Math.min(Math.max(pos.y, event.clientY), pos.y+item.offsetHeight)};
                $scope.size = 2*$scope.distance({x:event.clientX,y:event.clientY}, p);
            }
        }

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