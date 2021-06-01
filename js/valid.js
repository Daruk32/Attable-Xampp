//Fonction pour le formulaire de connection avec conservation des informations sous forme de cookies
function verif_form_connexion() {
 var mail = document.getElementById("email");
 var mdp = document.getElementById("mdp");
if (mail.value !="" && mdp.value!="")
  {var message = alert("Connexion réussie !"); }

document.getElementById("bouton").innerHTML=message;

window.location.href='index.html';

createCookie("mail",email.value,"20");
createCookie("mdp",mdp.value,"20");
}


//Fonction pour le formulaire d'inscription avec conservation des informations sous forme de cookies
function verif_form_inscription() {
  var civil = document.getElementById("civil");
  var firstname = document.getElementById("firstname");
  var name = document.getElementById("name");
  var adress = document.getElementById("adress");
  var codepostal = document.getElementById("codepostal");
  var city = document.getElementById("city");
  var mail = document.getElementById("email");
  var mdp = document.getElementById("mdp");

  if (mail.value !="" && mdp.value!="")
   {var message = alert("Succès, merci de votre inscription !"); }
 
 document.getElementById("bouton").innerHTML=message;
 
 window.location.href='index.html';

 createCookie("civil",civil.value,"20");
 createCookie("firstname",firstname.value,"20");
 createCookie("name",name.value,"20");
 createCookie("adress",adress.value,"20");
 createCookie("codepostal",codepostal.value,"20");
 createCookie("city",city.value,"20");
 createCookie("mail",email.value,"20");
 createCookie("mdp",mdp.value,"20");

 }



//Fonction pour le formulaire de modification des informations avec conservation des informations sous forme de cookies
function verif_form_modification() {
  var firstname = document.getElementById("firstname");
  var name = document.getElementById("name");
  var adress = document.getElementById("adress");
  var codepostal = document.getElementById("codepostal");
  var city = document.getElementById("city");
  var mail = document.getElementById("email");
  var mdp = document.getElementById("mdp");

  if (mail.value !="" && mdp.value!="")
   {var message = alert("Modifications réussies et bien enregistrées !"); }
 
 
 document.getElementById("bouton").innerHTML=message;
 
 createCookie("firstname",firstname.value,"20");
 createCookie("name",name.value,"20");
 createCookie("adress",adress.value,"20");
 createCookie("codepostal",codepostal.value,"20");
 createCookie("city",city.value,"20");
 createCookie("mail",email.value,"20");
 createCookie("mdp",mdp.value,"20");

 } 