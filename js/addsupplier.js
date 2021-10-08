// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBojMuKZJSJBC-O6JRkI9UmbjErGka1b1E",
    authDomain: "attable-51633.firebaseapp.com",
    projectId: "attable-51633",
    databaseURL: "https://attable-51633-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "attable-51633.appspot.com",
    messagingSenderId: "255390814899",
    appId: "1:255390814899:web:714ec5ace61cd6479796c6",
    measurementId: "G-2DZWXDMSY6"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        location.replace("authentification.html")
    }
});

//Récupération des datas du produit renseigné
var id, libelle, legend_P1, short_legend, descriptive, price, quantity, categorie;
function Ready() {
    idP = document.getElementById("id").value;
    libelleP = document.getElementById("name").value;
    legend_P1P = document.getElementById("legend_P1").value;
    short_legendP = document.getElementById("short_legend").value;
    descriptiveP = document.getElementById("descriptive").value;
    priceP = document.getElementById("price").value;
    quantityP = document.getElementById("quantity").value;
    //categorieP = document.getElementById("categ").value;
}

//Clear
function Clear() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("legend_P1").value = "";
    document.getElementById("short_legend").value = "";
    document.getElementById("descriptive").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
}

//Ajout d'un produit
document.getElementById("AddProduct").onclick = function () {
    Ready();
    firebase.database().ref("products/" + idP).set({
        id: idP,
        libelle: libelleP,
        texte: legend_P1P,
        short_legend: short_legendP,
        descriptive: descriptiveP,
        prix: priceP,
        quantity: quantityP
    });
    Swal.fire({
        title: 'Bravo !',
        text: 'Votre produit a été ajouté !',
        icon: 'success',
        confirmButtonText: 'Cool'
    });
    Clear();
}

//Sélection d'un produit
document.getElementById("SelectProduct").onclick = function () {
    Ready();
    firebase.database().ref("products/" + idP).on('value', function (snapshot) {
        if (snapshot.val() == null || idP == "") {
            Swal.fire({
                title: '???',
                text: "Ce produit n'existe pas !",
                icon: 'error',
                confirmButtonText: 'Où me suis-je trompé ?'
            });
        }
        else {
            document.getElementById("id").value = snapshot.val().id;
            document.getElementById("name").value = snapshot.val().libelle;
            document.getElementById("legend_P1").value = snapshot.val().texte;
            document.getElementById("short_legend").short_legend = snapshot.val().short_legend;
            document.getElementById("descriptive").value = snapshot.val().descriptive;
            document.getElementById("price").value = snapshot.val().prix;
            document.getElementById("quantity").value = snapshot.val().quantity;

            Swal.fire({
                title: 'Voilà !',
                text: 'Votre produit',
                icon: 'info',
                confirmButtonText: 'Continuer'
            });
        }
    });
}

//MAJ d'un produit
document.getElementById("UpdateProduct").onclick = function () {
    Ready();


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Êtes-vous certain de vos modifications ?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, modifie !',
        cancelButtonText: 'Non, annule !',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            firebase.database().ref("products/" + idP).update({
                id: idP,
                libelle: libelleP,
                texte: legend_P1P,
                short_legend: short_legendP,
                descriptive: descriptiveP,
                prix: priceP,
                quantity: quantityP
            });
            swalWithBootstrapButtons.fire(
                'Modifié !',
                'Les modifications sont enregistrées !',
                'success'
            )
            Clear();
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Annulé',
                "Qu'avez-vous oublié ?",
                'error'
            )
        }
    })
}


//Suppression d'un produit
document.getElementById("DeleteProduct").onclick = function () {
    Ready();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Êtes-vous certain de vouloir supprimer ce produit ?',
        text: "C'est irréversible !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprime le !',
        cancelButtonText: 'Non, annule tout !',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            firebase.database().ref("products/" + idP).remove();
            swalWithBootstrapButtons.fire(
                'Supprimé',
                'Le produit a été supprimé !',
                'success'
            )
            Clear();
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Annulé',
                'Tout est intact',
                'error'
            )
        }
    })
}


/*
document.getElementById("form").addEventListener("submit", (e) => {
    //Récupération des datas du produit renseigné
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    //var legend_P1 = document.getElementById("legend_P1").value;
    //var short_legend = document.getElementById("short_legend").value;
    //var descriptive = document.getElementById("descriptive").value;
    //var price = document.getElementById("price").value;
    //var quantity = document.getElementById("quantity").value;
    //var categorie = document.getElementById("categ").value;
    e.preventDefault();
    createProduct(id, name);
    form.reset();
});
*/


