/*
Auteur : Johan GIROUX
2020-2022
Dernière MAJ : 09/05/2022
V2.9
*/



/* ---------------------------------------------- Partie des Produits ---------------------------------------------- */

//Déclaration du tableau des catégories
export var tableCategories = new Array();
//Déclaration du tableau des titres des catégories
export var tableTitles = new Array();

//Promotions
import { tab_promo } from '../categorie/promotions/promotions.js'
tableCategories.push(tab_promo);
tableTitles.push("Promotions");
//Boissons
import { tab_boisson } from '../categorie/boissons/boissons.js'
tableCategories.push(tab_boisson);
tableTitles.push("Boissons");
//Bonbons
import { tab_bonbon } from '../categorie/bonbons/bonbons.js'
tableCategories.push(tab_bonbon);
tableTitles.push("Bonbons");
//Cafés
import { tab_cafe } from '../categorie/cafes/cafes.js'
tableCategories.push(tab_cafe);
tableTitles.push("Cafés");
//Chips
import { tab_chips } from '../categorie/chips/chips.js'
tableCategories.push(tab_chips);
tableTitles.push("Chips");
//Chocolats
import { tab_chocolat } from '../categorie/chocolats/chocolats.js'
tableCategories.push(tab_chocolat);
tableTitles.push("Chocolats");
//Conserves
import { tab_conserves } from '../categorie/conserves/conserves.js'
tableCategories.push(tab_conserves);
tableTitles.push("Conserves");
//Epicerie salée
import { tab_epiceriesal } from '../categorie/epiceriesalee/epiceriesalee.js'
tableCategories.push(tab_epiceriesal);
tableTitles.push("Epicerie salée");
//Epicerie sucrée
import { tab_epiceriesuc } from '../categorie/epiceriesucree/epiceriesucree.js'
tableCategories.push(tab_epiceriesuc);
tableTitles.push("Epicerie sucrée");
//Epices
import { tab_epices } from '../categorie/epices/epices.js'
tableCategories.push(tab_epices);
tableTitles.push("Epices");
//Farines
import { tab_farines } from '../categorie/farines/farines.js'
tableCategories.push(tab_farines);
tableTitles.push("Farines");
//Fruits secs
import { tab_fruitsecs } from '../categorie/fruitssecs/fruitssecs.js'
tableCategories.push(tab_fruitsecs);
tableTitles.push("Fruits secs");
//Gâteaux
import { tab_gateau } from '../categorie/gateaux/gateaux.js'
tableCategories.push(tab_gateau);
tableTitles.push("Gâteaux");
//Hygiène
import { tab_hygiene } from '../categorie/hygiene/hygiene.js'
tableCategories.push(tab_hygiene);
tableTitles.push("Hygiène");
//Légumes secs
import { tab_legumesecs } from '../categorie/legumessecs/legumessecs.js'
tableCategories.push(tab_legumesecs);
tableTitles.push("Légumes secs");
//Thés
import { tab_the } from '../categorie/thes/thes.js'
tableCategories.push(tab_the);
tableTitles.push("Thés");

/**
 * Fonction - Conversion du tableau local des produits en JSON puis stockage dans le localstorage
 */
document.getElementById('jsonConvert').addEventListener('click', function () {
  //Ajout des champs id et quantité à l'array tableCategories
  for (let num = 0; num < tableCategories.length; num++) {
    for (let numi = 0; numi < tableCategories[num].length; numi++) {
      const ajout = { 'quantity': 0, 'id': (num * 1000).toString() + numi.toString(), 'categorie': tableTitles[num], 'legend_P1': "", 'short_legend': "" };
      tableCategories[num][numi] = Object.assign(tableCategories[num][numi], ajout);
    }
  }
  //On casse la catégorisation des arrays
  var tab_product = tableCategories.reduce(function (prev, curr) {
    return prev.concat(curr);
  });
  //Sauvegarde du json dans le localstorage  
  localStorage.setItem("bddproducts", JSON.stringify(tab_product));
  console.log(tab_product);
});


/**
 * Fonction - Exportation du tableau Produits sous Firebase
 */
