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
if (divBody != null) {
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
}


//fonction de calcul du total du panier
window.panier = function panier() {
	var total = 0;
	var nb_article = 0;
	if (localStorage.getItem("list_achat") != null) {
		var commande = JSON.parse(localStorage.getItem("list_achat"))
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

	if (document.getElementById("sous_total") != null) {
		document.getElementById("sous_total").innerHTML = total + " €";
	}
	localStorage.setItem("Somme", JSON.stringify(total));
	return total;
}

//Fonction pour supprimer une ligne du tableau de commande
window.supp = function supp(article) {
	if (localStorage.getItem("list_achat") != null) {
		var lotcommande = JSON.parse(localStorage.getItem("list_achat"));
		delete lotcommande[article];
		localStorage.setItem("list_achat", JSON.stringify(lotcommande))
		location.reload();
	}
}


//Fonction de génération du panier à la page panier.html à partir du cookie
window.crea_panier = function crea_panier() {
	if (localStorage.getItem("list_achat") == null) {
		document.getElementById("cart_tablebody").innerHTML = "";
	}
	else {
		var liste_panier = JSON.parse(localStorage.getItem("list_achat"));
		for (let i in liste_panier) {
			if (liste_panier[i].quantity > 0) {
				var table1 = document.getElementById("cart_tablebody");
				var tr11 = document.createElement('tr')
				tr11.className = "line_panier";
				table1.appendChild(tr11);
				var td111 = document.createElement('td')
				tr11.appendChild(td111);
				var img1111 = document.createElement('img')
				img1111.src = liste_panier[i].url;
				img1111.id = "echantillon";
				img1111.className = "img-fluid";
				td111.appendChild(img1111);
				var td112 = document.createElement('td')
				td112.innerHTML = liste_panier[i].name;
				tr11.appendChild(td112);
				var td113 = document.createElement('td')
				td113.innerHTML = liste_panier[i].price;
				tr11.appendChild(td113);
				var td114 = document.createElement('td')
				td114.innerHTML = liste_panier[i].quantity;
				tr11.appendChild(td114);
				var td115 = document.createElement('td')
				tr11.appendChild(td115);
				var img1151 = document.createElement('img')
				img1151.src = "images/corbeille.jpg";
				img1151.id = "trashcan";
				img1151.addEventListener("click", function (e) {
					supp(liste_panier[i].id);
				}, false);
				td115.appendChild(img1151);
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

	if (localStorage.getItem("list_achat") != null) {
		var liste_panier = JSON.parse(localStorage.getItem("list_achat"));

		var m1 = "<a href='mailto:attable@gmail.com?subject=Votre commande - N° Commande&body=Identifiant client :%0ADate : " + fullDate + "%0A%0ABonjour,%0A%0AVoici le récapitulatif de votre commande :%0A%0A";
		var m2 = "|-------------------------------------------------------------------------------------|%0A";
		var m3 = "|            Désignation            |         Quantité         |         Prix (€)         |%0A";
		var m4 = "|-------------------------------------------------------------------------------------|%0A";
		var m5 = "";
		for (let i in liste_panier) {
			if (liste_panier[i].quantity > 0) {
				m5 = m5 + liste_panier[i].name + " | " + liste_panier[i].quantity + " | " + liste_panier[i].price + "€%0A";
			}
		}
		var m6 = "|-------------------------------------------------------------------------------------|%0A";
		var m7 = "%0A%0AVotre total : " + JSON.parse(localStorage.getItem("Somme")) + "€%0A";
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
	var liste_panier = JSON.parse(localStorage.getItem("list_achat"));
	for (let i in liste_panier) {
		if (liste_panier[i].quantity > 0) {
			body.push([liste_panier[i].name, liste_panier[i].price + " €", liste_panier[i].quantity]);
		}
	}

	doc.autoTable({ margin: { top: 70 }, head: head, body: body })

	//Montant total
	var amount_down = 70 + (body.length + 1) * 10;
	doc.text(155, amount_down, 'Montant total : ' + JSON.parse(localStorage.getItem("Somme")) + "€");

	//doc.save('Ma Commande.pdf');
	window.open(doc.output('bloburl'), '_blank');
}