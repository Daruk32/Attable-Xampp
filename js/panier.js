import {tab_categorie} from '../js/data.js'

var nombre_article;
var liste;


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

	//On lit les cookies pour savoir le produit existe déjà ou non
	//C'est un nouveau produit avec initialisation de la liste et du cookie :
	if (readCookie("list_achat") == null) {
		var count = document.getElementById('count'+catindex).value;
		count++;
		document.getElementById("count"+catindex).value = count;
		var new_apport = id.toString() + "," + name.toString() + "," + price.toString() + "," + url.toString() + "," + count.toString();
		var total_panier = count*price;
		createCookie("list_achat", new_apport, 15);
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

		//On enregistre la chaîne de caractères dans le cookie.
		createCookie("list_achat", new_apport, 15);
	}
    document.getElementById("count"+catindex).style.visibility = 'visible';
    document.getElementById("moins"+catindex).style.visibility = 'visible';

	//Ici, pour mettre à jour le nombre d'éléments dans le widget panier.
    panier();
}



//Fonction Retire quantité d'untel produit
window.minus = function minus(cat_index){
	var produit = document.getElementById('moins'+cat_index);
    if (produit == null) {
    	return false;
    }
    var id = produit.dataset.id;

	liste = defrag_cookie("list_achat");

	for (let i=0 ; i < liste.length ; i++) {
    	//Diminue la quantité du produit tant qu'elle est >0.

		if (liste[i][0] == id) {		
			var comptage2 = document.getElementById('count'+cat_index).value;

			if (comptage2 > 1) {
                comptage2--;
				liste[i][4] = comptage2.toString();
				var new_apport = remontage(liste);
			}
			else if (comptage2 == 1) {
                comptage2--;
                document.getElementById("moins"+cat_index).style.visibility = 'hidden';
                document.getElementById("count"+cat_index).style.visibility = 'hidden';
                liste[i][4] = comptage2.toString();
				var new_apport = remontage(liste);
                comptage2 = 0;
			}
		}
        else {
            var comptage2 = document.getElementById('count'+cat_index).value;
        }

		document.getElementById("count"+cat_index).value = comptage2;

		createCookie("list_achat", new_apport, 15);
	}

    var somme = panier();
}


//fonction de calcul du total du panier
window.panier = function panier() {
    var total = 0;
    var nb_article = 0;

    if (readCookie("list_achat") != null) {
		var commande = defrag_cookie("list_achat");
		if (commande == "") {
			total = 0;
			nb_article = 0;
			eraseCookie("list_achat");
		}
        else {
			for (let i=0 ; i < commande.length ; i++) {
            	total = total + parseFloat(commande[i][4]) * parseFloat(commande[i][2]);
            	nb_article = nb_article + parseFloat(commande[i][4]);
        	}
        total = (Math.round(total*100))/100;
		}
    }
    document.getElementById("total_commande").innerHTML = total+" €";
    document.getElementById("total_articles").innerHTML = nb_article;

	if (window.location == "http://localhost:1234/Attable-Xampp/panier.html" || window.location == "http://johan.giroux.free.fr/attable/panier.html" || window.location == "http://attable.free.fr/panier.html") {
    	document.getElementById("sous_total").innerHTML = total+" €";
	}
    createCookie("Somme", total, 15);

    return total;
}


//Fonction pour supprimer une ligne du tableau de commande
window.supp = function supp(article) {
	if (readCookie("list_achat") != null) {
		var lotcommande = defrag_cookie("list_achat");
		delete lotcommande[article];
		if (lotcommande.length > 0) {
			var supp = lotcommande.filter( function(val){return val !== ''} );
		}
		var reimport = remontage(supp);
		createCookie("list_achat", reimport, 15);
		location.reload();
	}
}