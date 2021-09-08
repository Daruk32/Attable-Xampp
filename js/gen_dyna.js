//V2 >08/09/2021 Refonte du code
//Déclaration du tableau des catégories
import {tab_categorie} from '../js/data.js'
//Déclaration du tableau des titres des catégories
import {tabtitre} from '../js/data.js'
//Appel de la fonction defrag_cookie
import {defrag_cookie} from '../js/panier.js'



//V2 Nouvelle Fonction de génération des catégories à la page d'accueil - index.html
window.liste_categorie = function liste_categorie() {
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
    for ( let categ = 0; categ < tab_categorie.length; categ++) {
        if (tab_categorie[categ].length == 0) {
            document.getElementById("tableau_image_categorie").innerHTML+="Il n'y a plus de produits.";
        }
        else {
            //Div categ contenant divimg et divtext
            var divcateg = document.createElement('div');
            divcateg.className = "card_cat";
            divfille.appendChild(divcateg);
            //divimg contenant l'image de la catégorie
            var divimg = document.createElement('div');
            divimg.className = "card text-center";
            divimg.id = "index-box";
            divimg.addEventListener("click", function(e) {
                window.location.href="categorie.html?categorie=" + categ;
            }, false);
            divcateg.appendChild(divimg);
            //Image de la catégorie
            var image_categorie = document.createElement('img')
            image_categorie.className = "card-img-top img-fluid cats";
            image_categorie.src = tab_categorie[categ][0].url;
            image_categorie.alt = '...';
            divimg.appendChild(image_categorie);
            //divtext contenant le texte de la catégorie
            var divtext = document.createElement('div');
            divtext.className = "card-body p-4 text-center";
            divcateg.appendChild(divtext);
            //Texte de la catégorie
            var text_categorie = document.createElement('h5')
            text_categorie.className = "fw-bolder";
            text_categorie.innerHTML = tabtitre[categ];
            divtext.appendChild(text_categorie);
        }
    }
}


