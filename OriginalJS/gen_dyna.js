/*
Auteur : Johan GIROUX
2020-2021
Dernière MAJ : 30/10/2021
V2.9
*/


//Déclaration du tableau des catégories
import { tab_categorie } from '../js/data-obf.js'

//Appel de la fonction defrag_cookie
import { defrag_cookie } from '../js/panier-obf.js'



//Fonctions de contrôle de version de la BDD
function FirstMajBdd() {
    var infoMaj;
    const bdd = firebase.database().ref("DateMaj/").limitToLast(1);
    bdd.on('value', snap => {
        snap.forEach(function (item) {
            infoMaj = item.val().IDD;
            localStorage.setItem("actualVersionBdd", infoMaj);
        });
    });
}
function ControlMajBdd() {
    var today = new Date();
    var controleMaj = today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString() + today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
    localStorage.setItem("controleVersionBdd", controleMaj);
}

ControlMajBdd();

//Sélection des datas relatives aux produits depuis firebase ou le localstorage
function infoproducts() {
    firebase.database().ref("products/").on('value', function (snapshot) {
        var productsArray = new Array;
        let productsSelectedArray = new Array;
        var incompleteProducts = new Array;
        if (snapshot.val() != null || parseFloat(localStorage.getItem("controleVersionBdd")) != parseFloat(localStorage.getItem("actualVersionBdd"))) {
            snapshot.forEach(function (childSnapshot) {
                var productID = childSnapshot.val().id;
                var productLibelle = childSnapshot.val().libelle;
                var productPrice = childSnapshot.val().prix;
                var productCategory = childSnapshot.val().category;
                var productDescriptive = childSnapshot.val().descriptive;
                var productURL = childSnapshot.val().Link;
                var productSLegend = childSnapshot.val().short_legend;
                var ajout = { 'id': productID, 'name': productLibelle, 'prix': productPrice, 'categorie': productCategory, 'descriptive': productDescriptive, 'url': productURL, 'short_legend': productSLegend };
                productsArray.push(ajout);
            });
            //Sélectionne les produits complets du tableau productsArray et les insère dans le tableau productsSelectedArray sinon dans incompleteProducts
            function tri(element) {
                if (element.id == null || element.name == null || element.prix == null || element.categorie == null || element.descriptive == null || element.url == null || element.short_legend == null || element.id == "" || element.name == "" || element.prix == "" || element.categorie == "" || element.descriptive == "" || element.url == "" || element.short_legend == "") {
                    incompleteProducts.push(element.id);
                }
                else {
                    var productSelected = { 'id': element.id, 'name': element.name, 'prix': element.prix, 'categorie': element.categorie, 'descriptive': element.descriptive, 'url': element.url, 'short_legend': element.short_legend };
                    productsSelectedArray.push(productSelected);
                }
            }
            productsArray.forEach(element => tri(element));
            localStorage.setItem("productsArray", JSON.stringify(productsArray));
            localStorage.setItem("productsSelected", JSON.stringify(productsSelectedArray));
            FirstMajBdd();
        }
        //Récupère tous le tableau products de firebase et l'insère dans un tableau productsArray
        else {
            ControlMajBdd();
            productsSelectedArray = localStorage.getItem("productsSelected");
        }
    });
}
infoproducts();
var productList = JSON.parse(localStorage.getItem("productsSelected"));


function productSelection(choice) {
    var productCategorieChosen = new Array;
    productList.forEach(function (item) {
        if (choice == item.categorie) {
            productCategorieChosen.push(item);
        }
    })
    return productCategorieChosen;
}

