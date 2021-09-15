<!DOCTYPE html>
<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<title>Accueil</title>

		<link rel="stylesheet" href="css\attable.css">
		<link rel="stylesheet" href="css\booststrap.css">
		<link rel="stylesheet" href="css\footer.css">

 
		<!-- Bootstrap core JS - MAJ FONCTIONNELLE-->
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

		<!--<script src="js/data.js" type="module"></script>-->

		
	</head>
	
	<body>
	<!--
		<section>

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
-->

		<!--Test Firebase-->
		Name <input id='namebox' type='text'></input> <br><br>
		Roll No <input id='rollbox' type='text'></input> <br><br>
		Section <input id='secbox' type='text'></input> <br><br>
		Gender <input id='genbox' type='text'></input> <br><br>
		<br><br>
		<button id='insert'>INSERT</button>
		<button id='select'>SELECT</button>
		<button id='update'>UPDATE</button>
		<button id='delete'>DELETE</button>



  <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->

  <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
  <!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
  <!-- Add Firebase products that you want to use -->
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
  <!--test temps réel-->
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>

	<script id='MainScript' type="module">
		// Import the functions you need from the SDKs you need
		import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
		// TODO: Add SDKs for Firebase products that you want to use
		// https://firebase.google.com/docs/web/setup#available-libraries
		// Your web app's Firebase configuration
		// For Firebase JS SDK v7.20.0 and later, measurementId is optional
		const firebaseConfig = {
			apiKey: "AIzaSyBojMuKZJSJBC-O6JRkI9UmbjErGka1b1E",
			authDomain: "attable-51633.firebaseapp.com",
			projectId: "attable-51633",
			databaseURL: "https://attable-51633-default-rtdb.europe-west1.firebasedatabase.app",
			storageBucket: "attable-51633.appspot.com",
			messagingSenderId: "255390814899",
			appId: "1:255390814899:web:714ec5ace61cd6479796c6",
			measurementId: "G-2DZWXDMSY6"
		};
		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);

		var nameV, rollV, secV, genV;
		function Ready() {
			nameV = document.getElementById('namebox').value;
			rollV = document.getElementById('rollbox').value;
			secV = document.getElementById('secbox').value;
			genV = document.getElementById('genbox').value;
		}
		document.getElementById('insert').onclick = function() {
			Ready();
			firebase.database().ref('student/'+rollV).set({
				NameOfStudent: nameV,
				RollNo: rollV,
				Section: secV,
				Gender: genV
			});
		}

	</script>


	
	</body>
	
</html>