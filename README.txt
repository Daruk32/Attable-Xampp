







/!\ FIREBASE - Pour exporter les données vers Firebase /!\
Rajouter le code ci-dessous :
- 1 : inclure les scripts CDN liés aux fonctions de Firebase.

  <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
  <!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
  <!-- Add Firebase products that you want to use -->
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-firestore.js"></script>
  <!--test temps réel-->
  <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>

- 2 : renseigner les identifiants redirigeant les data vers la BDD du compte Firebase/Google dans un script

	const firebaseConfig = {
	
	};

3 : Initialiser Firebase dans le script et les fonctions d'export de la BDD json vers les 2 types de stockage
En premier, (firebase.database().ref('products/'+idF).set({) exporte vers la Realtime Database
En second, (productscollection.doc(idF).set({) exporte vers la Firestore Database

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	const db = firebase.firestore();
	var retrievedObject = JSON.parse(localStorage.getItem('bddproducts'));
	var urlF, libelleF, prixF, texteF, quantityF, idF, categorieF;
	var productscollection = db.collection('products');
	
	function Ready() {
		for (let num = 0; num < retrievedObject.length; num++) {
			urlF = retrievedObject[num].url;
			libelleF = retrievedObject[num].libelle;
			prixF = retrievedObject[num].prix;
			texteF = retrievedObject[num].texte;
			quantityF = retrievedObject[num].quantity;
			idF = retrievedObject[num].id;
			categorieF = retrievedObject[num].categorie;

			firebase.database().ref('products/'+idF).set({
				url: urlF,
				libelle: libelleF,
				prix: prixF,
				texte: texteF,
				quantity: quantityF,
				id: idF,
				categorie: categorieF
			});

			productscollection.doc(idF).set({
				url: urlF,
				libelle: libelleF,
				prix: prixF,
				texte: texteF,
				quantity: quantityF,
				id: idF,
				categorie: categorieF
			});
		}	
	}
	document.getElementById('test').onclick = function() {
		Ready();
	}



=============================================== CODE COMPLET A INTRODUIRE AVANT LA FIN DU BODY ====================================================

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
	const db = firebase.firestore();
	var retrievedObject = JSON.parse(localStorage.getItem('bddproducts'));
	var urlF, libelleF, prixF, texteF, quantityF, idF, categorieF;
	var productscollection = db.collection('products');
	
	function Ready() {
		for (let num = 0; num < retrievedObject.length; num++) {
			urlF = retrievedObject[num].url;
			libelleF = retrievedObject[num].libelle;
			prixF = retrievedObject[num].prix;
			texteF = retrievedObject[num].texte;
			quantityF = retrievedObject[num].quantity;
			idF = retrievedObject[num].id;
			categorieF = retrievedObject[num].categorie;

			firebase.database().ref('products/'+idF).set({
				url: urlF,
				libelle: libelleF,
				prix: prixF,
				texte: texteF,
				quantity: quantityF,
				id: idF,
				categorie: categorieF
			});

			productscollection.doc(idF).set({
				url: urlF,
				libelle: libelleF,
				prix: prixF,
				texte: texteF,
				quantity: quantityF,
				id: idF,
				categorie: categorieF
			});
		}	
	}
	document.getElementById('test').onclick = function() {
		Ready();
	}

==================================================================================================================================================