//V2 Fonction de génération du bandeau des pages - categorie.html + panier.html
window.bandeau = function bandeau() {
    var nombre_cat = tabtitre.length;
    console.log(window.location.pathname);
    var bande = document.getElementById("bande");
    for ( let categ = 0; categ < nombre_cat; categ++) {
        if (tab_categorie[categ].length == 0) {
            document.getElementById("bande").innerHTML+="";
        }
        else {
            if (window.location.pathname == "/Attable-Xampp/panier.html" || window.location.pathname == "/attable/panier.html" || window.location.pathname == "/panier.html") {
                var divbandeau = document.createElement('li')
                divbandeau.className = "nav-item text-center";
                bande.appendChild(divbandeau);
            
                var acat = document.createElement('a')
                acat.className = "nav-link";
                acat.addEventListener("click", function(e) {
                    window.location.href="categorie.html?categorie=" + categ;
                }, false);
                acat.innerHTML = tabtitre[categ];
                divbandeau.appendChild(acat);
            }
            else {
                var divbandeau = document.createElement('li')
                divbandeau.className = "nav-item text-center";
                bande.appendChild(divbandeau);
            
                var acat = document.createElement('a')
                acat.className = "nav-link";
                acat.addEventListener("click", function(e) {
                    changeCategorie(categ);
                }, false);
                acat.innerHTML = tabtitre[categ];
                divbandeau.appendChild(acat);
            }
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

        var pre = "<div class='un_produit'><a class='card card_categs' href=\"#main\"><img class='card-img-top produit' src='";
        var mid1 = tab_categorie[number][cat_index].url;
        var mid2 ="' alt='...' onclick='fiche_detaillee(";
        var mid3 = number;
        var mid4 = ", ";
        var mid5 = cat_index;
        var mid6 = ")'></a><div class='card-body'><div class='text-center'><h5 class='fw-bolder legend_produit'>";
        var mid7 = tab_categorie[number][cat_index].libelle;
        var mid8 = "</h5><div id='info-prix'>";
        var mid9 = champs_prix;
        if (valeur > 0) {
            var mid10 = "</div></div></div><div id='modul_quantity' class='card-footer'><input style='visibility: visible;' class='bmoins add-to-cart' type='button' value='-' id='moins";
        }
        else {
            var mid10 = "</div></div></div><div id='modul_quantity' class='card-footer'><input style='visibility: hidden;' class='bmoins add-to-cart' type='button' value='-' id='moins";
        }
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
        if (valeur > 0 ) {
            var mid20 = ")'><input style='visibility: visible;' class='affich_valeur' value='";
        }
        else {
            var mid20 = ")'><input style='visibility: hidden;' class='affich_valeur' value='";
        }
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
        var fin = ")'></div></div></div>";

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
            var pre = "<div class='un_produit'><a class='card card_categs' href=\"#main\"><img class='card-img-top produit' src='";
            var mid1 = tab_categorie[number][cat_index].url;
            var mid2 ="' alt='...' onclick='fiche_detaillee(";
            var mid3 = number;
            var mid4 = ", ";
            var mid5 = cat_index;
            var mid6 = ")'></a><div class='card-body'><div class='text-center'><h5 class='fw-bolder legend_produit'>";
            var mid7 = tab_categorie[number][cat_index].libelle;
            var mid8 = "</h5><div id='info-prix'>";
            var mid9 = champs_prix;
            if (valeur > 0) {
                var mid10 = "</div></div></div><div id='modul_quantity' class='card-footer'><input style='visibility: visible;' class='bmoins add-to-cart' type='button' value='-' id='moins";
            }
            else {
                var mid10 = "</div></div></div><div id='modul_quantity' class='card-footer'><input style='visibility: hidden;' class='bmoins add-to-cart' type='button' value='-' id='moins";
            }
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
            if (valeur > 0 ) {
                var mid20 = ")'><input style='visibility: visible;' class='affich_valeur' value='";
            }
            else {
                var mid20 = ")'><input style='visibility: hidden;' class='affich_valeur' value='";
            }
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
            var fin = ")'></div></div></div>";

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
    var valeur;
    var pre_id = number*1000;
    var id = (pre_id).toString()+cat_index.toString();

	document.getElementById('fiche_produit').style.display = 'block';

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
    var fd12 = pre_id.toString()+cat_index.toString();
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
    var fd28 = pre_id.toString()+cat_index.toString();
    var fd29 = "' data-name='";
    var fd30 = tab_categorie[number][cat_index].libelle;
    var fd31 = "' data-price='";
    var fd32 = tab_categorie[number][cat_index].prix;
    var fd33 = "' data-url='";
    var fd34 = tab_categorie[number][cat_index].url;
    var fd35 = "' onclick='plus(";
    var fd36 = cat_index;
    var fd37 = ")'></div></td><tr></table>";
    document.getElementById("fiche_produit").innerHTML=fd1+fd2+fd3+fd4+fd5+fd6+fd7+fd8+fd9+fd10+fd11+fd12+fd13+fd14+fd15+fd16+fd17+fd18+fd19+fd20+fd21+fd22+fd23+fd24+fd25+fd26+fd27+fd28+fd29+fd30+fd31+fd32+fd33+fd34+fd35+fd36+fd37;

    if (tab_categorie[number][cat_index].prix == 0 || tab_categorie[number][cat_index].prix == "") {
        document.getElementById("plus"+cat_index).style.visibility = 'hidden';
    }

    $(document).ready(function () {
        $('.example').izoomify();
    });
}



//Fonction de génération du panier à la page panier.html à partir du cookie
window.crea_panier = function crea_panier() {
    if (readCookie("list_achat") == null) {
        document.getElementById("cart_tablebody").innerHTML="";
    }
    else {
        var liste_panier = defrag_cookie("list_achat");
        for (let i=0 ; i < liste_panier.length ; i++) {
            if (liste_panier[i][4] > 0) {
                var ch1 = '<tr class="line_panier"><td><img src="';
                var ch2 = liste_panier[i][3];
                var ch3 = '" alt="img_product id="echantillon" class="img-fluid"></td><td>';
                var ch4 = liste_panier[i][1];
                var ch5 = '</td><td>';
                var ch6 = liste_panier[i][2];
                var ch7 = ' €</td><td>';
                var ch8 = liste_panier[i][4];
                var ch9 = '</td><td><img src="images/corbeille.jpg" alt="Delete" id="trashcan" onclick="supp(';
                var ch10 = i;
                var ch11 = ')"></td></tr>';
                document.getElementById("cart_tablebody").innerHTML+=ch1+ch2+ch3+ch4+ch5+ch6+ch7+ch8+ch9+ch10+ch11;
            }
        }
    }
}

//Création du Mail pour la commande
window.valid_command = function valid_command() {
    var d = new Date();
    var date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    var fullDate = date+' '+hours;

    if (readCookie("list_achat") != null) {
        var liste_panier = defrag_cookie("list_achat");

        var m1 = "<a href='mailto:attable@gmail.com?subject=Votre commande - N° Commande&body=Identifiant client :%0ADate : "+fullDate+"%0A%0ABonjour,%0A%0AVoici le récapitulatif de votre commande :%0A%0A";
        var m2 = "|-------------------------------------------------------------------------------------|%0A";
        var m3 = "|            Désignation            |         Quantité         |         Prix (€)         |%0A";
        var m4 = "|-------------------------------------------------------------------------------------|%0A";
        var m5 = "";
        for (let i=0 ; i < liste_panier.length ; i++) {
            if (liste_panier[i][4] > 0) {
                m5 = m5 + liste_panier[i][1] +" | "+ liste_panier[i][4] +" | "+ liste_panier[i][2] +"€%0A";  
            }                 
        }
        var m6 = "|-------------------------------------------------------------------------------------|%0A";
        var m7 = "%0A%0AVotre total : " + readCookie("Somme") +"€%0A";
        var m8 = "%0A%0A Merci pour votre commande !%0A%0ACordialement,%0A%0AAssociation Attable, le Collectif du goût'>Passer la commande</a>";
        document.getElementById("valid-command").innerHTML=m1+m2+m3+m4+m5+m6+m7+m8;
    
    }
    else {
        document.getElementById("valid-command").innerHTML="<a onclick='alert(\"Votre panier est vide !\")'>Passer la commande</a>";
    }    


}


//Génération du logo avec Localstorage pour la page Index
window.genlogo = function genlogo() {
    var test = "<img src='images/attable_logo2.png' class='img-fluid' alt='monlogo' id='lelogo'>";
    let objLinea = JSON.stringify(test);
    localStorage.setItem("logoimg", objLinea);
    var urllogo = localStorage.getItem("logoimg");
    let objJson = JSON.parse(urllogo);
    document.getElementById("logo").innerHTML=objJson;
}


//Génération des styles avec Localstorage pour la page CGU
window.gencss = function gencss() {
    var css = "<link rel='stylesheet' href='css/attable.css'>";
    let stylecss = JSON.stringify(css);
    localStorage.setItem("stylecss", stylecss);
    var cssstyle = localStorage.getItem("stylecss");
    let objJson = JSON.parse(cssstyle);
    document.getElementById("headtest").innerHTML+=objJson;
}


/*
//Fonction de génération du slideshow
window.gen_carous = function gen_carous() {
    var longueur = tab_categorie[0].length;

    for ( let cat_index = 1; cat_index < longueur; cat_index++) {

        if (longueur == 0) {
            document.getElementById("gen-slides").innerHTML+="";
        }
        else {

            var pre = "<div class='carousel-item'><img class='d-block w-100 produit img-fluid' src='";
            var mid1 = tab_categorie[0][cat_index].url;
            var mid2 ="' alt='...'><div class='carousel-caption'><h4 class='text-center'>";
            var mid3 = tab_categorie[0][cat_index].libelle;
            var mid4 = "</h4></div></div>";			

            document.getElementById("gen-slides").innerHTML+=pre+mid1+mid2+mid3+mid4;

        }

    }
}

*/