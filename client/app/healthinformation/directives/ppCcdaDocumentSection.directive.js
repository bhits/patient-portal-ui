(function () {
    'use strict';

    angular
        .module('app.healthInformation')
            .directive('ppCcdaDocumentSection', ppCcdaDocumentSection);

            function ppCcdaDocumentSection() {

                var directive = {
                    restrict: 'E',
                    scope: {
                        section: '='
                    },
                    bindToController: true,
                    templateUrl: "app/healthInformation/directives/ccdaDocumentSection.html",
                    controllerAs: 'ccdaDocumentSectionVm',
                    controller: CCDADocumentSectionController
                };

                return directive;

                function CCDADocumentSectionController(){
                    var vm = this;
                    vm.testContent = "This is a test <h1> Section Content</h1>" +

                                      "<p>This is a paragrah</p>" +

                                      "<div>This is a table</div><br/>" +

                                      "<table>" +
                                          "<tr>" +
                                                "<th>H1</th><th>H2</th><th>H3</th>" +
                                          "</tr>"+
                                          "<tr>" +
                                                "<td>R11</td><td>R12</td><td>R13</td>" +
                                          "</tr>"+
                                          "<tr>" +
                                                "<td>R21</td><td>R22</td><td>R23</td>" +
                                          "</tr>"+
                                          "<tr>" +
                                                "<td>R31</td><td>R32</td><td>R33</td>" +
                                          "</tr>"+
                                          "<tr>" +
                                                "<td>R41</td><td>R42</td><td>R43</td>" +
                                          "</tr>"+
                                          "<tr>" +
                                                "<td>R51</td><td>R52</td><td>R53</td>" +
                                          "</tr>"+
                                      "</table>"+

                                      "<br/><div>This is a list</div>" +
                                      "<ol>" +
                                      "<li>Item 1</li>" +
                                      "<li>Item 2</li>" +
                                      "<li>Item 3</li>" +
                                      "<li>Item54</li>" +
                                      "<li>Item 5</li>" +
                                      "</ol>"+

                                      "<br/><p>This text contains <sub>subscript</sub> text.</p>" +
                                      "<p>This text contains <sup>superscript</sup> text.</p>" ;
                }
            }
})();