/*
Auteur : Johan GIROUX
2020-2021
Dernière MAJ : 30/10/2021
V2.9
*/


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

// Récupération des datas de la catégorie renseignée
var idCategorieC, nameCategorieC, categorieValueC;
function Ready() {
    idCategorieC = document.getElementById("idCategorie").value;
    nameCategorieC = document.getElementById("nameCategorie").value;
    categorieValueC = document.getElementById("categorieValue").value;
}

// Clear
function Clear() {
    document.getElementById("idCategorie").value = "";
    document.getElementById("nameCategorie").value = "";
    document.getElementById("categorieValue").value = "";
}

// Ajout d'une catégorie
document.getElementById("AddCategorie").onclick = function () {
    Ready();
    firebase.database().ref("categories/" + idCategorieC).set({
        id: idCategorieC,
        nom: nameCategorieC,
        valeur: categorieValueC
    });
    Swal.fire({
        title: 'Bravo !',
        text: 'Votre catégorie a été ajoutée !',
        icon: 'success',
        confirmButtonText: 'Cool'
    });
    Clear();
}

// Sélection d'une catégorie
document.getElementById("SelectCategorie").onclick = function () {
    Ready();
    firebase.database().ref("categories/" + idCategorieC).on('value', function (snapshot) {
        if (snapshot.val() == null || idCategorie == "") {
            Swal.fire({
                title: '???',
                text: "Cette catégorie n'existe pas !",
                icon: 'error',
                confirmButtonText: 'Où me suis-je trompé ?'
            });
        }
        else {
            document.getElementById("idCategorie").value = snapshot.val().id;
            document.getElementById("nameCategorie").value = snapshot.val().nom;
            document.getElementById("categorieValue").value = snapshot.val().valeur;
            Swal.fire({
                title: 'Voilà !',
                text: 'Votre catégorie',
                icon: 'info',
                confirmButtonText: 'Continuer'
            });
        }
    });
}

// MAJ d'une catégorie
document.getElementById("UpdateCategorie").onclick = function () {
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
            firebase.database().ref("categories/" + idCategorieC).update({
                id: idCategorieC,
                nom: nameCategorieC,
                valeur: categorieValueC
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

// Suppression d'une catégorie
document.getElementById("DeleteCategorie").onclick = function () {
    Ready();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Êtes-vous certain de vouloir supprimer cette catégorie ?',
        text: "C'est irréversible !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprime le !',
        cancelButtonText: 'Non, annule tout !',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            firebase.database().ref("categories/" + idCategorieC).remove();
            swalWithBootstrapButtons.fire(
                'Supprimé',
                'La catégorie a été supprimée !',
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