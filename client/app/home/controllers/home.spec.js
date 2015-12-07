/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

describe("app.home HomeController ", function() {

    beforeEach(module('ui.router'));
    beforeEach(module('app.home'));

    var scope, rootScope;

    beforeEach(inject(function($rootScope, $controller) {
        rootScope = $rootScope;
        scope = $rootScope.$new();

        $controller('HomeController', {
            $scope: scope
        });
    }));


    it('should create home controller ', function(){

    });

});