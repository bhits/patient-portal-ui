/**
 * Created by tomson.ngassa on 12/16/2015.
 */

'use strict';

(function () {

    angular
        .module('app')
            .constant("idleConfigParams", ngIdleParams)

            var ngIdleParams = {"idle": 780, "timeout": 120, "keepalive": 240};

})();