/*
Auteur : Johan GIROUX
2020-2021
Dernière MAJ : 30/10/2021
V2.9
*/


// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCRpXRP0D_MuPqyuUOG491w1SANIc6lVL8",
  authDomain: "attable-6578b.firebaseapp.com",
  databaseURL: "https://attable-6578b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "attable-6578b",
  storageBucket: "attable-6578b.appspot.com",
  messagingSenderId: "1061243206959",
  appId: "1:1061243206959:web:ee2f97b4777e626a1975da"
};
firebase.initializeApp(firebaseConfig);


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
    //Sauvegarde du json dans le localstorage  
    localStorage.setItem("bddproducts", JSON.stringify(tab_product));
    console.log(tab_product);
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
    "idS": "1S",
    "producter_name": "leclerc",
    "producter_price": 1.5,
    "comments": "conserves, épiceries",
    "comments2": "grande surface, négociations longues",
    "adress": "90 Avenue Barthélémy, 69009 Lyon"
  }, {
    "idS": "2S",
    "producter_name": "Senteurs d'Orient",
    "producter_price": 1,
    "comments": "thés",
    "comments2": "grossiste",
    "adress": "77 Cours de la Liberté, 69003 Lyon"
  }, {
    "idS": "3S",
    "producter_name": "Vie Claire",
    "producter_price": 3,
    "comments": "produits bios",
    "comments2": "produits chers",
    "adress": "245 Cour Lafayette, 69006 Lyon"
  }, {
    "idS": "4S",
    "producter_name": "Dlago",
    "producter_price": 0.5,
    "comments": "chips, produits secs",
    "comments2": "rien",
    "adress": "6 Rue Franklin, 69002 Lyon"
  }, {
    "idS": "5S",
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
      idFo = supplierTable[numf].idS;
      nameFo = supplierTable[numf].producter_name;
      prixFo = supplierTable[numf].producter_price;
      commentsFo = supplierTable[numf].comments;
      comments2Fo = supplierTable[numf].comments2;
      adressFo = supplierTable[numf].adress;
      //Export sous Firebase
      firebase.database().ref('suppliers/' + idFo).set({
        idS: idFo,
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
    "idC": "0C",
    "titre": "Promotions",
    "value": 0
  }, {
    "idC": "1C",
    "titre": "Boissons",
    "value": 1000
  }, {
    "idC": "2C",
    "titre": "Bonbons",
    "value": 2000
  }, {
    "idC": "3C",
    "titre": "Cafés",
    "value": 3000
  }, {
    "idC": "4C",
    "titre": "Chips",
    "value": 4000
  }, {
    "idC": "5C",
    "titre": "Chocolats",
    "value": 5000
  }, {
    "idC": "6C",
    "titre": "Conserves",
    "value": 6000
  }, {
    "idC": "7C",
    "titre": "&Eacute;picerie salée",
    "value": 7000
  }, {
    "idC": "8C",
    "titre": "&Eacute;picerie sucrée",
    "value": 8000
  }, {
    "idC": "9C",
    "titre": "&Eacute;pices",
    "value": 9000
  }, {
    "idC": "10C",
    "titre": "Farines",
    "value": 10000
  }, {
    "idC": "11C",
    "titre": "Fruits secs",
    "value": 11000
  }, {
    "idC": "12C",
    "titre": "Gâteaux",
    "value": 12000
  }, {
    "idC": "13C",
    "titre": "Hygiène",
    "value": 13000
  }, {
    "idC": "14C",
    "titre": "Légumes secs",
    "value": 14000
  }, {
    "idC": "15C",
    "titre": "Thés",
    "value": 15000
  }
]
//Exportation du tableau Categories sous Firebase
var idcateg, namecateg, valueCateg;
window.ExpCategories = function ExpCategories() {
  document.getElementById('exportCategories').onclick = function () {
    for (let numf = 0; numf < categsTable.length; numf++) {
      idcateg = categsTable[numf].idC;
      namecateg = categsTable[numf].titre;
      valueCateg = categsTable[numf].value;

      firebase.database().ref('categories/' + namecateg).set({
        idC: idcateg,
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


//Sélection des datas relatives aux produits depuis firebase ou le localstorage
firebase.database().ref("products/").on('value', function (snapshot) {
  var productsArray = new Array;
  //Récupère tous le tableau products de firebase et l'insère dans un tableau productsArray
  snapshot.forEach(function (childSnapshot) {
    var productID = childSnapshot.val().id;
    var productLibelle = childSnapshot.val().libelle;
    var productPrice = childSnapshot.val().prix;
    var productQuantity = childSnapshot.val().quantity;
    var productCategory = childSnapshot.val().category;
    var productDescriptive = childSnapshot.val().descriptive;
    var productURL = childSnapshot.val().Link;
    var productSLegend = childSnapshot.val().short_legend;
    var ajout = { 'id': productID, 'name': productLibelle, 'prix': productPrice, 'quantity' : productQuantity, 'categorie': productCategory, 'descriptive': productDescriptive, 'url': productURL, 'short_legend': productSLegend };
    productsArray.push(ajout);
  });
  localStorage.setItem("productsArray", JSON.stringify(productsArray));
});

window.productsArrayToPhp = function productsArrayToPhp() {
  var bddProducts = localStorage.getItem("productsArray");
  $.post('ajax-test.php', { postbbd: bddProducts },
      function (data) {
          $('#result').html(data);
      });
}
