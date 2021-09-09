//Promotions
import {tab_promo} from '.././categorie/Promotions/Promotions.js'



//Génération dynamique du Slideshow pour 5 éléments
window.create_slideshow = function create_slideshow() {
  for ( let cat_index = 0; cat_index < 5; cat_index++) {
    var pre = "<div class='mySlides fade'><a href='panier.html'><img src='";
    var mid1 = tab_promo[cat_index].url;
    var mid2 = "' class='slide1'><div class='text'>";
    var mid3 = tab_promo[cat_index].libelle;
    var mid4 = "</div></a></div>";
  
    document.getElementById("slideshow-container").innerHTML+=pre+mid1+mid2+mid3+mid4;
  }
}


//Fonctionnement du Slideshow
var slideIndex = 0;

window.showSlides = function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3500); // Change image every 2 seconds
}



/*
//Fonction de génération du slideshow
window.gen_carous = function gen_carous() {
    var longueur = tab_categorie[0].length;

    for ( let cat_index = 1; cat_index < longueur; cat_index++) {

        if (longueur == 0) {
            document.getElementById("gen-slides").innerHTML+="";
        }
        else {

            var pre = "<div class='carousel-item'><img class='d-block w-100 produit img-fluid' src='";
            var mid1 = tab_categorie[0][cat_index].url;
            var mid2 ="' alt='...'><div class='carousel-caption'><h4 class='text-center'>";
            var mid3 = tab_categorie[0][cat_index].libelle;
            var mid4 = "</h4></div></div>";			

            document.getElementById("gen-slides").innerHTML+=pre+mid1+mid2+mid3+mid4;

        }

    }
}

*/