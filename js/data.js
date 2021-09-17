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


//Fonction de conversion de la BDD fixe du site en json et stockage au localstorage
document.getElementById('jsonConvert').onclick = function () {
  //Ajout des champs id et quantité à l'array tab_categorie
  var length_cat = tab_categorie.length;
  for (let num = 0; num < length_cat; num++) {
    var lengti = tab_categorie[num].length;
    var titre = tabtitre[num];
    for (let numi = 0; numi < lengti; numi++) {
      var id = (num * 1000).toString() + numi.toString();
      const ajout = { 'quantity': 0, 'id': id, 'categorie': titre, 'legend_P1': "",'short_legend': ""};
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



// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  /*
  apiKey: process.env.VUE_APP_API_KEY,
authDomain: process.env.VUE_APP_AUTH_DOMAIN,
projectId: process.env.VUE_APP_PROJECT_ID,
databaseURL: process.env.VUE_APP_DB_URL,
storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
appId: process.env.VUE_APP_APP_ID,
measurementId: process.env.VUE_APP_MEASUREMENT_ID
  */

  apiKey: "AIzaSyBojMuKZJSJBC-O6JRkI9UmbjErGka1b1E",
  authDomain: "attable-51633.firebaseapp.com",
  projectId: "attable-51633",
  databaseURL: "https://attable-51633-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "attable-51633.appspot.com",
  messagingSenderId: "255390814899",
  appId: "1:255390814899:web:714ec5ace61cd6479796c6",
  measurementId: "G-2DZWXDMSY6"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var retrievedObject = JSON.parse(localStorage.getItem('bddproducts'));
var urlF, libelleF, prixF, texteF, quantityF, idF, categorieF;
var productscollection = db.collection('products');

function Ready() {
  for (let num = 0; num < retrievedObject.length; num++) {
    urlF = retrievedObject[num].url;
    libelleF = retrievedObject[num].libelle;
    prixF = retrievedObject[num].prix;
    texteF = retrievedObject[num].texte;
    quantityF = retrievedObject[num].quantity;
    idF = retrievedObject[num].id;
    categorieF = retrievedObject[num].categorie;

    firebase.database().ref('products/' + idF).set({
      url: urlF,
      libelle: libelleF,
      prix: prixF,
      texte: texteF,
      quantity: quantityF,
      id: idF,
      categorie: categorieF
    });

    productscollection.doc(idF).set({
      url: urlF,
      libelle: libelleF,
      prix: prixF,
      texte: texteF,
      quantity: quantityF,
      id: idF,
      categorie: categorieF
    });
  }
}
document.getElementById('test').onclick = function () {
  Ready();
}