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




function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("mdp").value;
  firebase.auth().signInWithEmailAndPassword(email, password);
  createCookie("session", "yoursession", 2);
}

function logout() {
  firebase.auth().signOut().then(() => {
    console.log("user signed out");
    eraseCookie("session");
    // Sign-out successful.
  }).catch((error) => {4
    console.log("error");
    // An error happened.
  });
}


if (readCookie("session") == null) {
	logout();
}
