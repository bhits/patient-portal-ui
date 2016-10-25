/**
 * Created by cindy.ren on 7/18/2016.
 */

'use strict';

describe('app.hasStringFilter', function () {

    var $filter, utilityService;

    beforeEach(module('app.core'));
    beforeEach(module('app.account'));

    beforeEach(inject(function (_$filter_, _utilityService_) {
        $filter = _$filter_('hasString');
        utilityService = _utilityService_;

    }));

    it('should evaluate hasString same as utilityService.hasString', function () {
        // Arrange
        var input = 'inputValue';
        spyOn(utilityService, 'hasString').and.callThrough();

        // Act & Assert
        expect($filter(input)).toEqual('inputValue');
        expect(utilityService.hasString).toHaveBeenCalledWith(input);
    });


});