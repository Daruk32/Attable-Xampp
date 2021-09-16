var liste;


//--------------------------------------------------------------------------------------------------------
//Cette fonction décompose en chunk/nombre la chaîne de caractères issue du cookie list_achat en multiples arrays.
function splitIntoChunk(arr, chunk) {
	var liste = new Array();
	while (arr.length > 0) {
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
	for (let i = 0; i < tableau.length; i++) {
		if (tableau[i] == "object") {
			tableau = tableau[i].concat(tableau[i + 1]);
		}
	}
	var test = tableau.join(",");
	return test;
}




//Fonction Ajout quantité d'untel produit
window.plus = function plus(catindex) {
	//Déclaration du produit ciblé et de ses valeurs.
	var produit = document.getElementById('plus' + catindex);
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
		var count = document.getElementById('count' + catindex).value;
		count++;
		document.getElementById("count" + catindex).value = count;
		var new_apport = id.toString() + "," + name.toString() + "," + price.toString() + "," + url.toString() + "," + count.toString();
		createCookie("list_achat", new_apport, 15);
	}

	//S'il existe déjà :
	else {
		for (let i = 0; i < liste.length; i++) {
			// MAJ de la quantité de l'article
			if (id == liste[i][0]) {
				var count2 = liste[i][4];
				count2++;
				liste[i][4] = count2.toString();
				var new_apport = remontage(liste);
				document.getElementById("count" + catindex).value = count2;
			}
			// Ajout d'un nouvel article à la liste initialement générée.
			else if (document.getElementById('count' + catindex).value == "") {
				new_apport = readCookie("list_achat");
				var count3 = document.getElementById('count' + catindex).value;
				count3++;
				var new_apport = new_apport + "," + id.toString() + "," + name.toString() + "," + price.toString() + "," + url.toString() + "," + count3.toString();
				document.getElementById("count" + catindex).value = count3;
			}
		}

		//On enregistre la chaîne de caractères dans le cookie.
		createCookie("list_achat", new_apport, 15);
	}
	document.getElementById("count" + catindex).style.visibility = 'visible';
	document.getElementById("moins" + catindex).style.visibility = 'visible';

	//Ici, pour mettre à jour le nombre d'éléments dans le widget panier.
	panier();
}



//Fonction Retire quantité d'untel produit
window.minus = function minus(cat_index) {
	var produit = document.getElementById('moins' + cat_index);
	if (produit == null) {
		return false;
	}
	var id = produit.dataset.id;

	liste = defrag_cookie("list_achat");

	for (let i = 0; i < liste.length; i++) {
		//Diminue la quantité du produit tant qu'elle est >0.

		if (liste[i][0] == id) {
			var comptage2 = document.getElementById('count' + cat_index).value;

			if (comptage2 > 1) {
				comptage2--;
				liste[i][4] = comptage2.toString();
				var new_apport = remontage(liste);
			}
			else if (comptage2 == 1) {
				comptage2--;
				document.getElementById("moins" + cat_index).style.visibility = 'hidden';
				document.getElementById("count" + cat_index).style.visibility = 'hidden';
				liste[i][4] = comptage2.toString();
				var new_apport = remontage(liste);
				comptage2 = 0;
			}
		}
		else {
			var comptage2 = document.getElementById('count' + cat_index).value;
		}

		document.getElementById("count" + cat_index).value = comptage2;

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
			for (let i = 0; i < commande.length; i++) {
				total = total + parseFloat(commande[i][4]) * parseFloat(commande[i][2]);
				nb_article = nb_article + parseFloat(commande[i][4]);
			}
			total = (Math.round(total * 100)) / 100;
		}
	}
	document.getElementById("total_commande").innerHTML = total + " €";
	document.getElementById("total_articles").innerHTML = nb_article;

	if (window.location == "http://localhost:1234/Attable-Xampp/panier.html" || window.location == "http://johan.giroux.free.fr/attable/panier.html" || window.location == "http://attable.free.fr/panier.html") {
		document.getElementById("sous_total").innerHTML = total + " €";
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
			var supp = lotcommande.filter(function (val) { return val !== '' });
		}
		var reimport = remontage(supp);
		createCookie("list_achat", reimport, 15);
		location.reload();
	}
}


