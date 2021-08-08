console.log("chargement fichier debug.js");
var a_js =159;//défini de façon globale
console.info("valeur de a_js de debug.js : "+a_js);

function affiche_info_js(param) {
    if (param!=undefined) {
    document.getElementById("resultclic").innerHTML+=param;
    document.getElementById("resultclic").innerHTML+="-debug.js valeur de a_js : "+a_js+"<br>";
    document.getElementById("resultclic").innerHTML+="-debug.js valeur de a_globale : "+a_globale+"<br>"; 
    } else {
        document.getElementById("resultclic").innerHTML+="-debug.js valeur de a_js : "+a_js+"<br>";
        document.getElementById("resultclic").innerHTML+="-debug.js valeur de a_globale : "+a_globale+"<br>";  
    }
    
}
function modifDATA_js() {
    a_js+=700;
    a_globale+=700;
    affiche_info_js("<br>Après modifDATA_js : <br>")   
}