//Sélection des datas relatives aux catégories depuis firebase ou le localstorage
function infocategorie() {
    firebase.database().ref("categories/").on('value', function (snapshot) {
        let productsSelectedArray = new Array;
        var categoriesArray = new Array;
        if (snapshot.val() != null || parseFloat(localStorage.getItem("controleVersionBdd")) != parseFloat(localStorage.getItem("actualVersionBdd"))) {
            snapshot.forEach(function (childSnapshot) {
                var productID = childSnapshot.val().idC;
                var productName = childSnapshot.val().nom;
                var productValue = childSnapshot.val().valeur;
                var productLink = childSnapshot.val().Link;
                var ajoutC = { 'id': productID, 'name': productName, 'valeur': productValue, 'url': productLink };
                categoriesArray.push(ajoutC);
            });
            localStorage.setItem("categoriesSelected", JSON.stringify(categoriesArray));
            FirstMajBdd();
        }
        //Récupère tous le tableau products de firebase et l'insère dans un tableau categoriesArray
        else {
            ControlMajBdd();
            productsSelectedArray = localStorage.getItem("categoriesSelected");
        }
    });
}
infocategorie();

//V3-BackEnd - Fonction de génération des catégories à la page d'accueil - index.html
window.liste_categorie = function liste_categorie() {
    var categorieList = JSON.parse(localStorage.getItem("categoriesSelected"));
    //Création de la div mère
    var section = document.getElementById('tab_categs');
    var divmere = document.createElement('div');
    divmere.className = "container liste_categorie px-4 px-lg-5 mt-5";
    section.appendChild(divmere);
    //Création du titre du menu des catégories
    var titreh3 = document.createElement('h3');
    titreh3.innerHTML = "Les catégories de produit que l'on s'arrache";
    divmere.appendChild(titreh3);
    //Création du menu des catégories
    var divfille = document.createElement('div');
    divfille.className = "row row-cols-2 row-cols-md-3 row-cols-xl-4";
    divfille.id = "tableau_image_categorie";
    divmere.appendChild(divfille);

    categorieList.forEach(function (item) {
        //Div categ contenant divimg et divtext
        var divcateg = document.createElement('div');
        divcateg.className = "card_cat";
        divfille.appendChild(divcateg);
        //divimg contenant l'image de la catégorie
        var divimg = document.createElement('div');
        divimg.className = "card text-center";
        divimg.id = "index-box";
        divimg.addEventListener("click", function (e) {
            window.location.href = "categorie.html?categorie=" + item.name;
        }, false);
        divcateg.appendChild(divimg);
        //Image de la catégorie
        var image_categorie = document.createElement('img')
        image_categorie.className = "card-img-top img-fluid cats";
        image_categorie.src = item.url;
        image_categorie.alt = '...';
        divimg.appendChild(image_categorie);
        //divtext contenant le texte de la catégorie
        var divtext = document.createElement('div');
        divtext.className = "card-body p-4 text-center";
        divcateg.appendChild(divtext);
        //Texte de la catégorie
        var text_categorie = document.createElement('h5')
        text_categorie.className = "fw-bolder";
        text_categorie.innerHTML = item.name;
        divtext.appendChild(text_categorie);
    });
}


//V3-BackEnd - Fonction de génération du bandeau des pages - categorie.html + panier.html
window.bandeau = function bandeau() {
    var categorieList = JSON.parse(localStorage.getItem("categoriesSelected"));
    var bande = document.getElementById("bande");

    categorieList.forEach(function (item) {
        if (window.location.pathname == "/Attable-Xampp/panier.html" || window.location.pathname == "/attable/panier.html" || window.location.pathname == "/panier.html") {
            var divbandeau = document.createElement('li')
            divbandeau.className = "nav-item text-center";
            bande.appendChild(divbandeau);

            var acat = document.createElement('a')
            acat.className = "nav-link";
            acat.addEventListener("click", function (e) {
                window.location.href = "categorie.html?categorie=" + item.name;
            }, false);
            acat.innerHTML = item.name;
            divbandeau.appendChild(acat);
        }
        else {
            var divbandeau = document.createElement('li')
            divbandeau.className = "nav-item text-center";
            bande.appendChild(divbandeau);

            var acat = document.createElement('a')
            acat.className = "nav-link";
            acat.addEventListener("click", function (e) {
                changeCategorie(item.name);
            }, false);
            acat.innerHTML = item.name;
            divbandeau.appendChild(acat);
        }
    });
}


