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

//Récupération des datas du fournisseur renseigné
var idF, nameF, info1F, info2F, adressF, pricePF;
function Ready() {
    idF = document.getElementById("id").value;
    nameF = document.getElementById("name").value;
    info1F = document.getElementById("info1").value;
    info2F = document.getElementById("info2").value;
    adressF = document.getElementById("adress").value;
    pricePF = document.getElementById("price").value;

}

//Clear
function Clear() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("info1").value = "";
    document.getElementById("info2").value = "";
    document.getElementById("adress").value = "";
    document.getElementById("price").value = "";
}

//Ajout d'un fournisseur
document.getElementById("AddSupplier").onclick = function () {
    Ready();
    firebase.database().ref("suppliers/" + idF).set({
        id: idF,
        nom: nameF,
        info1: info1F,
        info2: info2F,
        adresse: adressF,
        prix: pricePF
    });
    Swal.fire({
        title: 'Bravo !',
        text: 'Votre fournisseur a été ajouté !',
        icon: 'success',
        confirmButtonText: 'Cool'
    });
    Clear();
}

//Sélection d'un fournisseur
document.getElementById("SelectSupplier").onclick = function () {
    Ready();
    firebase.database().ref("suppliers/" + idF).on('value', function (snapshot) {
        if (snapshot.val() == null || idF == "") {
            Swal.fire({
                title: '???',
                text: "Ce fournisseur n'existe pas !",
                icon: 'error',
                confirmButtonText: 'Où me suis-je trompé ?'
            });
        }
        else {
            document.getElementById("id").value = snapshot.val().id;
            document.getElementById("name").value = snapshot.val().nom;
            document.getElementById("info1").value = snapshot.val().info1;
            document.getElementById("info2").short_legend = snapshot.val().info2;
            document.getElementById("adress").value = snapshot.val().adresse;
            document.getElementById("price").value = snapshot.val().prix;

            Swal.fire({
                title: 'Voilà !',
                text: 'Votre fournisseur',
                icon: 'info',
                confirmButtonText: 'Continuer'
            });
        }
    });
}

//MAJ d'un fournisseur
document.getElementById("UpdateSupplier").onclick = function () {
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
            firebase.database().ref("suppliers/" + idF).update({
                id: idF,
                nom: nameF,
                info1: info1F,
                info2: info2F,
                adresse: adressF,
                prix: pricePF
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


//Suppression d'un fournisseur
document.getElementById("DeleteSupplier").onclick = function () {
    Ready();

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Êtes-vous certain de vouloir supprimer ce fournisseur ?',
        text: "C'est irréversible !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprime le !',
        cancelButtonText: 'Non, annule tout !',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            firebase.database().ref("suppliers/" + idF).remove();
            swalWithBootstrapButtons.fire(
                'Supprimé',
                'Le fournisseur a été supprimé !',
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
