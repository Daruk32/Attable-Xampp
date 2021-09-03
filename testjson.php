<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<title>Accueil</title>

		<link rel="stylesheet" href="css\attable.css">
		<link rel="stylesheet" href="css\footer.css">
 
		<!-- Bootstrap core JS - MAJ FOCNTIONNELLE-->
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
		<script src="https://unpkg.com/tableexport.jquery.plugin/tableExport.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
		
		<!-- Bootstrap Table Style -->
		<link href="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.css" rel="stylesheet">
		<!-- Bootstrap Table JS-->
		<script src="https://unpkg.com/bootstrap-table@1.18.3/dist/bootstrap-table.min.js"></script>


		
		<script src="js/data.js" type="module"></script>
		
	</head>
	
	<body>
	
		<section>

			<!--
			<table
				id="table"
				>
				<thead>
					<tr>
						<th data-field="id">ID</th>
						<th data-field="libelle">Item Name</th>
						<th data-field="prix">Item Price</th>
					</tr>
				</thead>
			</table>
-->

<table
  id="table"
  data-toggle="table"
  data-url="bddproducts.json">
  <thead>
    <tr>
      <th data-field="id">ID</th>
      <th data-field="libelle">Nom</th>
      <th data-field="prix">Prix</th>
    </tr>
  </thead>
</table>





		</section>
<!--		
		<script>
			var $table = $('#table')
		  
			$(function() {
			  var data = [
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
		  }
		  ]
			  $table.bootstrapTable({data: data})
			})
		</script>
		-->
	</body>
	
</html>