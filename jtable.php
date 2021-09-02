<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<title>JTable</title>

		<link rel="stylesheet" href="css\attable.css">
		<link rel="stylesheet" href="css\footer.css">

		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

 
		<!-- Bootstrap core JS-->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
		
		<!-- icons-->
		<script src="https://use.fontawesome.com/2e4ae48f29.js"></script>
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
		
		<!-- Bootstrap Table Style -->
		<link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.css">

		<script src="js\valid.js" type="text/javascript"></script>

		<script src="js/cookie.js" type="text/javascript"></script>

		<script src="js/panier.js" type="module"></script>

		<script src="https://unpkg.com/tableexport.jquery.plugin/tableExport.min.js"></script>
		<script src="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.js"></script>
		<script src="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table-locale-all.min.js"></script>
		<script src="https://unpkg.com/bootstrap-table@1.18.3/dist/extensions/export/bootstrap-table-export.min.js"></script>
		<script src="https://unpkg.com/bootstrap-table@1.18.3/dist/extensions/print/bootstrap-table-print.min.js"></script>


	</head>
	
	<body>
	
		<section>
			<nav class="navbar navbar-expand-lg navbar-light" id="top">
				<div class="container-fluid d-flex flex-row">
					<a class="navbar-brand" href="index.html" id="logo"><img src="images\attable_logo2.png" class="img-fluid" alt="monlogo" id="lelogo"></a>
					<div id="titre_page" class="collapse navbar-collapse justify-content-center">
						<div id="titre_page">Passez ATTABLE et faites des économies !</div>
					</div>
					<div class='nav-item collapse navbar-collapse'>
						<form class="collapse navbar-collapse justify-content-end">
							<input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
							<button class="btn btn-outline-success" type="submit">Search</button>
						</form>
					</div>
					<div id="authentification">
						<a href="authentification.html">
						<img src="images\login.png" alt="Authentification" id="lesids">
						</a>				
					</div>						
					<div id="panier">
						<a href="panier.html">
							<span id="total_articles">0</span>
							<img src="images\logo_panier2.png" alt="MonPanier" id="lepanier">
							<span id="total_commande">0 €</span>
						</a>
					</div>
				</div>
			</nav>			  
		</section>

<!-- 2 tableaux avec html/Javascript différents à mettre/enlever en commentaires pour ne pas qu'ils s'empiètent. -->

<!-- Tableau 1 à base de données fixes, voir le script plus bas -->
		<table id="table">
			<thead>
				<tr>
				<th data-field="id">ID</th>
				<th data-field="libelle">Nom</th>
				<th data-field="prix">Prix</th>
				<th data-field="quantity">Quantité</th>
				<th data-field="categorie">Catégorie</th>
				</tr>
			</thead>
		</table>


<!-- Tableau Table avec fonctionnalités, voir sa génération avec le fichier jtable.js -->

