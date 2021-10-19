const firebaseConfig = {
    apiKey: "AIzaSyBojMuKZJSJBC-O6JRkI9UmbjErGka1b1E",
    authDomain: "attable-51633.firebaseapp.com",
    projectId: "attable-51633",
    databaseURL: "https://attable-51633-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "attable-51633.appspot.com",
    messagingSenderId: "255390814899",
    appId: "1:255390814899:web:714ec5ace61cd6479796c6",
    measurementId: "G-2DZWXDMSY6"

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


var ref, nom, price, quantities;

function SelectAllData() {
    firebase.database().ref("products").once('value',
        function (AllRecords) {
            AllRecords.forEach(
                function (CurrentRecord) {
                    ref = CurrentRecord.val().id;
                    nom = CurrentRecord.val().libelle;
                    price = CurrentRecord.val().prix;
                    quantities = CurrentRecord.val().quantity;

                    AddItemsToTable(ref, nom, price, quantities);
                }
            );
        });
}

window.onload = SelectAllData;

function AddItemsToTable(ref, nom, price, quantities) {
    var tbody = document.getElementById("tbody1");
    var trow = document.createElement("tr");
    var td0 = document.createElement("input");
    td0.setAttribute("type", "checkbox");
    var td1 = document.createElement("td");
    td1.className = "text-center";
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    td3.className = "text-center";
    var td4 = document.createElement("td");
    td4.className = "text-center";
    var td5 = document.createElement("td");
    td5.className = "text-center";
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
    td3.innerHTML = price;
    td4.innerHTML = quantities;
    trow.appendChild(td0); trow.appendChild(td1); trow.appendChild(td2); trow.appendChild(td3); trow.appendChild(td4); trow.appendChild(td5); trow.appendChild(td6);
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






/*
// Appel des tableaux JSON de Firebase
const db = firebase.database().ref();
const products = db.child("products/id");
const categories = db.child("categories/id");
const suppliers = db.child("suppliers/id");
// Exemples de fonctions
eventsRef.orderFunction().queryFunction();
eventsRef.orderByKey().limitToFirst(10);
eventsRef.orderByChild();
eventsRef.orderByValue();
startAt('value');
endAt('value');
equalTo('child_key');
limitToFirst(10);
limitToLast(10);
// Exemple
const db = firebase.database();
const products = db.child("products/id");
const query = products
                .orderByChild('id')
                .equalTo('value_example')
                .limitToFirst(1);
query.on('value', snap => {
    //render to HTML
});
*/



