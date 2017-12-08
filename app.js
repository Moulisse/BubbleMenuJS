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
    $scope.activeItems = [];

    $scope.openMenu = function(item) {
        $scope.activeItems.push(item);
        $scope.changeMenu(item);
    };

    $scope.changeMenu = function(item) {
        if ($scope.activeItems.length <= 0) return;

        $scope.activeItems = [item];
        $scope.activableItems = $scope.getActivables();

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

    $scope.getActivables = function() {
        var res = ['!Fichier', '!Format'];

        for (var i=0; i<$scope.activeItems.length; i++) {
            for (var j=0; j<$scope.activeItems[i].items.length; j++) {
                if ($scope.activeItems[i].items[j].includes('!'))
                    res += $scope.activeItems[i].items[j];
            }
        }
        return res;
    };
    $scope.activableItems = $scope.getActivables();


    $scope.closeAll = function() {
        $scope.mode = "";
        $scope.activeItems = [];
        $scope.clickInit.x = -1;
        for (var i = 0; i < $scope.items.length; i++) {
            $scope.items[i].visible = false;
            // document.getElementById("item-"+i).className = "headMenuItem";
        }
    };

    $scope.selection = "";

    $scope.fire = function(item) {
        $scope.selection = item.replace('!','');
        $scope.closeAll();
    };

    $scope.lClickBackground = function(event) {
        $scope.closeAll();

    };

    $scope.rClickBackground = function(event) {
        $scope.closeAll();
    };

    $scope.clickInit = {x:-1,y:0};

    $scope.mousepressedBackground = function(event) {
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

            var p1 = {x:Math.min(Math.max(array[i].offsetLeft, x), array[i].offsetLeft+array[i].width) , y:Math.min(Math.max(array[i].offsetTop, y), array[i].offsetTop+array[i].height)};
            var p2 = {x:Math.min(Math.max(item.offsetLeft, x), item.offsetLeft+item.offsetWidth) , y:Math.min(Math.max(item.offsetTop, y), item.offsetTop+item.offsetHeight)};

            if ($scope.distance({x:x, y:y}, p1) < $scope.distance({x:x, y:y}, p2)) {
                item = array[i];
            }
        }

        return item;
    };

    $scope.size = 150;

    $scope.mouseMoved = function(event) {
        if ($scope.clickInit.x !== -1) {
            if ($scope.distance({x:event.clientX,y:event.clientY}, $scope.clickInit) > 10) {
                $scope.mode = 'bubble';
                var item = $scope.getNearest(event.clientX, event.clientY, document.getElementsByClassName('active'));
                $scope.size = $scope.distance({x:event.clientX,y:event.clientY}, {x:item.offsetLeft,y:item.offsetTop})
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