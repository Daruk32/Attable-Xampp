/*
Auteur : Johan GIROUX
2020-2021
Dernière MAJ : 30/10/2021
V2.9
*/


// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCRpXRP0D_MuPqyuUOG491w1SANIc6lVL8",
    authDomain: "attable-6578b.firebaseapp.com",
    databaseURL: "https://attable-6578b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "attable-6578b",
    storageBucket: "attable-6578b.appspot.com",
    messagingSenderId: "1061243206959",
    appId: "1:1061243206959:web:ee2f97b4777e626a1975da"
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
