/*
Auteur : Johan GIROUX
2020-2021
Dernière MAJ : 30/10/2021
V2.9
*/




//V3-BackEnd - Fonction de génération du bandeau des pages - categorie.html + panier.html
window.bandeau = function bandeau() {
    var categorieList = JSON.parse(localStorage.getItem("categoriesSelected"));
    var bande = document.getElementById("bande");

    categorieList.forEach(function (item) {
        var divbandeau = document.createElement('li')
        divbandeau.className = "nav-item text-center";
        bande.appendChild(divbandeau);

        var acat = document.createElement('a')
        acat.className = "nav-link";
        acat.addEventListener("click", function (e) {
            window.location.href = "categorie.html?categorie=" + item.name;
        }, false);
        acat.innerHTML = item.name;
        divbandeau.appendChild(acat);
    });
}




//Fonctions de rechargement du logo et du css sur la page index.html | Désactivées car inutiles/à refaire
/*
//Génération du logo avec Localstorage pour la page Index
window.genlogo = function genlogo() {
    var test = "<img src='images/attable_logo2.png' class='img-fluid' alt='monlogo' id='lelogo'>";
    localStorage.setItem("logoimg", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(test))));
    var urllogo = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("logoimg"))));
    document.getElementById("logo").innerHTML = urllogo;
}
*/
/*
//Génération des styles avec Localstorage pour la page CGU
window.gencss = function gencss() {
    var css = "<link rel='stylesheet' href='css/attable.css'>";
    localStorage.setItem("stylecss", JSON.stringify(CryptoJS.enc.Utf16.parse(JSON.stringify(css))));
    var cssstyle = JSON.parse(CryptoJS.enc.Utf16.stringify(JSON.parse(localStorage.getItem("stylecss"))));
    document.getElementById("headtest").innerHTML += cssstyle;
}
*/