//V2 Fonction de génération des 5 images/textes des catégories à partir de la page Index.html
window.chargement = function chargement() {
    //On récupère le paramètre de l'URL pour définir des variables
    var number = new URLSearchParams(window.location.search).get('categorie');

    document.getElementById("ajout_titre_categorie").innerHTML = number;

    var categorie_page = document.getElementById("descriptif_cat");
    var productsOneCategorieSelected = productSelection(number);
    //Boucle de création des produits
    if (productsOneCategorieSelected.length == 0) {
        document.getElementById("descriptif_cat").innerHTML += "Il n'y a pas de produits pour cette catégorie";
    }
    else {
        productsOneCategorieSelected.forEach(function (item) {
            //Met à jour et affiche la quantité de chaque produit
            if (readCookie("list_achat") != null) {
                var controle = defrag_cookie("list_achat");
                for (let i = 0; i < controle.length; i++) {
                    if (item.id != controle[i][0]) {
                        valeur = "";
                    }
                    else {
                        valeur = controle[i][4];
                    }
                }
            }
            else {
                var valeur = "";
            }
            //Création de la page des produits
            var div1 = document.createElement('div')
            div1.className = "un_produit";
            categorie_page.appendChild(div1);

            var a11 = document.createElement('a')
            a11.className = "card card_categs";
            a11.href = '#main';
            div1.appendChild(a11);

            var img111 = document.createElement('img')
            img111.className = "card-img-top produit";
            img111.src = item.url;
            img111.alt = "...";
            /*img111.addEventListener("click", function (e) {
                fiche_detaillee(number, cat_index);
            }, false);*/
            a11.appendChild(img111);

            var div12 = document.createElement('div')
            div12.className = "card-body text-center";
            div1.appendChild(div12);

            var h5121 = document.createElement('h5')
            h5121.className = "fw-bolder legend_produit";
            h5121.innerHTML = item.name;
            div12.appendChild(h5121);

            var div122 = document.createElement('div')
            div122.id = "info-prix";
            if (item.prix == 0 || item.prix == "") {
                div122.innerHTML = "Prix : &Agrave; voir en magasin";
            }
            else {
                div122.innerHTML = item.prix + " €";
            }
            div12.appendChild(div122);

            var div13 = document.createElement('div')
            div13.id = "modul_quantity";
            div13.className = "card-footer";
            div1.appendChild(div13);

            var input131 = document.createElement('input')
            input131.setAttribute("type", "button");
            input131.className = "bmoins add-to-cart";
            input131.value = "-";
            if (valeur > 0) {
                input131.style.visibility = "visible";
            }
            else {
                input131.style.visibility = "hidden";
            }
            input131.id = "moins" + item.id;
            input131.dataset.id = item.id;
            input131.dataset.name = item.name;
            input131.dataset.price = item.prix;
            input131.dataset.url = item.url;
            input131.addEventListener("click", function (e) {
                minus(item.id);
            }, false);
            div13.appendChild(input131);

            var input132 = document.createElement('input')
            input132.setAttribute("type", "button");
            input132.className = "affich_valeur";
            input132.value = valeur;
            input132.id = "count" + item.id;
            input132.disabled = true;
            if (valeur > 0) {
                input132.style.visibility = "visible";
            }
            else {
                input132.style.visibility = "hidden";
            }
            div13.appendChild(input132);

            var input133 = document.createElement('input')
            input133.setAttribute("type", "button");
            input133.className = "bplus add-to-cart";
            input133.value = "+";
            input133.id = "plus" + item.id;
            input133.dataset.id = item.id;
            input133.dataset.name = item.name;
            input133.dataset.price = item.prix;
            input133.dataset.url = item.url;
            input133.addEventListener("click", function (e) {
                plus(item.id);
            }, false);
            div13.appendChild(input133);

            if (item.prix == 0 || item.prix == "") {
                document.getElementById("plus" + item.id).style.visibility = 'hidden';
            }
        });
    }
}



