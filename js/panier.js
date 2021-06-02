import {tab_categorie} from '../js/gen_dyna.js'

var nombre_article;
var liste;


//--------------------------------------------------------------------------------------------------------



//Fonction Sauvegarde du Panier
/*
function saveCart(inCartItemsNum, cartArticles) {
    CreateCookie('inCartItemsNum', cartArticles, 5);
    CreateCookie('inCartItemsNum', JSON.stringify(cartArticles), 5);
}
*/


// variables pour stocker le nombre d'articles et leurs noms
//var inCartItemsNum;
//var cartArticles;

/*
// affiche/cache les éléments du panier selon s'il contient des produits
function cartEmptyToggle() {
    if (inCartItemsNum > 0) {
        $('#cart-dropdown .hidden').removeClass('hidden');
        $('#empty-cart-msg').hide();
    }

    else {
        $('#cart-dropdown .go-to-cart').addClass('hidden');
        $('#empty-cart-msg').show();
    }
}


//--------------------------------------------------------------------------------------------------------


// récupère les informations stockées dans les cookies
inCartItemsNum = parseInt(readCookie('inCartItemsNum') ? readCookie('inCartItemsNum') : 0);
cartArticles = readCookie('cartArticles') ? JSON.parse(readCookie('cartArticles')) : [];

cartEmptyToggle();

// affiche le nombre d'article du panier dans le widget
$('#in-cart-items-num').html(inCartItemsNum);

// hydrate le panier
var items = '';
cartArticles.forEach(function(v) {
   items += '<li id="'+ v.id + v.name +'<br><small>Quantité : <span class="count">'+ v.count +'</span></small></a></li>';
});

$('#cart-dropdown').prepend(items);
*/

//--------------------------------------------------------------------------------------------------------
//Cette fonction décompose en chunk/nombre la chaîne de caractères issue du cookie list_achat en multiples arrays.
function splitIntoChunk(arr, chunk) {
	var liste = new Array();
	while(arr.length > 0) {
		let tempArray = arr.splice(0, chunk);
		liste.push(tempArray);
	}
	return liste;
}

//Cette fonction réunit les arrays produits par splitIntoChunk dans un array central : liste.
export function defrag_cookie(list_achat) {
	if (readCookie("list_achat") == null) {
		liste = null;
	}
	else {
		liste = splitIntoChunk(readCookie("list_achat").split(","), 5);
	}
	return liste;
}

//Cette fonction assemble les tableaux en une chaîne de caractères.
function remontage(liste) {
	var tableau = liste;
	for (let i = 0 ; i < tableau.length ; i++) {
		if (tableau[i] == "object") {
			tableau = tableau[i].concat(tableau[i+1]);
		}
	}
	var test = tableau.join(",");
	return test;
}
			



//Fonction Ajout quantité d'untel produit
window.plus = function plus(catindex){
	//Déclaration du produit ciblé et de ses valeurs.
	var produit = document.getElementById('plus'+catindex);
    if (produit == null) {
    	return false;
    }
    var id = produit.dataset.id;
    var name = produit.dataset.name;
    var price = produit.dataset.price;
    var url = produit.dataset.url;

    //Appel du tableau des enregistrements
	liste = defrag_cookie("list_achat");
	//Sert à remplir le cookie list_achat 
	var new_apport;
	//Sert à contrôler la quantité d'un article modifié dans le panier
	var count;
	//Sert à contrôler l'existence d'un article dans le panier
	var newArticle = true;

	//On lit les cookies pour savoir le produit existe déjà ou non
	//C'est un nouveau produit avec initialisation de la liste et du cookie :
	if (readCookie("list_achat") == null) {
		var count = document.getElementById('count'+catindex).value;
		count++;
		document.getElementById("count"+catindex).value = count;

		var new_apport = id.toString() + "," + name.toString() + "," + price.toString() + "," + url.toString() + "," + count.toString();
	
		var total_panier = count*price;

		createCookie("list_achat", new_apport, 15);
		createCookie("Somme", total_panier, 15);
	}

	//S'il existe déjà :
	else {
		for (let i=0 ; i < liste.length ; i++) {
			// MAJ de la quantité de l'article
			if (id == liste[i][0]) {
				var count2 = liste[i][4];
				count2++;
				liste[i][4] = count2.toString();
				var new_apport = remontage(liste);
				document.getElementById("count"+catindex).value = count2;

			}
			// Ajout d'un nouvel article à la liste initialement générée.
			else if (document.getElementById('count'+catindex).value == "") {
				new_apport = readCookie("list_achat");
				var count3 = document.getElementById('count'+catindex).value;
				count3++;
				var new_apport = new_apport + "," + id.toString() + "," + name.toString() + "," + price.toString() + "," + url.toString() + "," + count3.toString();
			document.getElementById("count"+catindex).value = count3;

			}

		}
		//Affichage de la valeur sur la page HTML


		//On enregistre la chaîne de caractères dans le cookie.
		createCookie("list_achat", new_apport, 15);


	}

    document.getElementById("count"+catindex).style.visibility = 'visible';
    document.getElementById("moins"+catindex).style.visibility = 'visible';

//Stockage de la quantité de produit/Affichage dans le widget

//Ici, pour mettre à jour le nombre d'éléments dans le widget panier.
//	document.getElementById(zespan).value = count;

// A la fin les return !
	
}



