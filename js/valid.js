function validate_password() {
  var myInput = document.getElementById("mdp");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var special = document.getElementById("special");
  var length = document.getElementById("length");

  // When the user clicks on the password field, show the message box
  myInput.onfocus = function () {
    document.getElementById("message").style.display = "block";
  }

  // When the user starts to type something inside the password field
  myInput.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
      number.classList.remove("invalid");
      number.classList.add("valid");
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    // Validate specials
    var specials = /[^a-zA-Z\d]/g;
    if (myInput.value.match(specials)) {
      special.classList.remove("invalid");
      special.classList.add("valid");
    } else {
      special.classList.remove("valid");
      special.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 6) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }
}



// Fonction Connexion 
function login() {
  if (controleCharacter() == 1) {
    location.reload();
    return;
  }

  var inputElements = document.getElementById('flexCheckDefault');
  if (inputElements.checked) {
    const email = document.getElementById("email").value;
    const password = document.getElementById("mdp").value;
    var ids = [email, password];
    var ids_json = JSON.stringify(ids);
    createCookie("info_cnx", ids_json, 3);
  }
  else {
    createCookie("info_cnx", ids_json, 3);
  }

  firebase.auth().signInWithEmailAndPassword(email, password);

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var cookieStatut = {
        userName: email,
        statut: true
      };
      createCookie("statut_cnx", JSON.stringify(cookieStatut), 7);
      location.replace("admin.html");
    }
  })
}

// Fonction Déconnexion
function logout() {
  firebase.auth().signOut().then(() => {
    console.log("user signed out");
    eraseCookie("info_cnx");
    // Sign-out successful.
  }).catch((error) => {
    console.log("error");
    // An error happened.
  });
}

// Fonction déconnexion si cookie expiré
if (readCookie("info_cnx") == null) {
  logout();
}


// Fonction contrôle des caractères 
function verif_form_modification() {
  if (controleCharacter() == 1) {
    location.reload();
    return;
  }
}