//Fonction de génération des 5 images/textes des catégories de la page Catégorie
window.changeCategorie = function changeCategorie(number) {
    var categorie_page = document.getElementById("descriptif_cat");
    document.getElementById("descriptif_cat").innerHTML = "";

    var categorie_page = document.getElementById("descriptif_cat");
    var productsOneCategorieSelected = productSelection(number);

    document.getElementById("ajout_titre_categorie").innerHTML = number;

    //Boucle de création des produits
    if (productsOneCategorieSelected.length == 0) {
        document.getElementById("descriptif_cat").innerHTML += "Il n'y a pas de produits pour cette catégorie";
    }
    else {
        productsOneCategorieSelected.forEach(function (item) {
            //Met à jour et affiche la quantité de chaque produit
            if (readCookie("list_achat") != null) {
                var controle = defrag_cookie("list_achat");
                for (let i = 0; i < controle.length; i++) {
                    if (item.id != controle[i][0]) {
                        valeur = "";
                    }
                    else {
                        valeur = controle[i][4];
                    }
                }
            }
            else {
                var valeur = "";
            }
            //Création de la page des produits
            var div1 = document.createElement('div')
            div1.className = "un_produit";
            categorie_page.appendChild(div1);

            var a11 = document.createElement('a')
            a11.className = "card card_categs";
            a11.href = '#main';
            div1.appendChild(a11);

            var img111 = document.createElement('img')
            img111.className = "card-img-top produit";
            img111.src = item.url;
            img111.alt = "...";
            /*img111.addEventListener("click", function (e) {
                fiche_detaillee(number, cat_index);
            }, false);*/
            a11.appendChild(img111);

            var div12 = document.createElement('div')
            div12.className = "card-body text-center";
            div1.appendChild(div12);

            var h5121 = document.createElement('h5')
            h5121.className = "fw-bolder legend_produit";
            h5121.innerHTML = item.name;
            div12.appendChild(h5121);

            var div122 = document.createElement('div')
            div122.id = "info-prix";
            if (item.prix == 0 || item.prix == "") {
                div122.innerHTML = "Prix : &Agrave; voir en magasin";
            }
            else {
                div122.innerHTML = item.prix + " €";
            }
            div12.appendChild(div122);

            var div13 = document.createElement('div')
            div13.id = "modul_quantity";
            div13.className = "card-footer";
            div1.appendChild(div13);

            var input131 = document.createElement('input')
            input131.setAttribute("type", "button");
            input131.className = "bmoins add-to-cart";
            input131.value = "-";
            if (valeur > 0) {
                input131.style.visibility = "visible";
            }
            else {
                input131.style.visibility = "hidden";
            }
            input131.id = "moins" + item.id;
            input131.dataset.id = item.id;
            input131.dataset.name = item.name;
            input131.dataset.price = item.prix;
            input131.dataset.url = item.url;
            input131.addEventListener("click", function (e) {
                minus(item.id);
            }, false);
            div13.appendChild(input131);

            var input132 = document.createElement('input')
            input132.setAttribute("type", "button");
            input132.className = "affich_valeur";
            input132.value = valeur;
            input132.id = "count" + item.id;
            input132.disabled = true;
            if (valeur > 0) {
                input132.style.visibility = "visible";
            }
            else {
                input132.style.visibility = "hidden";
            }
            div13.appendChild(input132);

            var input133 = document.createElement('input')
            input133.setAttribute("type", "button");
            input133.className = "bplus add-to-cart";
            input133.value = "+";
            input133.id = "plus" + item.id;
            input133.dataset.id = item.id;
            input133.dataset.name = item.name;
            input133.dataset.price = item.prix;
            input133.dataset.url = item.url;
            input133.addEventListener("click", function (e) {
                plus(item.id);
            }, false);
            div13.appendChild(input133);

            if (item.prix == 0 || item.prix == "") {
                document.getElementById("plus" + item.id).style.visibility = 'hidden';
            }

        });
    }
    document.getElementById('fiche_produit').style.display = 'none';
}