//Fonction de génération du panier à la page panier.html à partir du cookie
window.crea_panier = function crea_panier() {
	if (readCookie("list_achat") == null) {
		document.getElementById("cart_tablebody").innerHTML = "";
	}
	else {
		var liste_panier = defrag_cookie("list_achat");
		for (let i = 0; i < liste_panier.length; i++) {
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
				document.getElementById("cart_tablebody").innerHTML += ch1 + ch2 + ch3 + ch4 + ch5 + ch6 + ch7 + ch8 + ch9 + ch10 + ch11;
			}
		}
	}
}


//Création du Mail pour la commande
window.valid_command = function valid_command() {
	var d = new Date();
	var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
	var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
	var fullDate = date + ' ' + hours;

	if (readCookie("list_achat") != null) {
		var liste_panier = defrag_cookie("list_achat");

		var m1 = "<a href='mailto:attable@gmail.com?subject=Votre commande - N° Commande&body=Identifiant client :%0ADate : " + fullDate + "%0A%0ABonjour,%0A%0AVoici le récapitulatif de votre commande :%0A%0A";
		var m2 = "|-------------------------------------------------------------------------------------|%0A";
		var m3 = "|            Désignation            |         Quantité         |         Prix (€)         |%0A";
		var m4 = "|-------------------------------------------------------------------------------------|%0A";
		var m5 = "";
		for (let i = 0; i < liste_panier.length; i++) {
			if (liste_panier[i][4] > 0) {
				m5 = m5 + liste_panier[i][1] + " | " + liste_panier[i][4] + " | " + liste_panier[i][2] + "€%0A";
			}
		}
		var m6 = "|-------------------------------------------------------------------------------------|%0A";
		var m7 = "%0A%0AVotre total : " + readCookie("Somme") + "€%0A";
		var m8 = "%0A%0A Merci pour votre commande !%0A%0ACordialement,%0A%0AAssociation Attable, le Collectif du goût'>Passer la commande</a>";
		document.getElementById("valid-command").innerHTML = m1 + m2 + m3 + m4 + m5 + m6 + m7 + m8;

	}
	else {
		document.getElementById("valid-command").innerHTML = "<a onclick='alert(\"Votre panier est vide !\")'>Passer la commande</a>";
	}
}


//Fonction de génération de PDF
window.generate = function generate() {
	var doc = new jspdf.jsPDF()
	doc.setFontSize(12);

	//Image Logo
	var imag = new Image()
	imag.src = 'images/attable_logo2.png'
	doc.addImage(imag, 'PNG', 10, 10, 36, 14);
	doc.text(140, 15, 'Attable, Collectif du Goût');
	doc.text(140, 20, 'Avenue de Limburg');
	doc.text(140, 25, '69110 Sainte-Foy-lès-Lyon');
	doc.text(140, 30, 'attable@gmail.com');

	//N° Commande test
	var random = Math.random(1000000, 9999999);
	doc.text('N° Commande : ' + random, 10, 50);

	//Date
	const currentDate = new Date();
	const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
	function addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	var d = new Date();
	var h = addZero(d.getHours());
	var m = addZero(d.getMinutes());
	var s = addZero(d.getSeconds());
	var fullDate = "Le " + currentDate.toLocaleDateString('fr-FR', options) + " à " + h + ":" + m + ":" + s;
	doc.text(fullDate, 135, 40);

	//N° Client test
	doc.text("N° Client : " + Math.random(1000000, 9999999), 10, 60);

	//Tableau Achats
	var head = [['Article', 'Prix', 'Quantité']]

	var body = [];
	var liste_panier = defrag_cookie("list_achat");
	for (let i = 0; i < liste_panier.length; i++) {
		if (liste_panier[i][4] > 0) {
			body.push([liste_panier[i][1], liste_panier[i][2], liste_panier[i][4]]);
		}
	}

	doc.autoTable({ margin: { top: 70 }, head: head, body: body })

	//Montant total
	var amount_down = 70 + (body.length + 1) * 10;
	doc.text(155, amount_down, 'Montant total : ' + readCookie("Somme") + "€");

	doc.save('Ma Commande.pdf')
}