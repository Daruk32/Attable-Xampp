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
var idP, libelleP, legend_P1P, short_legendP, descriptiveP, priceP, quantityP, categorieP;
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