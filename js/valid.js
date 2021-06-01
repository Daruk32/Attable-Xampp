/*
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
*/

function validate_password() {
  var myInput = document.getElementById("mdp");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var special = document.getElementById("special");
  var length = document.getElementById("length");
  
  // When the user clicks on the password field, show the message box
  myInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
  }
  
  // When the user clicks outside of the password field, hide the message box
  myInput.onblur = function() {
    document.getElementById("message").style.display = "none";
  }
  
  // When the user starts to type something inside the password field
  myInput.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if(myInput.value.match(lowerCaseLetters)) {  
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
    
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if(myInput.value.match(upperCaseLetters)) {  
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
  
    // Validate numbers
    var numbers = /[0-9]/g;
    if(myInput.value.match(numbers)) {  
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate specials
    var specials = /[^a-zA-Z\d]/g;
    if(myInput.value.match(specials)) {  
      special.classList.remove("invalid");
      special.classList.add("valid");
    } else {
      special.classList.remove("valid");
      special.classList.add("invalid");
    }    

    // Validate length
    if(myInput.value.length >= 6) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }
} 

