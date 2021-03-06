<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>Page Admin</title>

	<!-- Styles CSS -->
	<link rel="stylesheet" href="css/booststrap.css">
	<link rel="stylesheet" href="css/attable.css">

	<!-- Icônes Fontawesome -->
	<link rel="stylesheet" href="css/fontawesome-free-5.15.4-web/css/all.css">

	<!-- Bootstrap core JS-->
	<script src="bootstrap/jquery-3.3.1.slim.min.js"></script>
	<script src="bootstrap/3.4.1-jquery.min.js"></script>
	<script src="bootstrap/tableExport.min.js"></script>
	<script src="bootstrap/popper.min.js"></script>
	<link rel="stylesheet" href="bootstrap/4.3.1-bootstrap.min.css">
	<script src="bootstrap/4.3.1-bootstrap.min.js"></script>

	<!-- Data crypto -->
	<script src="OriginalJS/cryptoJS.js" type="text/javascript"></script>

	<!-- Scripts -->
	<script src="js/cookie-obf.js" type="text/javascript"></script>
	<script src="js/crypto-obf.js" type="text/javascript"></script>
	<script src="js/panier-obf.js" type="module"></script>
	<script src="js/valid-obf.js" type="text/javascript"></script>

</head>

<body onload="panier(), redirAdmin(), productsArrayToPhp()">

<div class="container-fluid" id="top">
		<nav class="navbar navbar-expand-lg navbar-light">
			<div class="navbar-brand" id="logo">
				<a href="index.html"><img src="images/attable_logo2.png" class="img-fluid" alt="monlogo" id="leLogo">
				</a>

				<a href="noustrouver.html" id="locationSite">
					<i class="fas fa-map-marked-alt" id="logoLocationSite"></i>
				</a>
			</div>

			<div id="titre_page" class="collapse navbar-collapse justify-content-center">
				<div>Page Administrateur</div>
			</div>

			<div class="d-flex flex-row-reverse">
				<div id="panier" class="ml-auto">
					<a href="panier.html">
						<span id="total_articles">0</span>
						<img alt="" id="lepanier">
						<span id="total_commande">0 €</span>
					</a>
				</div>
				<div id="authentification">
					<a id="authAdmin">
						<img alt="" id="lesids">
					</a>
				</div>
			</div>
		</nav>
	</div>

	<br>

	<div class="text-center">
		<h4>Convertir les tableaux locaux products et categories en format json et stockage dans le localstorage</h4>
		<button id='jsonConvert'>Conversion et sauvegarde</button>
	</div>
	<br>
	<div class="text-center">
		<h4>Export du tableau products à firebase : Firestore Database & Realtime Database</h4>
		<button id='exportProducts'>Exporter</button>
	</div>
	<br>
	<div class="text-center">
		<h4>Export du tableau supplier à firebase : Firestore Database & Realtime Database</h4>
		<button id='exportSuppliers'>Exporter</button>
	</div>
	<br>
	<div class="text-center">
		<h4>Export du tableau categories à firebase : Firestore Database & Realtime Database</h4>
		<button id='exportCategories'>Exporter</button>
	</div>

	<br><br>

	<div class="text-center row">
		<h4>Gestion des Produits</h4>
		<a class="col-md-6" href="addproduct.html" target="_blank">CRUD Produits</a>
		<a class="col-md-6" href="bddproducts.html" target="_blank">BDD Produits</a>
	</div>

	<br>

	<div class="text-center row">
		<h4>Gestion des catégories</h4>
		<a class="col-md-6" href="addcategorie.html" target="_blank">CRUD Catégories</a>
		<a class="col-md-6" href="bddcategorie.html" target="_blank">BDD Catégories</a>
	</div>

	<br>

	<div class="text-center row">
		<h4>Gestion des Fournisseurs</h4>
		<a class="col-md-6" href="addsupplier.html" target="_blank">CRUD Fournisseurs</a>
		<a class="col-md-6" href="bddsupplier.html" target="_blank">BDD Fournisseurs</a>
	</div>

	<br><br>

	<hr>

	<div class="text-center">
		<h4>Sauvegarde des tableaux de données Firebase dans le file bdd.json</h4>
		<button id='importFilesBdd'>Download</button>
	</div>

	<hr>

	<br><br>

	<div class="text-center">
		<button onclick="logout()">Déconnexion</button>
	</div>

	<br><br>


	<footer class="py-4 text-center">
		<div class="container">
			<div class="row">
				<div class="col-sm-4 links" id="menu">
					<ul id="menus">
						<li><a href="index.html">Accueil</a></li>
						<li><a href="quisommesnous.html">Qui sommes nous</a></li>
						<li><a href="noustrouver.html">Nous trouver</a></li>
						<li><a href="panier.html">Commande</a></li>
					</ul>
				</div>

				<div class="col-sm-4 text-center ancre">
					<a href="#top">
						<i id='icon-footer' class="fas fa-angle-up"></i>
					</a>
					<div class="m-0 text-center" id="copyAt">Copyright &copy; ATTABLE 2021</div>
				</div>

				<div class="col-sm-4 links" id="menu">
					<ul id="menus">
						<li><a href="newsletter.html">Mailing List</a></li>
						<li><a href="mentionslegales.html">Mentions légales</a></li>
						<li><a href="cgu.html">CGU</a></li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
	
	<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
	<script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-storage.js"></script>
	<script src="js/firesrc-obf.js" type="text/javascript"></script>

	<!-- Scripts -->
	<script src="OriginalJS/data.js" type="module"></script>
	<script id='MainScript' type="module">
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				location.replace("authentification.html");
			}
			else {
				document.getElementById("lesids").src="images/login2.png";
				document.getElementById("lepanier").src = "images/logo_panier3.png";
			}
		})
	</script>
		


</body>

</html>