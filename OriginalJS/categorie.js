/*
Auteur : Johan GIROUX
2020-2021
Dernière MAJ : 30/10/2021
V2.9
*/

// Initialize Firebase



//Déclaration du tableau des catégories
import { tab_categorie } from '../js/data-obf.js'

//Appel de la fonction defrag_cookie
import { defrag_cookie } from '../js/panier-obf.js'

var productsSelectedArray = new Array;

//Fonction de sélection de la gamme voulue
function productSelection(choice) {
    var productCategorieChosen = new Array;
    productsSelectedArray.forEach(function (item) {
        if (choice == item.categorie) {
            productCategorieChosen.push(item);
        }
    })
    return productCategorieChosen;
}

//Génération de la page des produits par catégorie avec les data Firebase
firebase.database().ref("products/").on('value', function (snapshot) {
    var productsArray = new Array;
    var incompleteProducts = new Array;
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
    //localStorage.setItem("productsArray", JSON.stringify(productsArray));


    //On récupère le paramètre de l'URL pour définir des variables
    var number = new URLSearchParams(window.location.search).get('categorie');
    document.getElementById("ajout_titre_categorie").innerHTML = number;
    
    var indexProduit = 0;
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
            img111.addEventListener("click", function (e) {
                fiche_detaillee(item, indexProduit);
            }, false);
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

            indexProduit++;

            if (item.prix == 0 || item.prix == "") {
                document.getElementById("plus" + item.id).style.visibility = 'hidden';
            }
        });
    }
});


//Fonction de génération des 5 images/textes des catégories depuis le bandeau
function changeCategorie(number) {
    var categorie_page = document.getElementById("descriptif_cat");
    document.getElementById("descriptif_cat").innerHTML = "";

    var categorie_page = document.getElementById("descriptif_cat");
    var productsOneCategorieSelected = productSelection(number);
    var indexProduit = 0;
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
            img111.addEventListener("click", function (e) {
                fiche_detaillee(item, indexProduit);
            }, false);
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

            indexProduit++;

        });
    }
    document.getElementById('fiche_produit').style.display = 'none';
}


//V3-BackEnd - Fonction de génération du bandeau des pages - categorie.html + panier.html
var categorieList = JSON.parse(localStorage.getItem("categoriesSelected"));
var bande = document.getElementById("bande");

categorieList.forEach(function (item) {
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
});




//Fonction de génération de la fiche détaillée du produit
window.fiche_detaillee = function fiche_detaillee(item, indexProduit) {
    var ficheProduit = document.getElementById("fiche_produit");

    var valeur;

    document.getElementById('fiche_produit').style.display = 'block';

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

    if (item.prix == 0) {
        var champs_prix = "Prix : &Agrave; voir en magasin";
    }
    else {
        var champs_prix = "Prix :&nbsp;" + item.prix + " €";
    }

    //table
    var table1 = document.createElement('table')
    table1.className = "table w-100";
    table1.id = "deta-tab";
    ficheProduit.appendChild(table1);
    //tr1
    var tr1 = document.createElement('tr')
    table1.appendChild(tr1);
    //td11
    var td11 = document.createElement('td')
    td11.id = "description_produit2";
    td11.className = "text-center";
    td11.colSpan = "2";
    tr1.appendChild(td11);
    //p111
    var p111 = document.createElement('p')
    td11.innerHTML = item.name;
    td11.appendChild(p111);
    //tr2
    var tr2 = document.createElement('tr')
    table1.appendChild(tr2);
    //td21
    var td21 = document.createElement('td')
    td21.rowSpan = "2";
    tr2.appendChild(td21);
    //div211
    var div211 = document.createElement('div')
    div211.className = "example";
    div211.id = "description_produit";
    td21.appendChild(div211);
    //div2111
    var div2111 = document.createElement('div')
    div2111.className = "overlay";
    div2111.innerHTML = "🔎";
    div211.appendChild(div2111);
    //img2112
    var img2112 = document.createElement('img')
    img2112.src = item.url;
    img2112.className = "cats";
    div211.appendChild(img2112);
    //td22
    var td22 = document.createElement('td')
    td22.className = "text-center";
    tr2.appendChild(td22);
    //p221
    var p221 = document.createElement('p')
    p221.innerHTML = item.descriptive;
    td22.appendChild(p221);
    //tr3
    var tr3 = document.createElement('tr')
    table1.appendChild(tr3);
    //td31
    var td31 = document.createElement('td')
    td31.className = "text-center";
    tr3.appendChild(td31);
    //span311
    var span311 = document.createElement('span')
    span311.id = "id_prix_produit";
    span311.innerHTML = champs_prix;
    td31.appendChild(span311);
    //tr4
    var tr4 = document.createElement('tr')
    table1.appendChild(tr4);
    //td41
    var td41 = document.createElement('td')
    td41.colspan = "2";
    tr4.appendChild(td41);
    //div411
    var div411 = document.createElement('div')
    div411.id = "modul_quantity";
    td41.appendChild(div411);
    //input4111
    var input4111 = document.createElement('input')
    input4111.className = "bmoins add-to-cart";
    input4111.type = "button";
    input4111.value = "-";
    input4111.id = "moins"+indexProduit;
    input4111.dataset.name = item.name;
    input4111.dataset.price = item.prix;
    input4111.dataset.url = item.url;
    input4111.addEventListener("click", function (e) {
        minus(indexProduit);
    }, false);
    div411.appendChild(input4111);
    //input4112
    var input4112 = document.createElement('input')
    input4112.className = "affich_valeur";
    input4112.value = "valeur";
    input4112.id = "count"+indexProduit;
    input4112.disabled = true;
    div411.appendChild(input4112);
    //input4113
    var input4113 = document.createElement('input')
    input4113.className = "bplus add-to-cart";
    input4113.type = "button";
    input4113.value = "+";
    input4113.id = "plus"+indexProduit;
    input4113.dataset.name = item.name;
    input4113.dataset.price = item.prix;
    input4113.dataset.url = item.url;
    input4113.addEventListener("click", function (e) {
        plus(indexProduit);
    }, false);
    div411.appendChild(input4113);

    if (item.prix == 0 || item.prix == "") {
        document.getElementById("plus" + indexProduit).style.visibility = 'hidden';
    }

    $(document).ready(function () {
        $('.example').izoomify();
    });
}
