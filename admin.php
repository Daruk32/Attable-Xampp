<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>Page Admin</title>

	<!-- Styles CSS -->
	<link rel="stylesheet" href="css/attable.css">
	<link rel="stylesheet" href="css/booststrap.css">
	<link rel="stylesheet" href="css/footer.css">

	<!-- Icônes Fontawesome -->
	<link rel="stylesheet" href="css/fontawesome-free-5.15.4-web/css/all.css">

	<!-- Bootstrap core JS-->
	<script src="bootstrap/jquery-3.3.1.slim.min.js"></script>
	<script src="bootstrap/3.4.1-jquery.min.js"></script>
	<script src="bootstrap/tableExport.min.js"></script>
	<script src="bootstrap/popper.min.js"></script>
	<link rel="stylesheet" href="bootstrap/4.3.1-bootstrap.min.css">
	<script src="bootstrap/4.3.1-bootstrap.min.js"></script>
	<!-- Bootstrap Table -->
	<link rel="stylesheet" href="bootstrap/bootstrap-table.min.css">
	<script src="bootstrap/bootstrap-table.min.js"></script>

	<!-- Data crypto -->
	<script src="js/cryptoJS-obf.js" type="text/javascript"></script>

	<!-- Scripts -->
	<script src="js/cookie-obf.js" type="text/javascript"></script>
	<script src="js/crypto-obf.js" type="text/javascript"></script>
	<script src="js/panier-obf.js" type="module"></script>
	<script src="js/valid-obf.js" type="text/javascript"></script>

</head>

<body onload="panier(), redirAdmin(), convertJsonStorage(), exportProducts(), ExpSuppliers(), ExpCategories(), productsArrayToPhp()">

	<nav class="navbar navbar-expand-lg navbar-light" id="top">
		<div class="container-fluid d-flex flex-row">
			<a class="navbar-brand" href="index" id="logo"><img src="images/attable_logo2.png" class="img-fluid"
					alt="monlogo" id="lelogo"></a>
			<div class="nav-item collapse navbar-collapse">
				<div id="titre_page">Page Administrateur</div>
			</div>
			<div id="authentification">
				<a id="authAdmin">
					<img src="images/login.png" alt="Authentification" id="lesids">
				</a>
			</div>
			<div id="panier">
				<a href="panier">
					<span id="total_articles">0</span>
					<img src="images/logo_panier2.png" alt="MonPanier" id="lepanier">
					<span id="total_commande">0 €</span>
				</a>
			</div>
		</div>
	</nav>

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
		<a class="col-md-6" href="addproduct" target="_blank">CRUD Produits</a>
		<a class="col-md-6" href="bddproducts" target="_blank">BDD Produits</a>
	</div>

	<br>

	<div class="text-center row">
		<h4>Gestion des catégories</h4>
		<a class="col-md-6" href="addcategorie" target="_blank">CRUD Catégories</a>
		<a class="col-md-6" href="bddcategorie" target="_blank">BDD Catégories</a>
	</div>

	<br>

	<div class="text-center row">
		<h4>Gestion des Fournisseurs</h4>
		<a class="col-md-6" href="addsupplier" target="_blank">CRUD Fournisseurs</a>
		<a class="col-md-6" href="bddsupplier" target="_blank">BDD Fournisseurs</a>
	</div>

	<br><br>

	<div class="text-center">
		<button onclick="logout()">Déconnexion</button>
	</div>

	<br><br>
	<!--
		<div class="text-center">
			<button onclick="majFilesObf()">MAJ des fichiers obfusqués</button>
		</div>
	-->
	<br><br>


	<footer class="py-4 text-center">
		<div class="container">
			<div class="row">
				<div class="col-sm-4 links" id="menu">
					<ul id="menus">
						<li><a href="index">Accueil</a></li>
						<li><a href="quisommesnous">Qui sommes nous</a></li>
						<li><a href="noustrouver">Nous trouver</a></li>
						<li><a href="panier">Commande</a></li>
					</ul>
				</div>

				<div class="col-sm-4 text-center ancre">
					<a href="#top">
						<i id='icon-footer' class="fas fa-angle-up"></i>
					</a>
					<p class="m-0 text-center text-white">Copyright &copy; ATTABLE 2021</p>
				</div>

				<div class="col-sm-4 links" id="menu">
					<ul id="menus">
						<li><a href="newsletter">Mailing List</a></li>
						<li><a href="mentionslegales">Mentions légales</a></li>
						<li><a href="cgu">CGU</a></li>
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
	<!-- Scripts -->
	<script src="js/data-obf.js" type="module"></script>
	<script id='MainScript' type="module">
		firebase.auth().onAuthStateChanged((user) => {
			if (!user) {
				location.replace("authentification");
			}
			else {
				document.getElementById("lesids").src="images/login2.png";
			}
		})
	</script>
		


</body>

</html>