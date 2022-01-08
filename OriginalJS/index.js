/*
Auteur : Johan GIROUX
2020-2021
Dernière MAJ : 30/10/2021
V2.9
*/


//Sélection des datas relatives aux catégories depuis firebase ou le localstorage et création de la page
var categoriesArray = new Array;
firebase.database().ref("categories/").on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var productID = childSnapshot.val().idC;
        var productName = childSnapshot.val().nom;
        var productValue = childSnapshot.val().valeur;
        var productLink = childSnapshot.val().Link;
        var ajoutC = { 'id': productID, 'name': productName, 'valeur': productValue, 'url': productLink };
        categoriesArray.push(ajoutC);
    });
    localStorage.setItem("categoriesSelected", JSON.stringify(categoriesArray));

    //Création de la div mère
    var section = document.getElementById('tab_categs');
    var divmere = document.createElement('div');
    divmere.className = "container liste_categorie px-4 px-lg-5 mt-5";
    section.appendChild(divmere);
    //Création du titre du menu des catégories
    var titreh3 = document.createElement('h3');
    titreh3.innerHTML = "Les catégories de produit que l'on s'arrache";
    divmere.appendChild(titreh3);
    //Création du menu des catégories
    var divfille = document.createElement('div');
    divfille.className = "row row-cols-2 row-cols-md-3 row-cols-xl-4";
    divfille.id = "tableau_image_categorie";
    divmere.appendChild(divfille);

    categoriesArray.forEach(function (item) {
        //Div categ contenant divimg et divtext
        var divcateg = document.createElement('div');
        divcateg.className = "card_cat";
        divfille.appendChild(divcateg);
        //divimg contenant l'image de la catégorie
        var divimg = document.createElement('div');
        divimg.className = "card text-center";
        divimg.id = "index-box";
        divimg.addEventListener("click", function (e) {
            window.location.href = "categorie.html?categorie=" + item.name;
        }, false);
        divcateg.appendChild(divimg);
        //Image de la catégorie
        var image_categorie = document.createElement('img')
        image_categorie.className = "card-img-top img-fluid cats lozad";
        image_categorie.src = item.url;
        image_categorie.alt = '...';
        divimg.appendChild(image_categorie);
        //divtext contenant le texte de la catégorie
        var divtext = document.createElement('div');
        divtext.className = "card-body p-4 text-center";
        divcateg.appendChild(divtext);
        //Texte de la catégorie
        var text_categorie = document.createElement('h5')
        text_categorie.className = "fw-bolder";
        text_categorie.innerHTML = item.name;
        divtext.appendChild(text_categorie);
    });
});

// Event lozad
const observer = lozad('.lozad', {
    rootMargin: '10px 0px', // syntax similar to that of CSS Margin
    threshold: 0.1, // ratio of element convergence
    enableAutoReload: true // it will reload the new image when validating attributes changes
});
observer.observe();