//Fonction Retire quantité d'untel produit
window.minus = function minus(catindex){
	var produit = document.getElementById('plus'+catindex);

    var id = produit.dataset.id;


	liste = defrag_cookie("list_achat");

	for (let i=0 ; i < liste.length ; i++) {
    	//Diminue la quantité du produit tant qu'elle est >0.
        console.log(id);
        console.log(liste[i][0]);

		if (id == liste[i][0]) {		
			var comptage2 = document.getElementById('count'+catindex).value;

			if (comptage2 > 1) {
                console.log(comptage2);
                comptage2--;
                console.log(comptage2);
				liste[i][4] = comptage2.toString();
				var new_apport = remontage(liste);
			}
			else if (comptage2 == 1) {
                comptage2--;
                document.getElementById("moins"+catindex).style.visibility = 'hidden';
                document.getElementById("count"+catindex).style.visibility = 'hidden';
                liste[i][4] = comptage2.toString();
				var new_apport = remontage(liste);
                comptage2 = 0;
			}
		}
        else {
            alert("alerte");
            return false;
        }

		document.getElementById("count"+catindex).value = comptage2;

		createCookie("list_achat", new_apport, 15);
	}

	//Efface le cookie du produit si la quantité tombe à 0.


	//Créer ici la ligne html du tableau

	//Mettre les appels au span pour afficher la quantité	
}


