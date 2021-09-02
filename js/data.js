//Déclaration du tableau des catégories
export var tab_categorie = new Array();
//Déclaration du tableau des titres des catégories
export var tabtitre = new Array();


//Promotions
import {tab_promo} from '../categorie/promotions/promotions.js'
tab_categorie.push(tab_promo);
tabtitre.push("Promotions");

//Boissons
import {tab_boisson} from '../categorie/boissons/boissons.js'
tab_categorie.push(tab_boisson);
tabtitre.push("Boissons");

//Bonbons
import {tab_bonbon} from '../categorie/bonbons/bonbons.js'
tab_categorie.push(tab_bonbon);
tabtitre.push("Bonbons");

//Cafés
import {tab_cafe} from '../categorie/cafes/cafes.js'
tab_categorie.push(tab_cafe);
tabtitre.push("Cafés");

//Chips
import {tab_chips} from '../categorie/chips/chips.js'
tab_categorie.push(tab_chips);
tabtitre.push("Chips");

//Chocolats
import {tab_chocolat} from '../categorie/chocolats/chocolats.js'
tab_categorie.push(tab_chocolat);
tabtitre.push("Chocolats");

//Conserves
import {tab_conserves} from '../categorie/conserves/conserves.js'
tab_categorie.push(tab_conserves);
tabtitre.push("Conserves");

//Epicerie salée
import {tab_epiceriesal} from '../categorie/epiceriesalee/epiceriesalee.js'
tab_categorie.push(tab_epiceriesal);
tabtitre.push("&Eacute;picerie salée");

//Epicerie sucrée
import {tab_epiceriesuc} from '../categorie/epiceriesucree/epiceriesucree.js'
tab_categorie.push(tab_epiceriesuc);
tabtitre.push("&Eacute;picerie sucrée");

//Epices
import {tab_epices} from '../categorie/epices/epices.js'
tab_categorie.push(tab_epices);
tabtitre.push("&Eacute;pices");

//Farines
import {tab_farines} from '../categorie/farines/farines.js'
tab_categorie.push(tab_farines);
tabtitre.push("Farines");

//Fruits secs
import {tab_fruitsecs} from '../categorie/fruitssecs/fruitssecs.js'
tab_categorie.push(tab_fruitsecs);
tabtitre.push("Fruits secs");

//Gâteaux
import {tab_gateau} from '../categorie/gateaux/gateaux.js'
tab_categorie.push(tab_gateau);
tabtitre.push("Gâteaux");

//Hygiène
import {tab_hygiene} from '../categorie/hygiene/hygiene.js'
tab_categorie.push(tab_hygiene);
tabtitre.push("Hygiène");

//Légumes secs
import {tab_legumesecs} from '../categorie/legumessecs/legumessecs.js'
tab_categorie.push(tab_legumesecs);
tabtitre.push("Légumes secs");

//Thés
import {tab_the} from '../categorie/thes/thes.js'
tab_categorie.push(tab_the);
tabtitre.push("Thés");


//Ajout des champs id et quantité à l'array tab_categorie
var length_cat = tab_categorie.length;
for (let num = 0; num < length_cat; num++) {
    var lengti = tab_categorie[num].length;
    var titre = tabtitre[num];
    for (let numi = 0; numi < lengti; numi++) {
        var id = (num*1000).toString()+numi.toString();
        const ajout = {'quantity': 0, 'id': id, 'categorie': titre};
        tab_categorie[num][numi] = Object.assign(tab_categorie[num][numi], ajout);
    }
}


//On casse la catégorisation des arrays
var tab_product = tab_categorie.reduce(function(prev, curr) {
    return prev.concat(curr);
});


//Pour sérialiser  
var str_json = JSON.stringify(tab_product);
console.log(str_json);

//Pour décomposer
//var test4 = JSON.parse(str_json);
//console.log(test);





/*
//Envoi de la base de donnée en json au fichier
var xhr = new XMLHttpRequest();
    xhr.open('POST','donnees.json',true);
    xhr.setRequestHeader('Content-type','application/json');
    xhr.send(str_json);
*/






/*


//Création du tableau avec les data json 
window.jtable = function jtable() {
    var $table = $('#table')
    var $remove = $('#remove')
    var selections = []
  
    function getIdSelections() {
      return $.map($table.bootstrapTable('getSelections'), function (row) {
        return row.id
      })
    }
  
    function responseHandler(res) {
      $.each(res.rows, function (i, row) {
        row.state = $.inArray(row.id, selections) !== -1
      })
      return res
    }
  
    function detailFormatter(index, row) {
      var html = []
      $.each(row, function (key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>')
      })
      return html.join('')
    }
  
    function operateFormatter(value, row, index) {
      return [
        '<a class="like" href="javascript:void(0)" title="Like">',
        '<i class="fa fa-heart"></i>',
        '</a>  ',
        '<a class="remove" href="javascript:void(0)" title="Remove">',
        '<i class="fa fa-trash"></i>',
        '</a>'
      ].join('')
    }
  
    window.operateEvents = {
      'click .like': function (e, value, row, index) {
        alert('You click like action, row: ' + JSON.stringify(row))
      },
      'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
          field: 'id',
          values: [row.id]
        })
      }
    }
  
    function totalTextFormatter(data) {
      return 'Total'
    }
  
    function totalNameFormatter(data) {
      return data.length
    }
  
    function totalPriceFormatter(data) {
      var field = this.field
      return '$' + data.map(function (row) {
        return +row[field].substring(1)
      }).reduce(function (sum, i) {
        return sum + i
      }, 0)
    }
  
    function initTable() {
      $table.bootstrapTable('destroy').bootstrapTable({
        height: 550,
        locale: $('#locale').val(),
        columns: [
          [{
            field: 'state',
            checkbox: true,
            rowspan: 2,
            align: 'center',
            valign: 'middle'
          }, {
            title: 'Item ID',
            field: 'id',
            rowspan: 2,
            align: 'center',
            valign: 'middle',
            sortable: true,
            footerFormatter: totalTextFormatter
          }, {
            title: 'Item Detail',
            colspan: 4,
            align: 'center'
          }],
          [{
            field: 'libelle',
            title: 'Nom',
            sortable: true,
            footerFormatter: totalNameFormatter,
            align: 'center'
          }, {
            field: 'price',
            title: 'Prix',
            sortable: true,
            align: 'center',
            footerFormatter: totalPriceFormatter
          }, {
            field: 'quantity',
            title: 'Quantité',
            sortable: true,
            align: 'center',
            formatter: totalPriceFormatter
          }, {
            field: 'url',
            title: 'Aperçu',
            sortable: true,
            align: 'center',
          }]
        ]
      })
      $table.on('check.bs.table uncheck.bs.table ' +
        'check-all.bs.table uncheck-all.bs.table',
      function () {
        $remove.prop('disabled', !$table.bootstrapTable('getSelections').length)
  
        // save your data, here just save the current page
        selections = getIdSelections()
        // push or splice the selections if you want to save all data selections
      })
      $table.on('all.bs.table', function (e, name, args) {
      })
      $remove.click(function () {
        var ids = getIdSelections()
        $table.bootstrapTable('remove', {
          field: 'id',
          values: ids
        })
        $remove.prop('disabled', true)
      })
    }
  
    $(function() {
      initTable()
  
      $('#locale').change(initTable)
    })    
}

*/