<!--
		<div class="select">
			<select class="form-control" id="locale">
			  <option value="af-ZA">af-ZA</option>
			  <option value="ar-SA">ar-SA</option>
			  <option value="ca-ES">ca-ES</option>
			  <option value="cs-CZ">cs-CZ</option>
			  <option value="da-DK">da-DK</option>
			  <option value="de-DE">de-DE</option>
			  <option value="el-GR">el-GR</option>
			  <option value="en-US" selected>en-US</option>
			  <option value="es-AR">es-AR</option>
			  <option value="es-CL">es-CL</option>
			  <option value="es-CR">es-CR</option>
			  <option value="es-ES">es-ES</option>
			  <option value="es-MX">es-MX</option>
			  <option value="es-NI">es-NI</option>
			  <option value="es-SP">es-SP</option>
			  <option value="et-EE">et-EE</option>
			  <option value="eu-EU">eu-EU</option>
			  <option value="fa-IR">fa-IR</option>
			  <option value="fi-FI">fi-FI</option>
			  <option value="fr-BE">fr-BE</option>
			  <option value="fr-FR">fr-FR</option>
			  <option value="he-IL">he-IL</option>
			  <option value="hr-HR">hr-HR</option>
			  <option value="hu-HU">hu-HU</option>
			  <option value="id-ID">id-ID</option>
			  <option value="it-IT">it-IT</option>
			  <option value="ja-JP">ja-JP</option>
			  <option value="ka-GE">ka-GE</option>
			  <option value="ko-KR">ko-KR</option>
			  <option value="ms-MY">ms-MY</option>
			  <option value="nb-NO">nb-NO</option>
			  <option value="nl-NL">nl-NL</option>
			  <option value="pl-PL">pl-PL</option>
			  <option value="pt-BR">pt-BR</option>
			  <option value="pt-PT">pt-PT</option>
			  <option value="ro-RO">ro-RO</option>
			  <option value="ru-RU">ru-RU</option>
			  <option value="sk-SK">sk-SK</option>
			  <option value="sv-SE">sv-SE</option>
			  <option value="th-TH">th-TH</option>
			  <option value="tr-TR">tr-TR</option>
			  <option value="uk-UA">uk-UA</option>
			  <option value="ur-PK">ur-PK</option>
			  <option value="uz-Latn-UZ">uz-Latn-UZ</option>
			  <option value="vi-VN">vi-VN</option>
			  <option value="zh-CN">zh-CN</option>
			  <option value="zh-TW">zh-TW</option>
			</select>
		</div>

		<div id="toolbar">
			<button id="remove" class="btn btn-danger" disabled>
			  <i class="fa fa-trash"></i> Delete
			</button>
		</div>
		<table
			id="table"
			data-toolbar="#toolbar"
			data-search="true"
			data-show-refresh="true"
			data-show-toggle="true"
			data-show-fullscreen="true"
			data-show-columns="true"
			data-show-columns-toggle-all="true"
			data-show-print="true"
			data-detail-view="true"
			data-show-export="true"
			data-click-to-select="true"
			data-detail-formatter="detailFormatter"
			data-minimum-count-columns="2"
			data-show-pagination-switch="true"
			data-pagination="true"
			data-id-field="id"
			data-page-list="[10, 25, 50, 100, all]"
			data-show-footer="true"
			data-side-pagination="server"
			data-url="donnees.json"
			data-response-handler="responseHandler">
			
			<thead>
				<tr>
				  <th data-field="name">Name</th>
				  <th data-field="follower">Follower</th>
				  <th data-field="following">Following</th>
				  <th data-field="snippets">Snippets</th>
				</tr>
			</thead>
		</table>
-->





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
						<p class="m-0 text-center text-white">Copyright &copy; ATTABLE 2021</p>
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



