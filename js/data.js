//Déclaration du tableau des catégories
export var tab_categorie = new Array();
//Déclaration du tableau des titres des catégories
export var tabtitre = new Array();

//Promotions
import { tab_promo } from '../categorie/promotions/promotions.js'
tab_categorie.push(tab_promo);
tabtitre.push("Promotions");
//Boissons
import { tab_boisson } from '../categorie/boissons/boissons.js'
tab_categorie.push(tab_boisson);
tabtitre.push("Boissons");
//Bonbons
import { tab_bonbon } from '../categorie/bonbons/bonbons.js'
tab_categorie.push(tab_bonbon);
tabtitre.push("Bonbons");
//Cafés
import { tab_cafe } from '../categorie/cafes/cafes.js'
tab_categorie.push(tab_cafe);
tabtitre.push("Cafés");
//Chips
import { tab_chips } from '../categorie/chips/chips.js'
tab_categorie.push(tab_chips);
tabtitre.push("Chips");
//Chocolats
import { tab_chocolat } from '../categorie/chocolats/chocolats.js'
tab_categorie.push(tab_chocolat);
tabtitre.push("Chocolats");
//Conserves
import { tab_conserves } from '../categorie/conserves/conserves.js'
tab_categorie.push(tab_conserves);
tabtitre.push("Conserves");
//Epicerie salée
import { tab_epiceriesal } from '../categorie/epiceriesalee/epiceriesalee.js'
tab_categorie.push(tab_epiceriesal);
tabtitre.push("&Eacute;picerie salée");
//Epicerie sucrée
import { tab_epiceriesuc } from '../categorie/epiceriesucree/epiceriesucree.js'
tab_categorie.push(tab_epiceriesuc);
tabtitre.push("&Eacute;picerie sucrée");
//Epices
import { tab_epices } from '../categorie/epices/epices.js'
tab_categorie.push(tab_epices);
tabtitre.push("&Eacute;pices");
//Farines
import { tab_farines } from '../categorie/farines/farines.js'
tab_categorie.push(tab_farines);
tabtitre.push("Farines");
//Fruits secs
import { tab_fruitsecs } from '../categorie/fruitssecs/fruitssecs.js'
tab_categorie.push(tab_fruitsecs);
tabtitre.push("Fruits secs");
//Gâteaux
import { tab_gateau } from '../categorie/gateaux/gateaux.js'
tab_categorie.push(tab_gateau);
tabtitre.push("Gâteaux");
//Hygiène
import { tab_hygiene } from '../categorie/hygiene/hygiene.js'
tab_categorie.push(tab_hygiene);
tabtitre.push("Hygiène");
//Légumes secs
import { tab_legumesecs } from '../categorie/legumessecs/legumessecs.js'
tab_categorie.push(tab_legumesecs);
tabtitre.push("Légumes secs");
//Thés
import { tab_the } from '../categorie/thes/thes.js'
tab_categorie.push(tab_the);
tabtitre.push("Thés");


//Fonction de conversion de la BDD fixe products du site en json et stockage au localstorage
window.convertJsonStorage = function convertJsonStorage() {
  document.getElementById('jsonConvert').onclick = function () {
    //Ajout des champs id et quantité à l'array tab_categorie
    var length_cat = tab_categorie.length;
    for (let num = 0; num < length_cat; num++) {
      var lengti = tab_categorie[num].length;
      var titre = tabtitre[num];
      for (let numi = 0; numi < lengti; numi++) {
        var id = (num * 1000).toString() + numi.toString();
        const ajout = { 'quantity': 0, 'id': id, 'categorie': titre, 'legend_P1': "", 'short_legend': "" };
        tab_categorie[num][numi] = Object.assign(tab_categorie[num][numi], ajout);
      }
    }
    //On casse la catégorisation des arrays
    var tab_product = tab_categorie.reduce(function (prev, curr) {
      return prev.concat(curr);
    });
    //Pour sérialiser  
    var str_json = JSON.stringify(tab_product);
    //Sauvegarde du json dans le localstorage  
    localStorage.setItem("bddproducts", str_json);
    console.log(str_json);
  }
}
//Exportation du tableau Produits sous Firebase
const db = firebase.firestore();
var retrieveBddProducts = JSON.parse(localStorage.getItem('bddproducts'));
var urlF, libelleF, prixF, texteF, quantityF, idF, categorieF;
var productscollection = db.collection('products');
window.exportProducts = function exportProducts() {
  document.getElementById('exportProducts').onclick = function () {
    for (let num = 0; num < retrieveBddProducts.length; num++) {
      //Récupération des valeurs
      urlF = retrieveBddProducts[num].url;
      libelleF = retrieveBddProducts[num].libelle;
      prixF = retrieveBddProducts[num].prix;
      texteF = retrieveBddProducts[num].texte;
      quantityF = retrieveBddProducts[num].quantity;
      idF = retrieveBddProducts[num].id;
      categorieF = retrieveBddProducts[num].categorie;
      //Export sous Firebase
      firebase.database().ref('products/' + idF).set({
        url: urlF,
        libelle: libelleF,
        prix: prixF,
        texte: texteF,
        quantity: quantityF,
        id: idF,
        categorie: categorieF
      });
    }
    /*
        productscollection.doc(idF).set({
          url: urlF,
          libelle: libelleF,
          prix: prixF,
          texte: texteF,
          quantity: quantityF,
          id: idF,
          categorie: categorieF
        });
        */
    console.log("Table Produits remise insérée");
  }
}


