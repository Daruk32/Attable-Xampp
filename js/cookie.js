function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	}
	else var expires = "";
	document.cookie = name + "=" + value + expires + "; path=/" + ';';
}


function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}


function eraseCookie(name) {
	createCookie(name, "", -1);
}


var controleInfo;
var charactersForbidden = ["&", "<", ">", "%", "/", "<script>", "\"", "'"];
function controleCharacter() {
	let elements = document.getElementsByName("control");
	for (let i = 0; i < elements.length; i++) {
		var element = elements[i].value.toString();
		for (let y = 0; y < element.length; y++) {
			for (let z = 0; z < charactersForbidden.length; z++) {
				if (element[y] == charactersForbidden[z]) {
					alert(element[y]+ " est un caractère interdit !")
					controleInfo = 1;
					return controleInfo;
				}
			}
		}
	}
}