//Déclaration du tableau des catégories
export var tab_categorie = new Array();
//Déclaration du tableau des titres des catégories
var tabtitre = new Array();

import {defrag_cookie} from '../js/panier.js'


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




//Fonction de génération des catégories à la page d'accueil - index.html
window.liste_categorie = function liste_categorie() {

    var quantite_cat = tab_categorie.length;
    
        for ( let categ = 0; categ < quantite_cat; categ++) {

            if (tab_categorie[categ].length == 0) {
                document.getElementById("tableau_image_categorie").innerHTML+="";
            }
            else {
                var pre = "<div class='categs'><a onClick=\"window.location.href='categorie.html?categorie=";
                var mid1 = categ;
                var mid2 = "'\"><img src='";
                var mid3 = tab_categorie[categ][0].url;
                var mid4 = "' alt='presentation' class='cats'></a><div class='nomcats'>";
                var mid5 = tabtitre[categ];
                var fin = "</div></div>";

                document.getElementById("tableau_image_categorie").innerHTML+=pre+mid1+mid2+mid3+mid4+mid5+fin;
            }
        }
}



//Fonction de génération du bandeau des pages - categorie.html + panier.html
window.bandeau = function bandeau() {

    var nombre_cat = tabtitre.length;

    for ( let categ = 0; categ < nombre_cat; categ++) {

        if (tab_categorie[categ].length == 0) {
            document.getElementById("bande").innerHTML+="";
        }
        else {
            var pre = "<li><a onclick='changeCategorie(";
            var mid1 = categ;
            var mid2 = ")'>";
            var mid3 = tabtitre[categ];
            var mid4 = "</a></li>";

            document.getElementById("bande").innerHTML+=pre+mid1+mid2+mid3+mid4;
        }
    }
}