//Tableau Exemple Fournisseurs 
var supplierTable = [
  {
    "id": "1S",
    "producter_name": "leclerc",
    "producter_price": 1.5,
    "comments": "conserves, épiceries",
    "comments2": "grande surface, négociations longues",
    "adress": "90 Avenue Barthélémy, 69009 Lyon"
  }, {
    "id": "2S",
    "producter_name": "Senteurs d'Orient",
    "producter_price": 1,
    "comments": "thés",
    "comments2": "grossiste",
    "adress": "77 Cours de la Liberté, 69003 Lyon"
  }, {
    "id": "3S",
    "producter_name": "Vie Claire",
    "producter_price": 3,
    "comments": "produits bios",
    "comments2": "produits chers",
    "adress": "245 Cour Lafayette, 69006 Lyon"
  }, {
    "id": "4S",
    "producter_name": "Dlago",
    "producter_price": 0.5,
    "comments": "chips, produits secs",
    "comments2": "rien",
    "adress": "6 Rue Franklin, 69002 Lyon"
  }, {
    "id": "5S",
    "producter_name": "Sucry",
    "producter_price": 2,
    "comments": "confiseries, chocolaterie",
    "comments2": "vaste catalogue",
    "adress": "129 Avenue Maréchal de Saxe, 69003 Lyon"
  }
]
//Exportation du tableau Fournisseurs sous Firebase
var idFo, nameFo, prixFo, commentsFo, comments2Fo, adressFo;
window.ExpSuppliers = function ExpSuppliers() {
  document.getElementById('exportSuppliers').onclick = function () {
    for (let numf = 0; numf < supplierTable.length; numf++) {
      //Récupération des valeurs
      idFo = supplierTable[numf].id;
      nameFo = supplierTable[numf].producter_name;
      prixFo = supplierTable[numf].producter_price;
      commentsFo = supplierTable[numf].comments;
      comments2Fo = supplierTable[numf].comments2;
      adressFo = supplierTable[numf].adress;
      //Export sous Firebase
      firebase.database().ref('suppliers/' + idFo).set({
        id: idFo,
        nom: nameFo,
        prix: prixFo,
        info1: commentsFo,
        info2: comments2Fo,
        adresse: adressFo
      });
    }
    /*
        productscollection.doc(idF).set({
          url: urlF,
          libelle: libelleF,
          prix: prixF,
          texte: texteF,
          quantity: quantityF,
          id: idF,
          categorie: categorieF
        });
        */
    console.log("Table Fournisseurs insérée");
  }
}


//Tableau Exemple Catégories 
var categsTable = [
  {
    "id": "0C",
    "titre": "Promotions",
    "value": 0
  }, {
    "id": "1C",
    "titre": "Boissons",
    "value": 1000
  }, {
    "id": "2C",
    "titre": "Bonbons",
    "value": 2000
  }, {
    "id": "3C",
    "titre": "Cafés",
    "value": 3000
  }, {
    "id": "4C",
    "titre": "Chips",
    "value": 4000
  }, {
    "id": "5C",
    "titre": "Chocolats",
    "value": 5000
  }, {
    "id": "6C",
    "titre": "Conserves",
    "value": 6000
  }, {
    "id": "7C",
    "titre": "&Eacute;picerie salée",
    "value": 7000
  }, {
    "id": "8C",
    "titre": "&Eacute;picerie sucrée",
    "value": 8000
  }, {
    "id": "9C",
    "titre": "&Eacute;pices",
    "value": 9000
  }, {
    "id": "10C",
    "titre": "Farines",
    "value": 10000
  }, {
    "id": "11C",
    "titre": "Fruits secs",
    "value": 11000
  }, {
    "id": "12C",
    "titre": "Gâteaux",
    "value": 12000
  }, {
    "id": "13C",
    "titre": "Hygiène",
    "value": 13000
  }, {
    "id": "14C",
    "titre": "Légumes secs",
    "value": 14000
  }, {
    "id": "15C",
    "titre": "Thés",
    "value": 15000
  }
]
//Exportation du tableau Categories sous Firebase
var idcateg, namecateg, valueCateg;
window.ExpCategories = function ExpCategories() {
  document.getElementById('exportCategories').onclick = function () {
    for (let numf = 0; numf < categsTable.length; numf++) {
      idcateg = categsTable[numf].id;
      namecateg = categsTable[numf].titre;
      valueCateg = categsTable[numf].value;

      firebase.database().ref('categories/' + idcateg).set({
        id: idcateg,
        nom: namecateg,
        valeur: valueCateg
      });
    }
    /*
        productscollection.doc(idF).set({
          url: urlF,
          libelle: libelleF,
          prix: prixF,
          texte: texteF,
          quantity: quantityF,
          id: idF,
          categorie: categorieF
        });
        */
    console.log("Table Catégories insérée")

  }
}