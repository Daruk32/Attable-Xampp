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


//Ajout des champs id et quantité à l'array tab_categorie
var length_cat = tab_categorie.length;
for (let num = 0; num < length_cat; num++) {
  var lengti = tab_categorie[num].length;
  var titre = tabtitre[num];
  for (let numi = 0; numi < lengti; numi++) {
    var id = (num * 1000).toString() + numi.toString();
    const ajout = { 'quantity': 0, 'id': id, 'categorie': titre };
    tab_categorie[num][numi] = Object.assign(tab_categorie[num][numi], ajout);
  }
}


//On casse la catégorisation des arrays
var tab_product = tab_categorie.reduce(function (prev, curr) {
  return prev.concat(curr);
});


//Pour sérialiser  
var str_json = JSON.stringify(tab_product);
//console.log(str_json);

//Pour décomposer
//var test4 = JSON.parse(str_json);
//console.log(test);


//Sauvegarde du json dans le localstorage  
localStorage.setItem("bddproducts", str_json);


//Envoi de la base de donnée en json à la page php
//Envoi de la BDD json au file json


/*
//FIREBASE
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
var db = firebase.firestore();

// Add a new document in collection "cities"
db.collection("cities").doc("LA").set({
  name: "Los Angeles",
  state: "CA",
  country: "USA"
})
.then(() => {
  console.log("Document successfully written!");
})
.catch((error) => {
  console.error("Error writing document: ", error);
});
*/











/*
const firebase = require("firebase");
require("firebase/firestore");
const fs = require("fs");
const { resolve } = require('path');
firebase.initializeApp({
  apiKey: "AIzaSyBojMuKZJSJBC-O6JRkI9UmbjErGka1b1E",
  authDomain: "attable-51633.firebaseapp.com",
  projectId: "attable-51633",
  storageBucket: "attable-51633.appspot.com",
  messagingSenderId: "255390814899",
  appId: "1:255390814899:web:714ec5ace61cd6479796c6",
  measurementId: "G-2DZWXDMSY6"
});
class PopulateJsonFireStore {
  constructor() {
    console.time("Time Taken");
    this.db = firebase.firestore();
    const [, , filepath, type, collectionname] = process.argv;
    this.absolutepath = resolve(process.cwd(), filepath);
    this.type = type;
    this.collectionname = collectionname;

    if (this.type == ! 'set' && this.type == ! 'add') {
      console.error('Wrong method type ${this.type}')
      console.log('Accepted Method are : set or add');
      this.exit(1);
    }

    if (this.absolutepath == null || this.absolutepath < 1) {
      console.error('Make sure you have file path assigned ${this.absolutepath}')
      this.exit(1);
    }

    if (this.collectionname == null || this.collectionname < 1) {
      console.error('Make sure to specify collection name ${this.collectionname}')
      this.exit(1);
    }

    console.log('ABS : FILE PATH ${this.absolutepath}');
    console.log('Type : method is ${this.type}');

  }

  async populate() {
    let data = [];

    try {
      data = JSON.parse(fs.readFileSync(this.absolutepath, {}), 'utf8');
    } catch (e) {
      console.error(e.message);
    }

    if (data.length<1) {
      console.error("make sure file contain items");
    }
    var i = 0;
    for (var item of data) {
      console.log(item);
      try { this.type === 'set' ? await this.set(item) : await this.add(item);      
      } catch(e) {
        console.log(e.message)
        this.exit(1);
      }

      if (data.length - 1 === i) {
        console.log("SUCCESS");
        console.timeEnd('Time taken');
        this.exit(0);
      }

      i++;
    }


  }
}
*/