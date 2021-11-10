/*
Auteur : Johan GIROUX
2020-2021
Dernière MAJ : 30/10/2021
V2.9
*/


var ref, nom, valeur;

function SelectAllData() {
    firebase.database().ref("categories").once('value',
        function (AllRecords) {
            AllRecords.forEach(
                function (CurrentRecord) {
                    ref = CurrentRecord.val().id;
                    nom = CurrentRecord.val().nom;
                    valeur = CurrentRecord.val().valeur;

                    AddItemsToTable(ref, nom, valeur);
                }
            );
        });
}

window.onload = SelectAllData;

function AddItemsToTable(ref, nom, valeur) {
    var tbody = document.getElementById("tbody1");
    var trow = document.createElement("tr");
    var td0 = document.createElement("input");
    td0.setAttribute("type", "checkbox");
    var td1 = document.createElement("td");
    td1.className = "text-center";
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    td3.className = "text-center";
    var td6 = document.createElement("td");
    var td6a = document.createElement("a");
    td6a.className = "text-center remove";
    td6a.title = "Remove";
    td6.appendChild(td6a);
    var td6i = document.createElement("i");
    td6.className = "fa fa-trash";
    td6.href = "javascript:void(0)";
    td6a.appendChild(td6i);
    td1.innerHTML = ref;
    td2.innerHTML = nom;
    td3.innerHTML = valeur;
    trow.appendChild(td0); trow.appendChild(td1); trow.appendChild(td2); trow.appendChild(td3); trow.appendChild(td6);
    tbody.appendChild(trow);
}

firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        location.replace("authentification.html")
    }
})

function Maj() {
    location.reload();
}