/*
Auteur : Johan GIROUX
2020-2021
Dernière MAJ : 30/10/2021
V2.9
*/


// Ecoute de l'événement Scroll
var stickyBandeau = document.getElementById("bandeau");
var stickyIcone = document.getElementById("panier");
var divBody = document.getElementById("idBody");
stickyIcone.style.top = "-2.3%";
divBody.onscroll = function (e) {
    // Modifie le bandeau dès la hauteur de scroll atteinte et ajuste le panier
    if (window.pageYOffset > 60) {
        stickyBandeau.classList.add("pr-5");
        stickyIcone.style.top = "-3%";
    }
    // Remet en place le panier en dehors de la zone du bandeau
    else {
        stickyBandeau.classList.remove("pr-5");
        stickyIcone.style.top = "-2.3%";
    }
};


// Génération dynamique depuis Firebase
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
        var promoSi = childSnapshot.val().promo;
        var ajout = { 'id': productID, 'name': productLibelle, 'prix': productPrice, 'categorie': productCategory, 'descriptive': productDescriptive, 'url': productURL, 'short_legend': productSLegend, 'promo': promoSi };
        productsArray.push(ajout);
    });
    //Sélectionne les produits complets du tableau productsArray et les insère dans le tableau productsSelectedArray sinon dans incompleteProducts
    function tri(element) {
        if (element.id == null || element.name == null || element.prix == null || element.categorie == null || element.descriptive == null || element.url == null || element.short_legend == null || element.id == "" || element.name == "" || element.prix == "" || element.categorie == "" || element.descriptive == "" || element.url == "" || element.short_legend == "") {
            incompleteProducts.push(element.id);
        }
        else {
            var productSelected = { 'id': element.id, 'name': element.name, 'prix': element.prix, 'categorie': element.categorie, 'descriptive': element.descriptive, 'url': element.url, 'short_legend': element.short_legend, 'promo': element.promo };
            productsSelectedArray.push(productSelected);
        }
    }
    productsArray.forEach(element => tri(element));
    //localStorage.setItem("productsArray", JSON.stringify(productsArray));


    //On récupère le paramètre de l'URL pour définir des variables
    var url1 = (new URL(document.location)).searchParams;
    var number = url1.get('categorie');

    document.getElementById("ajout_titre_categorie").innerHTML = number;

    var indexProduit = 0;
    var categorie_page = document.getElementById("descriptif_cat");



    //sélection des produits de la catégorie sélectionnée
    var productCategorieChosen = new Array;
    productsSelectedArray.forEach(function (item) {
        if (number == item.categorie) {
            productCategorieChosen.push(item);
        }
    })
    var productsOneCategorieSelected = productCategorieChosen;

    //Boucle de création des produits
    if (productsOneCategorieSelected.length == 0) {
        document.getElementById("descriptif_cat").innerHTML += "Il n'y a pas de produits pour cette catégorie";
    }
    else {
        var iTest = 0;
        var tabValueAchat = new Array;
        //Met à jour et affiche la quantité de chaque produit
        productsOneCategorieSelected.forEach(function (item) {
            let valeur;
            if (localStorage.getItem("list_achat") != null) {

                var controle = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("list_achat"))));
                //var controle = JSON.parse(localStorage.getItem("list_achat"));
                for (let iListe in controle) {
                    if (item.id == controle[iListe].id) {
                        valeur = controle[iListe].quantity;
                        break;
                    }
                    else {
                        valeur = "";
                    }
                }
                tabValueAchat.push(valeur);
            }
            else {
                tabValueAchat[productsOneCategorieSelected.length] = "";
            }
        });


        //Génère le rendu HTML de la page des produits
        productsOneCategorieSelected.forEach(function (item) {

            let valeur = tabValueAchat[iTest];
            iTest = iTest + 1;

            var div1 = document.createElement('div');
            div1.className = "item";
            categorie_page.appendChild(div1);

            var div11 = document.createElement('div');
            div11.className = "image-flip";
            div1.appendChild(div11);
            div11.ontouchstart = 'document.getElementsByClassName("image-flip")[iTest-1].classList.toggle("hover")';

            var div111 = document.createElement('div');
            div111.className = "mainflip";
            div11.appendChild(div111);

            var div111Front = document.createElement('div');
            div111Front.className = "card frontside";
            div111.appendChild(div111Front);

            var div111Front1 = document.createElement('div');
            div111Front1.className = "card-body text-center";
            div111Front1.id = "cardImage";
            div111Front.appendChild(div111Front1);

            var div111Front11li = document.createElement('div');
            div111Front11li.className = "is-loading";
            div111Front11li.id = "imgLoading";
            div111Front1.appendChild(div111Front11li);
            var div111Front11img = document.createElement('img');
            div111Front11img.className = "card-img-top img-fluid";
            div111Front11img.src = item.url;
            div111Front11img.alt = item.name;
            if (item.promo == true) {
                var div111Front11img2 = document.createElement('img');
                div111Front11img2.src = "images/promo.png";
                div111Front11img2.className = "position-absolute w-25 ml-5";
                div111Front1.appendChild(div111Front11img2);
            }
            div111Front11li.appendChild(div111Front11img);


            $('#imgLoading').imagesLoaded()
                .done(function (instance) {
                    div111Front11li.classList.remove("is-loading");
                });



            var div111Front11h4 = document.createElement('h4');
            div111Front11h4.className = "card-title";
            div111Front11h4.innerHTML = item.name;
            div111Front1.appendChild(div111Front11h4);

            var div111Front11p = document.createElement('p');
            div111Front11p.className = "card-text";
            if (item.prix == 0 || item.prix == "") {
                div111Front11p.innerHTML = item.short_legend + "<br>" + "Prix : &Agrave; voir en magasin";
            }
            else {
                div111Front11p.innerHTML = item.prix + " €";
            }
            div111Front1.appendChild(div111Front11p);

            var div111Back = document.createElement('div');
            div111Back.className = "backside";
            div111.appendChild(div111Back);

            var div111Back1 = document.createElement('div');
            div111Back1.className = "card ";
            div111Back.appendChild(div111Back1);

            var div111Back11 = document.createElement('div');
            div111Back11.className = "card-body text-center";
            div111Back1.appendChild(div111Back11);

            var div111Back11h4 = document.createElement('h4');
            div111Back11h4.className = "card-title";
            div111Back11h4.innerHTML = item.name;
            div111Back11.appendChild(div111Back11h4);

            var div111Back11p = document.createElement('p');
            div111Back11p.className = "card-text";
            div111Back11p.innerHTML = item.descriptive;
            div111Back11.appendChild(div111Back11p);

            var div111Back111 = document.createElement('div')
            div111Back111.id = "info-prix";
            if (item.prix == 0 || item.prix == "") {
                div111Back111.innerHTML = "Prix : &Agrave; voir en magasin";
            }
            else {
                div111Back111.innerHTML = item.prix + " €";
            }
            div111Back11.appendChild(div111Back111);


            var div111Back11a = document.createElement("a");
            div111Back11a.className = "btn btn-primary my-5";
            div111Back11a.innerHTML = "En voir plus ";
            div111Back11a.href = "#main";
            div111Back11a.addEventListener("click", function (e) {
                fiche_detaillee(item, item.id);
            }, false);
            div111Back11.appendChild(div111Back11a);
            var div111Back11ai = document.createElement("i");
            div111Back11ai.className = "fa fa-plus";
            div111Back11a.appendChild(div111Back11ai);


            var div13 = document.createElement('div')
            div13.id = "modul_quantity";
            div111Back11.appendChild(div13);
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
    document.getElementById("fiche_produit").innerHTML = "";
    document.getElementById("fiche_produit").style.visibility = "hidden";
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
        var iTest = 0;
        var tabValueAchat = new Array;

        //Met à jour et affiche la quantité de chaque produit
        productsOneCategorieSelected.forEach(function (item) {
            let valeur;
            if (localStorage.getItem("list_achat") != null) {
                var controle = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("list_achat"))));
                //var controle = JSON.parse(localStorage.getItem("list_achat"));                
                for (let iListe in controle) {
                    if (item.id == controle[iListe].id) {
                        valeur = controle[iListe].quantity;
                        break;
                    }
                    else {
                        valeur = "";
                    }
                }
                tabValueAchat.push(valeur);
            }
            else {
                tabValueAchat[productsOneCategorieSelected.length] = "";
            }
        });


        //Génère le rendu HTML de la page des produits
        productsOneCategorieSelected.forEach(function (item) {

            let valeur = tabValueAchat[iTest];
            iTest = iTest + 1;

            var div1 = document.createElement('div');
            div1.className = "item";
            categorie_page.appendChild(div1);

            var div11 = document.createElement('div');
            div11.className = "image-flip";
            div1.appendChild(div11);
            div11.ontouchstart = 'document.getElementsByClassName("image-flip")[iTest-1].classList.toggle("hover")';

            var div111 = document.createElement('div');
            div111.className = "mainflip";
            div11.appendChild(div111);

            var div111Front = document.createElement('div');
            div111Front.className = "card frontside";
            div111.appendChild(div111Front);

            var div111Front1 = document.createElement('div');
            div111Front1.className = "card-body text-center";
            div111Front1.id = "cardImage";
            div111Front.appendChild(div111Front1);

            var div111Front11li = document.createElement('div');
            div111Front11li.className = "is-loading";
            div111Front11li.id = "imgLoading";
            div111Front1.appendChild(div111Front11li);
            var div111Front11img = document.createElement('img');
            div111Front11img.className = "card-img-top img-fluid";
            div111Front11img.src = item.url;
            div111Front11img.alt = item.name;
            if (item.promo == true) {
                var div111Front11img2 = document.createElement('img');
                div111Front11img2.src = "images/promo.png";
                div111Front11img2.className = "position-absolute w-25 ml-5";
                div111Front1.appendChild(div111Front11img2);
            }
            div111Front11li.appendChild(div111Front11img);



            $('#imgLoading').imagesLoaded()
                .done(function (instance) {
                    div111Front11li.classList.remove("is-loading");
                });


            var div111Front11h4 = document.createElement('h4');
            div111Front11h4.className = "card-title";
            div111Front11h4.innerHTML = item.name;
            div111Front1.appendChild(div111Front11h4);

            var div111Front11p = document.createElement('p');
            div111Front11p.className = "card-text";
            if (item.prix == 0 || item.prix == "") {
                div111Front11p.innerHTML = item.short_legend + "<br>" + "Prix : &Agrave; voir en magasin";
            }
            else {
                div111Front11p.innerHTML = item.prix + " €";
            }
            div111Front1.appendChild(div111Front11p);


            var div111Back = document.createElement('div');
            div111Back.className = "backside";
            div111.appendChild(div111Back);

            var div111Back1 = document.createElement('div');
            div111Back1.className = "card ";
            div111Back.appendChild(div111Back1);

            var div111Back11 = document.createElement('div');
            div111Back11.className = "card-body text-center";
            div111Back1.appendChild(div111Back11);

            var div111Back11h4 = document.createElement('h4');
            div111Back11h4.className = "card-title";
            div111Back11h4.innerHTML = item.name;
            div111Back11.appendChild(div111Back11h4);

            var div111Back11p = document.createElement('p');
            div111Back11p.className = "card-text";
            div111Back11p.innerHTML = item.descriptive;
            div111Back11.appendChild(div111Back11p);

            var div111Back111 = document.createElement('div')
            div111Back111.id = "info-prix";
            if (item.prix == 0 || item.prix == "") {
                div111Back111.innerHTML = "Prix : &Agrave; voir en magasin";
            }
            else {
                div111Back111.innerHTML = item.prix + " €";
            }
            div111Back11.appendChild(div111Back111);


            var div111Back11a = document.createElement("a");
            div111Back11a.className = "btn btn-primary my-5";
            div111Back11a.innerHTML = "En voir plus ";
            div111Back11a.href = "#main";
            div111Back11a.addEventListener("click", function (e) {
                fiche_detaillee(item, item.id);
            }, false);
            div111Back11.appendChild(div111Back11a);
            var div111Back11ai = document.createElement("i");
            div111Back11ai.className = "fa fa-plus";
            div111Back11a.appendChild(div111Back11ai);


            var div13 = document.createElement('div')
            div13.id = "modul_quantity";
            div111Back11.appendChild(div13);
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
}


//V3-BackEnd - Fonction de génération du bandeau des pages - categorie.html + panier.html
//var categorieList = JSON.parse(localStorage.getItem("categoriesSelected"));
var categorieList = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("categoriesSelected"))));
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
    document.getElementById("fiche_produit").innerHTML = "";
    document.getElementById("fiche_produit").style.visibility = "visible";

    var ficheProduit = document.getElementById("fiche_produit");

    var valeur;

    document.getElementById('fiche_produit').style.display = 'block';

    //Met à jour et affiche la quantité de chaque produit
    if (localStorage.getItem("list_achat") != null) {
        var controle = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("list_achat"))));
        //var controle = JSON.parse(localStorage.getItem("list_achat"));    
        for (let i in controle) {
            if (item.id != controle[i].id) {
                valeur = "";
            }
            else {
                valeur = controle[i].quantity;
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
    table1.className = "table w-100 zoom"+ indexProduit;
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
    input4111.id = "moins" + indexProduit;
    input4111.addEventListener("click", function (e) {
        minus(item.id, indexProduit);
    }, false);
    div411.appendChild(input4111);
    //input4112
    var input4112 = document.createElement('input')
    input4112.className = "affich_valeur";
    var detailValue;
    if (document.getElementById("count" + item.id).value === 0) {
        detailValue = "0";
    }
    else {
        detailValue = document.getElementById("count" + item.id).value;
    }
    input4112.value = detailValue;
    input4112.id = "count2" + indexProduit;
    input4112.disabled = true;
    div411.appendChild(input4112);
    //input4113
    var input4113 = document.createElement('input')
    input4113.className = "bplus add-to-cart";
    input4113.type = "button";
    input4113.value = "+";
    input4113.id = "plus" + indexProduit;
    input4113.addEventListener("click", function (e) {
        plus(item.id, indexProduit);
    }, false);
    div411.appendChild(input4113);

    if (item.prix == 0 || item.prix == "") {
        document.getElementById("plus" + indexProduit).style.visibility = 'hidden';
    }

    $(document).ready(function () {
        $('.example').izoomify();
    });
}


var liste = {};
//Fonction Ajout quantité d'untel produit
window.plus = function plus(idProduit, indexProduit) {
    //Récupération des données du produit ciblé
    var srcProduit, nameProduit, prixProduit;
    firebase.database().ref("products/" + idProduit).on('value', function (snapshot) {
        srcProduit = snapshot.val().Link;
        nameProduit = snapshot.val().libelle;
        prixProduit = snapshot.val().prix;
    });
    //On lit le localStorage pour savoir le produit existe déjà ou non
    //C'est un nouveau produit avec initialisation de la liste et du localStorage :
    var count;
    if (localStorage.getItem("list_achat") == null) {
        count = 0;
        count++;
        document.getElementById("count" + idProduit).value = count;
        liste[idProduit] = { id: idProduit, url: srcProduit, name: nameProduit, price: prixProduit, quantity: count };

        localStorage.setItem("list_achat", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(liste))));
        if (document.getElementById("count2" + indexProduit) != null) {
            document.getElementById("count2" + indexProduit).value = count;
        }

    }
    //S'il existe déjà :
    else {

        liste = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("list_achat"))));
        for (let key in liste) {
            if (idProduit == liste[key].id) {
                count = liste[key].quantity;
                count++;
                liste[key].quantity = count;

                localStorage.setItem("list_achat", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(liste))));
                document.getElementById("count" + idProduit).value = count;
                if (document.getElementById("count2" + indexProduit) != null) {
                    document.getElementById("count2" + indexProduit).value = count;
                }
            }
            
            // Ajout d'un nouvel article à la liste initialement générée.
            else if (document.getElementById('count' + idProduit).value == "" || document.getElementById('count' + idProduit).value == "undefined") {
                count = 0;
                count++;
                liste[idProduit] = { id: idProduit, url: srcProduit, name: nameProduit, price: prixProduit, quantity: count };

                localStorage.setItem("list_achat", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(liste))));
                document.getElementById("count" + idProduit).value = count;
                if (document.getElementById("count2" + indexProduit) != null) {
                    document.getElementById("count2" + indexProduit).value = count;
                }
            }
        }
    }
    if (document.getElementById("count2" + idProduit) != null) {
        document.getElementById("count2" + idProduit).value = count;
    }
    else {
        count++;
    }

    document.getElementById("count" + idProduit).style.visibility = 'visible';
    document.getElementById("moins" + idProduit).style.visibility = 'visible';
    //Ici, pour mettre à jour le nombre d'éléments dans le widget panier.
    paniercateg();
}