/*
function addProduct() {
    if (controleCharacter() == 1) {
        console.log("C'est interdit !");
        location.reload();
        return;
    }


        //Récupération des datas du produit renseigné
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var legend_P1 = document.getElementById("legend_P1").value;
        var short_legend = document.getElementById("short_legend").value;
        var descriptive = document.getElementById("descriptive").value;
        var price = document.getElementById("price").value;
        var quantity = document.getElementById("quantity").value;
        //var categorie = document.getElementById("categ").value;


    //Mise des datas dans un array
    var new_product = {
        id: id,
        name: name,
        legend_P1: legend_P1,
        short_legend: short_legend,
        descriptive: descriptive,
        price: price,
        quantity: quantity
    };

    //Ajout à la Base de données
    var storage = JSON.parse(localStorage.bddproducts);
    console.log(storage);
    storage.push(new_product);
    var str_json = JSON.stringify(storage);
    localStorage.setItem("bddproducts", str_json);
    console.log(str_json);
}
*/

/*
function createProduct(id, name) {


    var new_product = {
        id: id,
        name: name
    };

    let db = firebase.firestore().collection("products/");
    db.add(new_product).then(() => {
        Swal.fire(
            'Good Job!',
            'Product Added!',
            'Success'
        );
        alert("Success!");
        document.getElementById("cardSection").innerHTML = '';
        readProduct();
    })
}
*/

/*
function readProduct() {
    firebase.firestore().collection("products/").onSnapshot(function (snapshot) {
        document.getElementById("cardSection").innerHTML = '';
        snapshot.forEach(function (productValue) {
            document.getElementById("cardSection").innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${productValue.data().id}</h5>
                        <p class="card-text">${productValue.data().name}</p>
                        <button type="submit" style="color:white" class="btn btn-warning" onclick="updateProduct('${productValue.id}','${productValue.data().id}','${productValue.data().name}')"><i class="fas fa-edit"></i>Edit Product</button>
                        <button type="submit" class="btn btn-danger" onclick="deleteProduct('${productValue.id}')"><i class="fas fa-trash-alt"></i>Delete Product</button>
                    </div>
                </div>
            `
        });
    });
}
*/

/*
function reset() {
    document.getElementById("firstSection").innerHTML = `
        <form class="border p-4 mb-4" id="form">
            <div class="form-group">
                <label>id</label>
                <input type="text" class="form-control" id="id" placeholder="Enter Id"></input>
            </div>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Name"></input>
            </div>
            <button type="submit" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i>ADD TASK</button>
            <button style="display: none" id="button2" class="btn btn-success"><i class="fas fa-plus"></i>UPDATE TASK</button>
            <button style="display: none" id="button3" class="btn btn-danger"><i class="fas fa-plus"></i>CANCEL</button>
        </form>
    `;

    document.getElementById("form").addEventListener("submit", (e) => {
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        e.preventDefault();
        createProduct(id, name);
        form.reset();
    });
}
*/

/*
function updateProduct(id, name) {
    document.getElementById("firstSection").innerHTML = `
        <form class="border p-4 mb-4" id="form2">
            <div class="form-group">
                <label>id</label>
                <input type="text" class="form-control" id="id" placeholder="Enter Id"></input>
            </div>
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="form-control" id="name" placeholder="Enter Name"></input>
            </div>

            <button style="display: none" id="button1" class="btn btn-primary">ADD PRODUCT</button>
            <button type="submit" style="display: inline-block" id="button2" class="btn btn-success"><i class="fas fa-sync"></i>Update Product</button>
            <button style="display: inline-block" id="button3" class="btn btn-danger"><i class="fas fa-ban"></i>Cancel</button>
        </form>`;

    document.getElementById("form2").addEventListener("submit", (e) => {
        e.preventDefault();
    });
    document.getElementById("button3").addEventListener("click", (e) => {
        reset();
    });
    document.getElementById("button2").addEventListener("click", (e) => {
        updateProduct2(id, document.getElementById("id").value, document.getElementById("name").value);
    });
    document.getElementById("id").value = id;
    document.getElementById("name").value = name;
}
*/

/*
function updateProduct2(id, name) {
    var productUpdated = {
        id: id,
        name: name
    }
    let db = firebase.firestore().collection("products/").doc(id);
    db.set(productUpdated).then(() => {
        Swal.fire(
            'Good Job!',
            'Product Updated!',
            'Success'
        )
    })
    document.getElementById("cardSection").innerHTML = '';
    readProduct();
    reset();
}
*/

/*
function deleteProduct(id) {
    firebase.firestore().collection("products/").doc(id).delete().then(() => {
        Swal.fire(
            'Good Job!',
            'Product Removed!',
            'Success'
        )
    })
    reset();
    document.getElementById("cardSection").innerHTML = '';
    readProduct();
}
*/