<script>
  var $table = $('#table')

  $(function() {
    var data = [
    {
        "url": "categorie/promotions/promo1.png",
        "libelle": "MODIF Gateaux Milka en promotion 2€ pièce 5€ les 3",
        "prix": 2,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "00",
        "categorie": "Promotions"
    },
    {
        "url": "categorie/promotions/promo2.png",
        "libelle": "Crispeas en promotion 1€ les 2",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "01",
        "categorie": "Promotions"
    },
    {
        "url": "categorie/promotions/promo3.png",
        "libelle": "Miel en promotion 3€ 500g 5€ 2x500g",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "02",
        "categorie": "Promotions"
    },
    {
        "url": "categorie/promotions/promo4.png",
        "libelle": "Promotion sur tout le rayon gâteau en lot !",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "03",
        "categorie": "Promotions"
    },
    {
        "url": "categorie/promotions/promo5.png",
        "libelle": "promotion sur une multitude de produits en lot !",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "04",
        "categorie": "Promotions"
    },
    {
        "url": "categorie/boissons/boisson2.png",
        "libelle": "Jus pomme orange et boissons gazeuses",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "10000",
        "categorie": "Boissons"
    },
    {
        "url": "categorie/boissons/boisson3.png",
        "libelle": "Fanta Perrier et Sanpellegrino",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "10001",
        "categorie": "Boissons"
    },
    {
        "url": "categorie/boissons/boisson4.png",
        "libelle": "Jus pomme orange et boissons gazeuses",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "10002",
        "categorie": "Boissons"
    },
    {
        "url": "categorie/boissons/boisson5.png",
        "libelle": "Fanta Perrier et Sanpellegrino",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "10003",
        "categorie": "Boissons"
    },
    {
        "url": "categorie/boissons/boisson6.png",
        "libelle": "Essai Prix 0",
        "prix": 0,
        "texte": "Un test pour voir",
        "quantity": 0,
        "id": "10004",
        "categorie": "Boissons"
    },
    {
        "url": "categorie/boissons/fanta.jpg",
        "libelle": "Fanta",
        "prix": 0.5,
        "texte": "Une boisson râfraichissante",
        "quantity": 0,
        "id": "10005",
        "categorie": "Boissons"
    },
    {
        "url": "categorie/bonbons/bonbons1.png",
        "libelle": "Ribambel de bonbons",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "20000",
        "categorie": "Bonbons"
    },
    {
        "url": "categorie/bonbons/bonbons2.png",
        "libelle": "bonbons et barres chocolatés",
        "prix": 0.1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "20001",
        "categorie": "Bonbons"
    },
    {
        "url": "categorie/bonbons/bonbons3.png",
        "libelle": "bonbon au chocolat",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "20002",
        "categorie": "Bonbons"
    },
    {
        "url": "categorie/bonbons/bonbons4.png",
        "libelle": "Ribambel de bonbons",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "20003",
        "categorie": "Bonbons"
    },
    {
        "url": "categorie/bonbons/bonbons5.png",
        "libelle": "bonbons et barres chocolatés",
        "prix": 0.1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "20004",
        "categorie": "Bonbons"
    },
    {
        "url": "categorie/cafes/cafe1.png",
        "libelle": "Une multitude de de cafés",
        "prix": 2.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "30000",
        "categorie": "Cafés"
    },
    {
        "url": "categorie/cafes/cafe2.png",
        "libelle": "Café carte noir et autre",
        "prix": 2,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "30001",
        "categorie": "Cafés"
    },
    {
        "url": "categorie/cafes/cafe3.png",
        "libelle": "Café HOUSE",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "30002",
        "categorie": "Cafés"
    },
    {
        "url": "categorie/cafes/cafe4.png",
        "libelle": "Une multitude de de cafés",
        "prix": 2.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "30003",
        "categorie": "Cafés"
    },
    {
        "url": "categorie/cafes/cafe5.png",
        "libelle": "Café carte noir et autre",
        "prix": 2,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "30004",
        "categorie": "Cafés"
    },
    {
        "url": "categorie/chips/chips1.png",
        "libelle": "Variétés de chips",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "40000",
        "categorie": "Chips"
    },
    {
        "url": "categorie/chips/chips2.png",
        "libelle": "Curly",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "40001",
        "categorie": "Chips"
    },
    {
        "url": "categorie/chips/chips3.png",
        "libelle": "Popped",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "40002",
        "categorie": "Chips"
    },
    {
        "url": "categorie/chips/chips4.png",
        "libelle": "Variétés de chips",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "40003",
        "categorie": "Chips"
    },
    {
        "url": "categorie/chips/chips5.png",
        "libelle": "Curly",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "40004",
        "categorie": "Chips"
    },
    {
        "url": "categorie/chocolats/chocolat1.png",
        "libelle": "Nos chocolats Lindt DéliChoc",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "50000",
        "categorie": "Chocolats"
    },
    {
        "url": "categorie/chocolats/chocolat2.png",
        "libelle": "Cookies chocolat",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "50001",
        "categorie": "Chocolats"
    },
    {
        "url": "categorie/chocolats/chocolat3.png",
        "libelle": "Tablettes de chocolat",
        "prix": 2.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "50002",
        "categorie": "Chocolats"
    },
    {
        "url": "categorie/chocolats/chocolat4.png",
        "libelle": "Nos chocolats Lindt DéliChoc",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "50003",
        "categorie": "Chocolats"
    },
    {
        "url": "categorie/chocolats/chocolat5.png",
        "libelle": "Cookies chocolat",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "50004",
        "categorie": "Chocolats"
    },
    {
        "url": "categorie/conserves/conserves1.png",
        "libelle": "Nos différentes conserves",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "60000",
        "categorie": "Conserves"
    },
    {
        "url": "categorie/conserves/conserves2.png",
        "libelle": "Conserves de la mer",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "60001",
        "categorie": "Conserves"
    },
    {
        "url": "categorie/conserves/conserves3.png",
        "libelle": "Nos différentes conserves",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "60002",
        "categorie": "Conserves"
    },
    {
        "url": "categorie/conserves/conserves4.png",
        "libelle": "Conserves de la mer",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "60003",
        "categorie": "Conserves"
    },
    {
        "url": "categorie/conserves/conserves5.png",
        "libelle": "Nos différentes conserves",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "60004",
        "categorie": "Conserves"
    },
    {
        "url": "categorie/conserves/conserves5.png",
        "libelle": "Conserves de la mer",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "60005",
        "categorie": "Conserves"
    },
    {
        "url": "categorie/epiceriesalee/epiceriesal1.png",
        "libelle": "Epicerie sallée",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "70000",
        "categorie": "&Eacute;picerie salée"
    },
    {
        "url": "categorie/epiceriesalee/epiceriesal2.png",
        "libelle": "CrisPeas",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "70001",
        "categorie": "&Eacute;picerie salée"
    },
    {
        "url": "categorie/epiceriesalee/epiceriesal3.png",
        "libelle": "CrisPeas",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "70002",
        "categorie": "&Eacute;picerie salée"
    },
    {
        "url": "categorie/epiceriesalee/epiceriesal4.png",
        "libelle": "CrisPeas",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "70003",
        "categorie": "&Eacute;picerie salée"
    },
    {
        "url": "categorie/epiceriesalee/epiceriesal5.png",
        "libelle": "Epicerie sallée",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "70004",
        "categorie": "&Eacute;picerie salée"
    },
    {
        "url": "categorie/epiceriesucree/epiceriesuc1.png",
        "libelle": "Epicerie sucrée",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "80000",
        "categorie": "&Eacute;picerie sucrée"
    },
    {
        "url": "categorie/epiceriesucree/epiceriesuc2.png",
        "libelle": "Milka et Bounty",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "80001",
        "categorie": "&Eacute;picerie sucrée"
    },
    {
        "url": "categorie/epiceriesucree/epiceriesuc3.png",
        "libelle": "Madeleines",
        "prix": 0.2,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "80002",
        "categorie": "&Eacute;picerie sucrée"
    },
    {
        "url": "categorie/epiceriesucree/epiceriesuc4.png",
        "libelle": "Confiture",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "80003",
        "categorie": "&Eacute;picerie sucrée"
    },
    {
        "url": "categorie/epiceriesucree/epiceriesuc5.png",
        "libelle": "Miel",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "80004",
        "categorie": "&Eacute;picerie sucrée"
    },
    {
        "url": "categorie/epices/epices1.png",
        "libelle": "Des épices pour donner du goût à votre assiette !",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "90000",
        "categorie": "&Eacute;pices"
    },
    {
        "url": "categorie/epices/epices2.png",
        "libelle": "épices piquantes",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "90001",
        "categorie": "&Eacute;pices"
    },
    {
        "url": "categorie/epices/epices3.png",
        "libelle": "Des épices pour donner du goût à votre assiette !",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "90002",
        "categorie": "&Eacute;pices"
    },
    {
        "url": "categorie/epices/epices4.png",
        "libelle": "épices piquantes",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "90003",
        "categorie": "&Eacute;pices"
    },
    {
        "url": "categorie/epices/epices5.png",
        "libelle": "Des épices pour donner du goût à votre assiette !",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "90004",
        "categorie": "&Eacute;pices"
    },
    {
        "url": "categorie/farines/farines1.png",
        "libelle": "Farine",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "100000",
        "categorie": "Farines"
    },
    {
        "url": "categorie/farines/farines2.png",
        "libelle": "Farine",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "100001",
        "categorie": "Farines"
    },
    {
        "url": "categorie/farines/farines3.png",
        "libelle": "Farine",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "100002",
        "categorie": "Farines"
    },
    {
        "url": "categorie/farines/farines4.png",
        "libelle": "Farine",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "100003",
        "categorie": "Farines"
    },
    {
        "url": "categorie/farines/farines5.png",
        "libelle": "Farine",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "100004",
        "categorie": "Farines"
    },
    {
        "url": "categorie/fruitssecs/fruitsecs1.png",
        "libelle": "Notre excellente gamme de fruits secs",
        "prix": 3.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "110000",
        "categorie": "Fruits secs"
    },
    {
        "url": "categorie/fruitssecs/fruitsecs2.png",
        "libelle": "Fruits secs Vahiné",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "110001",
        "categorie": "Fruits secs"
    },
    {
        "url": "categorie/fruitssecs/fruitsecs3.png",
        "libelle": "Notre excellente gamme de fruits secs",
        "prix": 3.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "110002",
        "categorie": "Fruits secs"
    },
    {
        "url": "categorie/fruitssecs/fruitsecs4.png",
        "libelle": "Fruits secs Vahiné",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "110003",
        "categorie": "Fruits secs"
    },
    {
        "url": "categorie/fruitssecs/fruitsecs5.png",
        "libelle": "Notre excellente gamme de fruits secs",
        "prix": 3.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "110004",
        "categorie": "Fruits secs"
    },
    {
        "url": "categorie/gateaux/gateau1.png",
        "libelle": "Notre large gamme de gâteaux",
        "prix": 2,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "120000",
        "categorie": "Gâteaux"
    },
    {
        "url": "categorie/gateaux/gateau2.png",
        "libelle": "Gâteaux et sablés",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "120001",
        "categorie": "Gâteaux"
    },
    {
        "url": "categorie/gateaux/gateau3.png",
        "libelle": "Gâteaux au chocolat",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "120002",
        "categorie": "Gâteaux"
    },
    {
        "url": "categorie/gateaux/gateau4.png",
        "libelle": "BN",
        "prix": 2.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "120003",
        "categorie": "Gâteaux"
    },
    {
        "url": "categorie/gateaux/gateau5.png",
        "libelle": "Gâteaux briochés",
        "prix": 1,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "120004",
        "categorie": "Gâteaux"
    },
    {
        "url": "categorie/hygiene/hygiene1.png",
        "libelle": "Notre lessive",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "130000",
        "categorie": "Hygiène"
    },
    {
        "url": "categorie/hygiene/hygiene2.png",
        "libelle": "Nos produits pour le corps",
        "prix": 2,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "130001",
        "categorie": "Hygiène"
    },
    {
        "url": "categorie/hygiene/hygiene3.png",
        "libelle": "Notre lessive",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "130002",
        "categorie": "Hygiène"
    },
    {
        "url": "categorie/hygiene/hygiene4.png",
        "libelle": "Nos produits pour le corps",
        "prix": 2,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "130003",
        "categorie": "Hygiène"
    },
    {
        "url": "categorie/hygiene/hygiene5.png",
        "libelle": "Notre lessive",
        "prix": 3,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "130004",
        "categorie": "Hygiène"
    },
    {
        "url": "categorie/legumessecs/legumesecs1.png",
        "libelle": "Quelques légumes secs...",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "140000",
        "categorie": "Légumes secs"
    },
    {
        "url": "categorie/legumessecs/legumesecs2.png",
        "libelle": "Quelques légumes secs...",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "140001",
        "categorie": "Légumes secs"
    },
    {
        "url": "categorie/legumessecs/legumesecs3.png",
        "libelle": "Quelques légumes secs...",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "140002",
        "categorie": "Légumes secs"
    },
    {
        "url": "categorie/legumessecs/legumesecs4.png",
        "libelle": "Quelques légumes secs...",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "140003",
        "categorie": "Légumes secs"
    },
    {
        "url": "categorie/legumessecs/legumesecs5.png",
        "libelle": "Quelques légumes secs...",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "140004",
        "categorie": "Légumes secs"
    },
    {
        "url": "categorie/legumessecs/legumesecs6.png",
        "libelle": "Quelques légumes secs...",
        "prix": 0.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "140005",
        "categorie": "Légumes secs"
    },
    {
        "url": "categorie/thes/the1.png",
        "libelle": "Notre variété de thé",
        "prix": 1.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "150000",
        "categorie": "Thés"
    },
    {
        "url": "categorie/thes/the2.png",
        "libelle": "Thé intense",
        "prix": 2.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "150001",
        "categorie": "Thés"
    },
    {
        "url": "categorie/thes/the3.png",
        "libelle": "Notre variété de thé",
        "prix": 1.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "150002",
        "categorie": "Thés"
    },
    {
        "url": "categorie/thes/the4.png",
        "libelle": "Thé intense",
        "prix": 2.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "150003",
        "categorie": "Thés"
    },
    {
        "url": "categorie/thes/the5.png",
        "libelle": "Notre variété de thé",
        "prix": 1.5,
        "texte": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        "quantity": 0,
        "id": "150004",
        "categorie": "Thés"
    }
]
    $table.bootstrapTable({data: data})
  })
</script>

	</body>
</html>