//Fonction Retire quantité d'untel produit
window.minus = function minus(idProduit, indexProduit) {
    liste = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("list_achat"))))
    for (let key in liste) {
        //Diminue la quantité du produit tant qu'elle est >0.
        if (idProduit == liste[key].id) {
            var compteMoins = document.getElementById('count' + idProduit).value;
            if (compteMoins > 1) {
                compteMoins--;
                liste[key].quantity = compteMoins;
                localStorage.setItem("list_achat", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(liste))));
            }
            else if (compteMoins == 1) {
                document.getElementById("moins" + idProduit).style.visibility = 'hidden';
                document.getElementById("count" + idProduit).style.visibility = 'hidden';
                compteMoins = 0;
                liste[key].quantity = compteMoins;
                localStorage.setItem("list_achat", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(liste))));
            }
        }
        else {
            var compteMoins = document.getElementById('count' + idProduit).value;
        }

        document.getElementById("count" + idProduit).value = compteMoins;

        if (document.getElementById("count2" + idProduit) != null) {
            document.getElementById("count2" + idProduit).value = compteMoins;
        }
    }
    //Ici, pour mettre à jour le nombre d'éléments dans le widget panier.
    paniercateg();
}


//MAJ du widget panier
window.paniercateg = function paniercateg() {
    var total = 0;
    var nb_article = 0;
    if (localStorage.getItem("list_achat") != null) {
        //var commande = JSON.parse(localStorage.getItem("list_achat"));
        var commande = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("list_achat"))));
        if (commande == "") {
            total = 0;
            nb_article = 0;
            localStorage.removeItem("list_achat");
        }
        else {
            for (let i in commande) {
                total = total + commande[i].price * commande[i].quantity;
                nb_article = nb_article + commande[i].quantity;
            }
            total = (Math.round(total * 100)) / 100;
        }
    }
    document.getElementById("total_commande").innerHTML = total + " €";
    document.getElementById("total_articles").innerHTML = nb_article;
}