//Fonction de génération des 5 images/textes des catégories à partir de la page Index.html
window.chargement = function chargement() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var number = urlParams.get('categorie');

    var longueur = tab_categorie[number].length;

    var titre = tabtitre[number];

    for ( let cat_index = 0; cat_index < longueur; cat_index++) {
        var pre_id = number*1000;
        var id = (pre_id).toString()+cat_index.toString();
        

        //Met à jour et affiche la quantité de chaque produit
        if (readCookie("list_achat") != null){
            var controle = defrag_cookie("list_achat");
            for (let i = 0 ; i < controle.length ; i++) {
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

        //Affiche ou non le prix et les fonctionnalités d'ajout/retrait
        if (tab_categorie[number][cat_index].prix == 0 || tab_categorie[number][cat_index].prix == "") {
            var champs_prix = "Prix : &Agrave; voir en magasin";
        }
        else {
            var champs_prix = tab_categorie[number][cat_index].prix + " €";
        }


        if (longueur == 0) {
            document.getElementById("descriptif_cat").innerHTML+="";
        }
        else {
            var pre = "<div class='un_produit'><a id=togg1' href=\"#ancre1\"><img src='";
            var mid1 = tab_categorie[number][cat_index].url;
            var mid2 ="' class='produit' onclick='fiche_detaillee(";
            var mid3 = number;
            var mid4 = ", ";
            var mid5 = cat_index;
            var mid6 = ")'></a><div class='legend_produit'>";
            var mid7 = tab_categorie[number][cat_index].libelle;
            var mid8 = "</div><div id='descriptif_prix'>";
            var mid9 = champs_prix;
            var mid10 = "</div><div id='modul_quantity'><input class='bmoins add-to-cart' type='button' value='-' id='moins";
            var mid11 = cat_index;
            var mid12 = "' data-id='";
            var mid13 = pre_id.toString()+cat_index.toString();
            var mid14 = "' data-name='";
            var mid15 = tab_categorie[number][cat_index].libelle;
            var mid16 = "' data-price='";
            var mid17 = tab_categorie[number][cat_index].prix;
            var mid171 = "' data-url='";
            var mid172 = tab_categorie[number][cat_index].url;
            var mid18 = "' onclick='minus(";
            var mid19 = cat_index;
            var mid20 = ")'><input class='affich_valeur' value='";
            var mid201 = valeur;
            var mid202 = "' id='count";
            var mid21 = cat_index;
            var mid22 = "' disabled><input type='button' class='bplus add-to-cart' value='+' id='plus";
            var mid23 = cat_index;
            var mid24 = "' data-id='";
            var mid25 = pre_id.toString()+cat_index.toString();
            var mid26 = "' data-name='";
            var mid27 = tab_categorie[number][cat_index].libelle;
            var mid28 = "' data-price='";
            var mid29 = tab_categorie[number][cat_index].prix;
            var mid291 = "' data-url='";
            var mid292 = tab_categorie[number][cat_index].url;
            var mid30 = "' onclick='plus(";
            var mid31 = cat_index;
            var fin = ")'></div></div>";

            document.getElementById("descriptif_cat").innerHTML+=pre+mid1+mid2+mid3+mid4+mid5+mid6+mid7+mid8+mid9+mid10+mid11+mid12+mid13+mid14+mid15+mid16+mid17+mid171+mid172+mid18+mid19+mid20+mid201+mid202+mid21+mid22+mid23+mid24+mid25+mid26+mid27+mid28+mid29+mid291+mid292+mid30+mid31+fin;
            document.getElementById("ajout_titre_categorie").innerHTML=titre;
        }

        if (tab_categorie[number][cat_index].prix == 0 || tab_categorie[number][cat_index].prix == "") {
            document.getElementById("plus"+cat_index).style.visibility = 'hidden';
        }
    }
}



//Fonction de génération des 5 images/textes des catégories de la page Catégorie
window.changeCategorie = function changeCategorie(number) {
    var longueur = tab_categorie[number].length;
    var valeur;
    var titre = tabtitre[number];

    document.getElementById("descriptif_cat").innerHTML="";

    for ( let cat_index = 0; cat_index < longueur; cat_index++) {
        var pre_id = number*1000;
        var id = (pre_id).toString()+cat_index.toString();



        //Met à jour et affiche la quantité de chaque produit
        if (readCookie("list_achat") != null){
            var controle = defrag_cookie("list_achat");
            for (let i = 0 ; i < controle.length ; i++) {
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


        //Affiche ou non le prix et les fonctionnalités d'ajout/retrait  
        if (tab_categorie[number][cat_index].prix == 0 || tab_categorie[number][cat_index].prix == "") {
            var champs_prix = "Prix : &Agrave; voir en magasin";
        }
        else {
            var champs_prix = tab_categorie[number][cat_index].prix + " €";
        }


        if (longueur == 0) {
            document.getElementById("descriptif_cat").innerHTML+="";
        }
        else {
            var pre = "<div class='un_produit'><a id=togg1' href=\"#ancre1\"><img src='";
            var mid1 = tab_categorie[number][cat_index].url;
            var mid2 ="' class='produit' onclick='fiche_detaillee(";
            var mid3 = number;
            var mid4 = ", ";
            var mid5 = cat_index;
            var mid6 = ")'></a><div class='legend_produit'>";
            var mid7 = tab_categorie[number][cat_index].libelle;
            var mid8 = "</div><div id='descriptif_prix'>";
            var mid9 = champs_prix;
            var mid10 = "</div><div id='modul_quantity'><input class='bmoins add-to-cart' type='button' value='-' id='moins";
            var mid11 = cat_index;
            var mid12 = "' data-id='";
            var mid13 = pre_id.toString()+cat_index.toString();
            var mid14 = "' data-name='";
            var mid15 = tab_categorie[number][cat_index].libelle;
            var mid16 = "' data-price='";
            var mid17 = tab_categorie[number][cat_index].prix;
            var mid171 = "' data-url='";
            var mid172 = tab_categorie[number][cat_index].url;
            var mid18 = "' onclick='minus(";
            var mid19 = cat_index;
            var mid20 = ")'><input class='affich_valeur' value='";
            var mid201 = valeur;
            var mid202 = "' id='count";
            var mid21 = cat_index;
            var mid22 = "' disabled><input type='button' class='bplus add-to-cart' value='+' id='plus";
            var mid23 = cat_index;
            var mid24 = "' data-id='";
            var mid25 = pre_id.toString()+cat_index.toString();
            var mid26 = "' data-name='";
            var mid27 = tab_categorie[number][cat_index].libelle;
            var mid28 = "' data-price='";
            var mid29 = tab_categorie[number][cat_index].prix;
            var mid291 = "' data-url='";
            var mid292 = tab_categorie[number][cat_index].url;
            var mid30 = "' onclick='plus(";
            var mid31 = cat_index;
            var fin = ")'></div></div>";

            document.getElementById("descriptif_cat").innerHTML+=pre+mid1+mid2+mid3+mid4+mid5+mid6+mid7+mid8+mid9+mid10+mid11+mid12+mid13+mid14+mid15+mid16+mid17+mid171+mid172+mid18+mid19+mid20+mid201+mid202+mid21+mid22+mid23+mid24+mid25+mid26+mid27+mid28+mid29+mid291+mid292+mid30+mid31+fin;
            document.getElementById("ajout_titre_categorie").innerHTML=titre;
        }

        if (tab_categorie[number][cat_index].prix == 0 || tab_categorie[number][cat_index].prix == "") {
            document.getElementById("plus"+cat_index).style.visibility = 'hidden';
        }
    }

	document.getElementById('fiche_produit').style.display = 'none';
}




//Fonction de génération de la fiche détaillée du produit
window.fiche_detaillee = function fiche_detaillee(number, cat_index) {
	
	document.getElementById('fiche_produit').style.display = 'block';

    if (tab_categorie[number][cat_index].prix == 0) {
        var champs_prix = "Prix : &Agrave; voir en magasin";
    }
    else {
        var champs_prix = tab_categorie[number][cat_index].prix + " €";
    }

    var fd1 = "<div id='description_produit'><img src='";
    var fd2 = tab_categorie[number][cat_index].url;
    var fd3 = "' alt='Conserves' class='cats'></div><div id='description_produit2'><p>";
    var fd4 = tab_categorie[number][cat_index].libelle;
    var fd5 = "<p>";
    var fd51 = tab_categorie[number][cat_index].texte;
    var fd52 = "</p><div id='produit_action'><span id='id_prix_produit'>Prix : "
    var fd6 = champs_prix;
    var fd7 = "</span><span id='id_quantite_produit'>Quantité : </span><input type='number' id='quantite_article' name='nombrearticle' min='0' max='100'><button id='id_bouton_ajout_produit'>Ajouter au panier</button></div></div>";
    document.getElementById("fiche_produit").innerHTML=fd1+fd2+fd3+fd4+fd5+fd51+fd52+fd6+fd7;
}



//Fonction de génération du panier à la page panier.html à partir du cookie
window.crea_panier = function crea_panier() {
    if (readCookie("list_achat").length == "") {
        document.getElementById("cart_tablebody").innerHTML="";
    }
    else {
        var liste_panier = defrag_cookie("list_achat");
        console.log(liste_panier);
        for (let i=0 ; i < liste_panier.length ; i++) {
            var ch1 = '<tr class="line_panier"><td><img src="';
            var ch2 = liste_panier[i][3];
            var ch3 = '" alt="img_product"></td><td>';
            var ch4 = liste_panier[i][1];
            var ch5 = '</td><td>';
            var ch6 = liste_panier[i][2];
            var ch7 = '</td><td>';
            var ch8 = liste_panier[i][4];
            var ch9 = '</td><td>';
            var ch10 = 'poubelle';
            var ch11 = '</td></tr>';
            document.getElementById("cart_tablebody").innerHTML+=ch1+ch2+ch3+ch4+ch5+ch6+ch7+ch8+ch9+ch10+ch11;
        }
    }
}