/*
//Fonction de génération de la fiche détaillée du produit
window.fiche_detaillee = function fiche_detaillee(number, cat_index) {
    var valeur;
    var id = (number * 1000).toString() + cat_index.toString();

    document.getElementById('fiche_produit').style.display = 'block';

    //Met à jour et affiche la quantité de chaque produit
    if (readCookie("list_achat") != null) {
        var controle = defrag_cookie("list_achat");
        for (let i = 0; i < controle.length; i++) {
            if (id != controle[i][0]) {
                valeur = "";
            }
            else {
                valeur = controle[i][4];
            }
        }
    }
    else {
        var valeur = "";
    }

    if (tab_categorie[number][cat_index].prix == 0) {
        var champs_prix = "Prix : &Agrave; voir en magasin";
    }
    else {
        var champs_prix = "Prix :&nbsp;" + tab_categorie[number][cat_index].prix + " €";
    }

    var fd1 = "<table class='table w-100' id='deta-tab'><tr><td id='description_produit2' colspan='2'class='text-center'><p>";
    var fd2 = tab_categorie[number][cat_index].libelle;
    var fd3 = "</p></td></tr><tr><td rowspan='2'><div id='description_produit' class='example'><div class='overlay'>🔎</div><img src='";
    var fd4 = tab_categorie[number][cat_index].url;
    var fd5 = "' alt='Conserves' class='cats'></div></td><td class='text-center'><p>";
    var fd6 = tab_categorie[number][cat_index].texte;
    var fd7 = "</p></td></tr><tr><td class='text-center'><span id='id_prix_produit'>";
    var fd8 = champs_prix;
    var fd9 = "</span></td></tr><tr><td colspan='2'><div id='modul_quantity'><input class='bmoins add-to-cart' type='button' value='-' id='moins";
    var fd10 = cat_index;
    var fd11 = "' data-id='";
    var fd12 = pre_id.toString() + cat_index.toString();
    var fd13 = "' data-name='";
    var fd14 = tab_categorie[number][cat_index].libelle;
    var fd15 = "' data-price='";
    var fd16 = tab_categorie[number][cat_index].prix;
    var fd17 = "' data-url='";
    var fd18 = tab_categorie[number][cat_index].url;
    var fd19 = "' onclick='minus(";
    var fd20 = cat_index;
    var fd21 = ")'><input class='affich_valeur' value='";
    var fd22 = valeur;
    var fd23 = "' id='count";
    var fd24 = cat_index;
    var fd25 = "' disabled><input type='button' class='bplus add-to-cart' value='+' id='plus";
    var fd26 = cat_index;
    var fd27 = "' data-id='";
    var fd28 = pre_id.toString() + cat_index.toString();
    var fd29 = "' data-name='";
    var fd30 = tab_categorie[number][cat_index].libelle;
    var fd31 = "' data-price='";
    var fd32 = tab_categorie[number][cat_index].prix;
    var fd33 = "' data-url='";
    var fd34 = tab_categorie[number][cat_index].url;
    var fd35 = "' onclick='plus(";
    var fd36 = cat_index;
    var fd37 = ")'></div></td><tr></table>";
    document.getElementById("fiche_produit").innerHTML = fd1 + fd2 + fd3 + fd4 + fd5 + fd6 + fd7 + fd8 + fd9 + fd10 + fd11 + fd12 + fd13 + fd14 + fd15 + fd16 + fd17 + fd18 + fd19 + fd20 + fd21 + fd22 + fd23 + fd24 + fd25 + fd26 + fd27 + fd28 + fd29 + fd30 + fd31 + fd32 + fd33 + fd34 + fd35 + fd36 + fd37;

    if (tab_categorie[number][cat_index].prix == 0 || tab_categorie[number][cat_index].prix == "") {
        document.getElementById("plus" + cat_index).style.visibility = 'hidden';
    }

    $(document).ready(function () {
        $('.example').izoomify();
    });
}
*/


//Génération du logo avec Localstorage pour la page Index
window.genlogo = function genlogo() {
    var test = "<img src='images/attable_logo2.png' class='img-fluid' alt='monlogo' id='lelogo'>";
    localStorage.setItem("logoimg", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(test))));
    var urllogo = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("logoimg"))));
    document.getElementById("logo").innerHTML = urllogo;
}


//Génération des styles avec Localstorage pour la page CGU
window.gencss = function gencss() {
    var css = "<link rel='stylesheet' href='css/attable.css'>";
    localStorage.setItem("stylecss", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(css))));
    var cssstyle = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("stylecss"))));
    document.getElementById("headtest").innerHTML += cssstyle;
}

