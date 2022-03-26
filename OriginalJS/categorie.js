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
        stickyIcone.style.top = "-2%";
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
            div111Front.appendChild(div111Front1);

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
            div111Front1.appendChild(div111Front11img);

            var div111Front11h4 = document.createElement('h4');
            div111Front11h4.className = "card-title";
            div111Front11h4.innerHTML = item.name;
            div111Front1.appendChild(div111Front11h4);

            var div111Front11p = document.createElement('p');
            div111Front11p.className = "card-text";
            div111Front11p.innerHTML = item.short_legend;
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

            var div13 = document.createElement('div')
            div13.id = "modul_quantity";
            div13.className = "card-footer";
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
            div111Front.appendChild(div111Front1);

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
            div111Front1.appendChild(div111Front11img);

            var div111Front11h4 = document.createElement('h4');
            div111Front11h4.className = "card-title";
            div111Front11h4.innerHTML = item.name;
            div111Front1.appendChild(div111Front11h4);

            var div111Front11p = document.createElement('p');
            div111Front11p.className = "card-text";
            div111Front11p.innerHTML = item.short_legend;
            div111Front1.appendChild(div111Front11p);

 
            var div111Back = document.createElement('div');
            div111Back.className = "card frontside";
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

            var div13 = document.createElement('div')
            div13.id = "modul_quantity";
            div13.className = "card-footer";
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
        //localStorage.setItem("list_achat", JSON.stringify(liste));
        localStorage.setItem("list_achat", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(liste))));
        if (document.getElementById("count2" + indexProduit) != null) {
            document.getElementById("count2" + indexProduit).value = count;
        }
        //createCookie("list_achat", JSON.stringify(CryptoJS.enc.Utf16.parse(new_apport)), 15);
    }
    //S'il existe déjà :
    else {
        //liste = JSON.parse(localStorage.getItem("list_achat"));
        liste = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("list_achat"))));
        for (let key in liste) {
            if (idProduit == liste[key].id) {
                count = liste[key].quantity;
                count++;
                liste[key].quantity = count;
                //localStorage.setItem("list_achat", JSON.stringify(liste));
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
                //localStorage.setItem("list_achat", JSON.stringify(liste));
                localStorage.setItem("list_achat", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(liste))));
                document.getElementById("count" + idProduit).value = count;
                if (document.getElementById("count2" + indexProduit) != null) {
                    document.getElementById("count2" + indexProduit).value = count;
                }
            }
        }
    }
    if (document.getElementById("count2" + idProduit) != null) {
        document.getElementById("count2" + idProduit).innerHTML = count;
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
    var produit = document.getElementById('moins' + idProduit);
    if (produit == null) {
        return false;
    }
    var id = produit.dataset.id;
    //liste = JSON.parse(localStorage.getItem("list_achat"));
    liste = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("list_achat"))))
    for (let key in liste) {
        //Diminue la quantité du produit tant qu'elle est >0.
        if (idProduit == liste[key].id) {
            var comptage2 = document.getElementById('count' + idProduit).value;
            if (comptage2 > 1) {
                comptage2--;
                liste[key].quantity = comptage2;
                //localStorage.setItem("list_achat", JSON.stringify(liste));
                localStorage.setItem("list_achat", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(liste))));
            }
            else if (comptage2 == 1) {
                document.getElementById("moins" + idProduit).style.visibility = 'hidden';
                document.getElementById("count" + idProduit).style.visibility = 'hidden';
                comptage2 = 0;
                liste[key].quantity = comptage2;
                //localStorage.setItem("list_achat", JSON.stringify(liste));
                localStorage.setItem("list_achat", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(liste))));
            }
        }
        else {
            var comptage2 = document.getElementById('count' + idProduit).value;
        }
        document.getElementById("count" + idProduit).value = comptage2;
        if (document.getElementById("count2" + indexProduit) != null) {
            document.getElementById("count2" + indexProduit).value = comptage2;
        }
        //createCookie("list_achat", JSON.stringify(CryptoJS.enc.Utf16.parse(new_apport)), 15);
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