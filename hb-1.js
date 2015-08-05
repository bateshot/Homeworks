/* globals $ */

/*
* <table class="items-table">
 <thead>
 <tr>
 <th>#</th>
 <th>Vendor</th>
 <th>Model</th>
 <th>OS</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>0</td>
 <td>Nokia</td>
 <td>Limia 920</td>
 <td>Windows Phone</td>
 </tr>
 <tr>
 <td>1</td>
 <td>LG</td>
 <td>Nexus 5</td>
 <td>Android</td>
 </tr>
 <tr>
 <td>2</td>
 <td>Apple</td>
 <td>iPhone 6</td>
 <td>iOS</td>
 </tr>
 </tbody>
 </table>
*
*data = {
 headers : ['Vendor', 'Model', 'OS'],
 items : [{
 col1: 'Nokia',
 col2: 'Lumia 920',
 col3: 'Windows Phone'
 }, {
 col1: 'LG',
 col2: 'Nexus 5',
 col3: 'Android'
 }, {
 col1: 'Apple',
 col2: 'iPhone 6',
 col3: 'iOS'
 }]
 };
*
* */

function solve() {

    return function (selector) {
        var template = '<table class="items-table">' +
                        '<thead>' +
                        '<tr>' +
                            '<th>#</th>' +
                            '{{#each headers}} '+
                            '<th>{{this}}</th>' +
                            '{{/each}}' +
                        '</tr> </thead>' +
                        '<tbody>' +
                            '{{#each items}}'+
                                '<tr>' +
                                    '<td>'+
                                        '{{@index}}' +
                                    '</td>'+
                                    '<td>'+
                                        '{{this.col1}}' +
                                    '</td>'+
                                    '<td>'+
                                        '{{this.col2}}' +
                                    '</td>' +
                                    '<td>' +
                                        '{{this.col3}}'+
                                    '</td>'+

                                '</tr>' +
                            '{{/each}}'+
                        '</tbody>';






        $(selector).html(template);
    };
}

module.exports = solve;