//fonction de calcul du total du panier
function panier(liste, add_del) {
	
	var test = readCookie("Somme");
	console.log(test);

	var total_panier = parseFloat(readCookie("Somme"));
	console.log(total_panier);
	for (let i=0 ; i < liste.length ; i++) {
		var count = parseFloat(liste[i][4]);
		var prix = parseFloat(liste[i][2]);

		if (add_del == 1) {
			var autre = count*prix;
			console.log(autre);
			total_panier =+ autre;
			console.log(total_panier);
		}

		else if  (add_del == 2) {
			var autre = count*prix;
			console.log(autre);
			total_panier =- autre;
			console.log(total_panier);			
		}
	}
	createCookie("Somme", total_panier, 15);

	return total_panier;
}
/*

// click bouton ajout panier
$('.add-to-cart').click(function() {
    // récupération des infos du produit
    var $this = $(this);
    var id = $this.attr('data-id');
    var name = $this.attr('data-name');
    var price = $this.attr('data-price');
    var count = parseInt($('#count').val());
    inCartItemsNum += count;

    // mise à jour du nombre de produit dans le widget
    $('#in-cart-items-num').html(inCartItemsNum);

    var newArticle = true;

    // vérifie si l'article est pas déjà dans le panier
    cartArticles.forEach(function(v) {
        // si l'article est déjà présent, on incrémente la quantité
        if (v.id == id) {
            newArticle = false;
            v.count += count;
            $('#'+ id).html(name +'<br><small>Quantité : <span class="count">'+ v.count +'</span></small></a>');
        }
    });

    // s'il est nouveau, on l'ajoute
    if (newArticle) {
        $('#cart-dropdown').prepend('<li id="'+ id +'">'+ name +'<br><small>Quantité : <span class="count">'+ count +'</span></small></a></li>');

        cartArticles.push({
            id: id,
            name: name,
            price: price,
            count: count,
        });
    }

    // sauvegarde le panier
    saveCart(inCartItemsNum, cartArticles);

    // affiche le contenu du panier si c'est le premier article
    cartEmptyToggle();
});

*/
//--------------------------------------------------------------------------------------------------------
/*


// si on est sur la page ayant pour url monsite.fr/panier/
if (window.location.pathname == '/panier/') {
    var items = '';
    var subTotal = 0;
    var total;

    /* on parcourt notre array et on créé les lignes du tableau pour nos articles :
    * - Le nom de l'article (lien cliquable qui mène à la fiche produit)
    * - son prix
    * - la dernière colonne permet de modifier la quantité et de supprimer l'article
    *
    * On met aussi à jour le sous total et le poids total de la commande
    */ /*
    cartArticles.forEach(function(v) {
        // opération sur un entier pour éviter les problèmes d'arrondis
        var itemPrice = v.price.replace(',', '.') * 1000;
        items += '<tr data-id="'+ v.id +'">\
             <td>'+ v.name +'</a></td>\
             <td>'+ v.price +'€</td>\
             <td><span class="count">'+ v.count +'</span> <span class="count-minus">–</span> <span class="count-plus">+</span> \
             <a class="delete-item">Supprimer</a></td></tr>';
        subTotal += v.price.replace(',', '.') * v.count;
    });

    // on reconverti notre résultat en décimal
    subTotal = subTotal / 1000;

    // On insère le contenu du tableau et le sous total
    $('#cart-tablebody').empty().html(items);
    $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));

    // lorsqu'on clique sur le "+" du panier
    $('.count-plus').on('click', function() {
        var $this = $(this);

        // récupère la quantité actuelle et l'id de l'article
        var count = parseInt($this.prevAll('.count').html());
        var id = $this.parent().parent().attr('data-id');

        // met à jour la quantité et le poids
        inCartItemsNum += 1;
        $this.prevAll('.count').html(count + 1);
        $('#in-cart-items-num').html(inCartItemsNum);
        $('#'+ id + ' .count').html(count + 1);

        // met à jour cartArticles
        cartArticles.forEach(function(v) {
            // on incrémente la qt
            if (v.id == id) {
                v.count += 1;

                // récupération du prix
                // on effectue tous les calculs sur des entiers
                subTotal = ((subTotal * 1000) + (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000;
            }
        });

        // met à jour la quantité du widget et sauvegarde le panier
        $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
        saveCart(inCartItemsNum, cartArticles);
    });

    // quantité -
    $('.count-minus').click(function() {
        var $this = $(this);
        var count = parseInt($this.prevAll('.count').html());
        var id = $this.parent().parent().attr('data-id');

        if (count > 1) {
            // maj count
            inCartItemsNum -= 1;
            $this.prevAll('.count').html(count - 1);
            $('#in-cart-items-num').html(inCartItemsNum);
            $('#'+ id + ' .count').html(count - 1);

            cartArticles.forEach(function(v) {
                // on décrémente la qt
                if (v.id == id) {
                    v.count -= 1;

                    // récupération du prix
                    // on effectue tous les calculs sur des entiers
                    subTotal = ((subTotal * 1000) - (parseFloat(v.price.replace(',', '.')) * 1000)) / 1000;
                }
            });

            $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
            saveCart(inCartItemsNum, cartArticles);
        }
    });

    // suppression d'un article
    $('.delete-item').click(function() {
        var $this = $(this);
        var count = parseInt($this.prevAll('.count').html());
        var id = $this.parent().parent().attr('data-id');
        var arrayId = 0;
        var price;

        // maj qt
        inCartItemsNum -= count;
        $('#in-cart-items-num').html(inCartItemsNum);

        // supprime l'item du DOM
        $this.parent().parent().hide(600);
        $('#'+ id).remove();

        cartArticles.forEach(function(v) {
            // on récupère l'id de l'article dans l'array
            if (v.id == id) {
                // on met à jour le sous total et retire l'article de l'array
                // as usual, calcul sur des entiers
                var itemPrice = v.price.replace(',', '.') * 1000;
                subTotal -= (itemPrice * count) / 1000;
                cartArticles.splice(arrayId, 1);

                return false;
            }

            arrayId++;
        });

        $('.subtotal').html(subTotal.toFixed(2).replace('.', ','));
        saveCart(inCartItemsNum, cartArticles);
        cartEmptyToggle();
    });
}

*/