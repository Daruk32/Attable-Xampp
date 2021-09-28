//Fonction de génération d'un Captcha textuel
function Captcha(){
  var alpha = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z');
  var i;
  for (i=0;i<6;i++){
    var a = alpha[Math.floor(Math.random() * alpha.length)];
    var b = alpha[Math.floor(Math.random() * alpha.length)];
    var c = alpha[Math.floor(Math.random() * alpha.length)];
    var d = alpha[Math.floor(Math.random() * alpha.length)];
    var e = alpha[Math.floor(Math.random() * alpha.length)];
    var f = alpha[Math.floor(Math.random() * alpha.length)];
    var g = alpha[Math.floor(Math.random() * alpha.length)];
    }
  var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
  document.getElementById("mainCaptcha").value = code
}

//Fonction de validation du captcha de la désinscription - mailing list
function ValidCaptcha(){
  if (controleCharacter() == 1) {
    console.log("C'est interdit !");
    location.reload();
    return;
  }
  
  var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
  var string2 = removeSpaces(document.getElementById('txtInput').value);
  if (string1 == string2){
    return "Votre désinscription a bien été enregistrée !";
  }
  else{        
    return "Recommencez ! (si vous n'êtes pas un robot)";
  }
}

//Fonction de validation du captcha de l'inscription - mailing list
function ValidCaptcha2(){
  if (controleCharacter() == 1) {
    console.log("C'est interdit !");
    location.reload();
    return;
  }

  var string1 = removeSpaces(document.getElementById('mainCaptcha').value);
  var string2 = removeSpaces(document.getElementById('txtInput').value);
  if (string1 == string2){
    return "Votre inscription a bien été enregistrée !";
  }
  else{        
    return "Recommencez ! (si vous n'êtes pas un robot)";
  }
}


function removeSpaces(string){
  return string.split(' ').join('');
}