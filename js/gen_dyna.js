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



//V2 Fonction de génération des 5 images/textes des catégories à partir de la page Index.html
window.chargement = function chargement() {
    //On récupère le paramètre de l'URL pour définir des variables
    var number = new URLSearchParams(window.location.search).get('categorie');
    var categorie_page = document.getElementById("descriptif_cat");
    
    if (tab_test != null) {
        tab_test.length=0;
    }
    var tab_test = new Array();

    //Boucle de création des produits
    for (let cat_index = 0; cat_index < tab_categorie[number].length; cat_index++) {
        var id = (number*1000).toString()+cat_index.toString();

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

        //Création de la page des produits
        if (tab_categorie[number].length == 0) {
            document.getElementById("descriptif_cat").innerHTML+="Il n'y a pas de produits pour cette catégorie";
        }
        else {
            var div1 = document.createElement('div')
            div1.className = "un_produit";
            categorie_page.appendChild(div1);

                var a11 = document.createElement('a')
                a11.className = "card card_categs";
                a11.href='#main';
                div1.appendChild(a11);

                    var img111 = document.createElement('img')
                    img111.className = "card-img-top produit";
                    img111.src = tab_categorie[number][cat_index].url;
                    img111.alt = "...";
                    img111.addEventListener("click", function(e) {
                        fiche_detaillee(number, cat_index);
                    }, false);
                    a11.appendChild(img111);

                var div12 = document.createElement('div')
                div12.className = "card-body text-center";
                div1.appendChild(div12);

                    var h5121 = document.createElement('h5')
                    h5121.className = "fw-bolder legend_produit";
                    h5121.innerHTML = tab_categorie[number][cat_index].libelle;
                    div12.appendChild(h5121);

                    var div122 = document.createElement('div')
                    div122.id = "info-prix";
                    if (tab_categorie[number][cat_index].prix == 0 || tab_categorie[number][cat_index].prix == "") {
                        div122.innerHTML = "Prix : &Agrave; voir en magasin";
                    }
                    else {
                        div122.innerHTML = tab_categorie[number][cat_index].prix + " €";
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
                    input131.style.visibility="visible";
                }
                else {
                    input131.style.visibility="hidden";                
                }
                    input131.id = "moins"+cat_index;
                    input131.dataset.id = id;
                    input131.dataset.name = tab_categorie[number][cat_index].libelle;
                    input131.dataset.price = tab_categorie[number][cat_index].prix;
                    input131.dataset.url = tab_categorie[number][cat_index].url;
                    input131.addEventListener("click", function(e) {
                        minus(cat_index);
                    }, false);
                    div13.appendChild(input131);

                    var input132 = document.createElement('input')
                    input132.setAttribute("type", "button");
                    input132.className = "affich_valeur";
                    input132.value = valeur;
                    input132.id = "count"+cat_index;
                    input132.disabled = true;
                if (valeur > 0) {
                    input132.style.visibility="visible";
                }
                else {
                    input132.style.visibility="hidden";                
                }
                    div13.appendChild(input132);

                    var input133 = document.createElement('input')
                    input133.setAttribute("type", "button");
                    input133.className = "bplus add-to-cart";
                    input133.value = "+";
                    input133.id = "plus"+cat_index;
                    input133.dataset.id = id;
                    input133.dataset.name = tab_categorie[number][cat_index].libelle;
                    input133.dataset.price = tab_categorie[number][cat_index].prix;
                    input133.dataset.url = tab_categorie[number][cat_index].url;
                    input133.addEventListener("click", function(e) {
                        plus(cat_index);
                    }, false);
                    div13.appendChild(input133);

            document.getElementById("ajout_titre_categorie").innerHTML=tabtitre[number];
        }

        if (tab_categorie[number][cat_index].prix == 0 || tab_categorie[number][cat_index].prix == "") {
            document.getElementById("plus"+cat_index).style.visibility = 'hidden';
        }


    }
}



//Fonction de génération des 5 images/textes des catégories de la page Catégorie
window.changeCategorie = function changeCategorie(number) {
    var categorie_page = document.getElementById("descriptif_cat");
    document.getElementById("descriptif_cat").innerHTML="";

    if (tab_test != null) {
        tab_test.length=0;
    }
    var tab_test = new Array();

    for ( let cat_index = 0; cat_index < tab_categorie[number].length; cat_index++) {
        var id = (number*1000).toString()+cat_index.toString();


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


        //Création de la page des produits
        if (tab_categorie[number].length == 0) {
            document.getElementById("descriptif_cat").innerHTML+="";
        }
        else {
            var div1 = document.createElement('div')
            div1.className = "un_produit";
            categorie_page.appendChild(div1);

                var a11 = document.createElement('a')
                a11.className = "card card_categs";
                a11.href='#main';
                div1.appendChild(a11);

                    var img111 = document.createElement('img')
                    img111.className = "card-img-top produit";
                    img111.src = tab_categorie[number][cat_index].url;
                    img111.alt = "...";
                    img111.addEventListener("click", function(e) {
                        fiche_detaillee(number, cat_index);
                    }, false);
                    a11.appendChild(img111);

                var div12 = document.createElement('div')
                div12.className = "card-body text-center";
                div1.appendChild(div12);

                    var h5121 = document.createElement('h5')
                    h5121.className = "fw-bolder legend_produit";
                    h5121.innerHTML = tab_categorie[number][cat_index].libelle;
                    div12.appendChild(h5121);

                    var div122 = document.createElement('div')
                    div122.id = "info-prix";
                    if (tab_categorie[number][cat_index].prix == 0 || tab_categorie[number][cat_index].prix == "") {
                        div122.innerHTML = "Prix : &Agrave; voir en magasin";
                    }
                    else {
                        div122.innerHTML = tab_categorie[number][cat_index].prix + " €";
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
                    input131.style.visibility="visible";
                }
                else {
                    input131.style.visibility="hidden";                
                }
                    input131.id = "moins"+cat_index;
                    input131.dataset.id = id;
                    input131.dataset.name = tab_categorie[number][cat_index].libelle;
                    input131.dataset.price = tab_categorie[number][cat_index].prix;
                    input131.dataset.url = tab_categorie[number][cat_index].url;
                    input131.addEventListener("click", function(e) {
                        minus(cat_index);
                    }, false);
                    div13.appendChild(input131);

                    var input132 = document.createElement('input')
                    input132.setAttribute("type", "button");
                    input132.className = "affich_valeur";
                    input132.value = valeur;
                    input132.id = "count"+cat_index;
                    input132.disabled = true;
                if (valeur > 0) {
                    input132.style.visibility="visible";
                }
                else {
                    input132.style.visibility="hidden";                
                }
                    div13.appendChild(input132);

                    var input133 = document.createElement('input')
                    input133.setAttribute("type", "button");
                    input133.className = "bplus add-to-cart";
                    input133.value = "+";
                    input133.id = "plus"+cat_index;
                    input133.dataset.id = id;
                    input133.dataset.name = tab_categorie[number][cat_index].libelle;
                    input133.dataset.price = tab_categorie[number][cat_index].prix;
                    input133.dataset.url = tab_categorie[number][cat_index].url;
                    input133.addEventListener("click", function(e) {
                        plus(cat_index);
                    }, false);
                    div13.appendChild(input133);

            document.getElementById("ajout_titre_categorie").innerHTML=tabtitre[number];
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
    var id = (number*1000).toString()+cat_index.toString();

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