// Partie des commandes relatives au Firestore
// const db = firebase.firestore();
// var productscollection = db.collection('products');

var urlF, libelleF, prixF, texteF, quantityF, idF, categorieF;
document.getElementById('exportProducts').addEventListener('click', function () {
  var retrieveBddProducts = JSON.parse(localStorage.getItem('bddproducts'));

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
  /* Partie Firestore
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
});

/* ---------------------------------------------- Partie des Fournisseurs ---------------------------------------------- */

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
document.getElementById('exportSuppliers').addEventListener('click', function () {
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
  console.log("Table Fournisseurs insérée");
});


//Exportation du tableau Categories sous Firebase
document.getElementById('exportCategories').addEventListener("click", function () {
  var idcateg, namecateg, valueCateg;
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
  console.log("Table Catégories insérée")
});


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
    var ajout = { 'id': productID, 'name': productLibelle, 'prix': productPrice, 'quantity': productQuantity, 'categorie': productCategory, 'descriptive': productDescriptive, 'url': productURL, 'short_legend': productSLegend };
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


//Download des datas
document.getElementById('importFilesBdd').addEventListener("click", function () {
  //Download du tableau des produits
  firebase.database().ref("products/").on('value', function (snapshot) {
    var saveFileProducts = new Array;
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
      var productText = childSnapshot.val().texte;
      var ajout = { 'id': productID, 'name': productLibelle, 'prix': productPrice, 'quantity': productQuantity, 'categorie': productCategory, 'descriptive': productDescriptive, 'url': productURL, 'short_legend': productSLegend, 'texte': productText };
      saveFileProducts.push(ajout);
    });
    // console.log(JSON.stringify(saveFileProducts));
    localStorage.setItem("fileProductsArray", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(saveFileProducts))));
  });

  //Download du tableau des catégories
  firebase.database().ref("categories").once('value', function (snapshot) {
    var saveFileCategories = new Array;
    snapshot.forEach(function (childSnapshot) {
      var link = childSnapshot.val().Link;
      var ref = childSnapshot.val().idC;
      var nom = childSnapshot.val().nom;
      var valeur = childSnapshot.val().valeur;
      var ajout = { 'id': ref, 'name': nom, 'indice': valeur, 'lienImage': link };
      saveFileCategories.push(ajout);
    });
    // console.log(JSON.stringify(saveFileCategories));
    localStorage.setItem("fileCategoriesArray", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(saveFileCategories))));
  });

  //Download du tableau des fournisseurs
  firebase.database().ref("suppliers").once('value', function (snapshot) {
    var saveFileSuppliers = new Array;
    snapshot.forEach(function (childSnapshot) {
      var adresse = childSnapshot.val().adresse;
      var ref = childSnapshot.val().idS;
      var info1 = childSnapshot.val().info1;
      var info2 = childSnapshot.val().info2;
      var name = childSnapshot.val().nom;
      var price = childSnapshot.val().prix;
      var ajout = { 'id': ref, 'name': name, 'price': price, 'info1': info1, 'info2': info2 };
      saveFileSuppliers.push(ajout);
    });
    localStorage.setItem("fileSuppliersArray", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(saveFileSuppliers))));
  });

  // Cryptage et stockage des datas
  var fileProducts = CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("fileProductsArray")));
  var fileCategories = CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("fileCategoriesArray")));
  var fileSuppliers = CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("fileSuppliersArray")));
  // Suppression des stockages temporaires
  localStorage.removeItem('fileProductsArray');
  localStorage.removeItem('fileCategoriesArray');
  localStorage.removeItem('fileSuppliersArray');
  // Compilation des tableaux
  var compiledFile = {};
  compiledFile['products'] = fileProducts;
  compiledFile['categories'] = fileCategories;
  compiledFile['suppliers'] = fileSuppliers;
  var finalCompiledFile = JSON.stringify(compiledFile);
  // console.log(JSON.parse(finalCompiledFile)['products']);
  // Injection des datas dans le bdd.json
  $.post('backupBDD.php', { postbbd: finalCompiledFile },
    function (data) {
      $('#result').html(data);
    });

  alert("Download effectué.");
});

