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


var ref, nom, info1, info2, adress, price;

function SelectAllData() {
    firebase.database().ref("suppliers").once('value',
        function (AllRecords) {
            AllRecords.forEach(
                function (CurrentRecord) {
                    ref = CurrentRecord.val().id;
                    nom = CurrentRecord.val().nom;
                    info1 = CurrentRecord.val().info1;
                    info2 = CurrentRecord.val().info2;
                    adress = CurrentRecord.val().adresse;
                    price = CurrentRecord.val().prix;

                    AddItemsToTable(ref, nom, info1, info2, adress, price);
                }
            );
        });
}

window.onload = SelectAllData;

function AddItemsToTable(ref, nom, info1, info2, adress, price) {
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
    td6.className = "text-center";
    var td8 = document.createElement("td");
    var td8a = document.createElement("a");
    td8a.className = "text-center remove";
    td8a.title = "Remove";
    td8.appendChild(td8a);
    var td8i = document.createElement("i");
    td8.className = "fa fa-trash";
    td8.href = "javascript:void(0)";
    td8a.appendChild(td8i);
    td1.innerHTML = ref;
    td2.innerHTML = nom;
    td3.innerHTML = info1;
    td4.innerHTML = info2;
    td5.innerHTML = adress;
    td6.innerHTML = price;
    trow.appendChild(td0); trow.appendChild(td1); trow.appendChild(td2); trow.appendChild(td3); trow.appendChild(td4); trow.appendChild(td5); trow.appendChild(td6); trow.appendChild(td8);
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