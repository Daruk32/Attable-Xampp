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
    /*    
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    databaseURL: process.env.VUE_APP_DB_URL,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
    measurementId: process.env.VUE_APP_MEASUREMENT_ID
    */
};
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        location.replace("authentification.html")
    }
});


//Process Image
var ImgName, ImgUrl;
var files = [];
var reader;
//Fonction Select Image
document.getElementById("namebox").onclick = function (e) {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function () {
            document.getElementById("myimg").src = reader.result;
        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}


//Récupération des datas du produit renseigné
var idP, libelleP, legend_P1P, short_legendP, descriptiveP, priceP, quantityP, categorieP;
function Ready() {
    ImgName = document.getElementById('namebox').value;
    idP = document.getElementById("id").value;
    libelleP = document.getElementById("name").value;
    legend_P1P = document.getElementById("legend_P1").value;
    short_legendP = document.getElementById("short_legend").value;
    descriptiveP = document.getElementById("descriptive").value;
    priceP = document.getElementById("price").value;
    quantityP = document.getElementById("quantity").value;
    categorieP = document.getElementById("categ").value;
}


//Process valeurs catégories
firebase.database().ref("categories/").on('value', function (snapshot) {
    var returnArr = [];
    var categoryArray = new Array;
    snapshot.forEach(function (childSnapshot) {
        var item_id = childSnapshot.val().idC;
        var item_name = childSnapshot.val().nom;
        categoryArray[item_id] = item_name;
    });
    console.log(categoryArray);
    var select = document.getElementById("categ");
    for (index in categoryArray) {
        select.options[select.options.length] = new Option(categoryArray[index], index);
    }
});


//Clear
function Clear() {
    document.getElementById('namebox').value = "";
    document.getElementById('myimg').src = 'images/promo.png';
    document.getElementById("UpProgress").innerHTML = "";
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("legend_P1").value = "";
    document.getElementById("short_legend").value = "";
    document.getElementById("descriptive").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("categ").value = "";
}

//Ajout d'un produit
document.getElementById("AddProduct").onclick = function () {
    Ready();

    //Process de l'image
    var uploadTask = firebase.storage().ref('images/' + idP + ".png").put(files[0]);
    uploadTask.on('state_changed', function (snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById('UpProgress').innerHTML = 'Upload' + progress + '%';
    },
        function (error) {
            alert('Error in saving the image !');
        },

        function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                ImgUrl = url;

                firebase.database().ref('products/' + idP).set({
                    Link: ImgUrl,
                    id: idP,
                    libelle: libelleP,
                    texte: legend_P1P,
                    short_legend: short_legendP,
                    descriptive: descriptiveP,
                    prix: priceP,
                    quantity: quantityP,
                    category: categorieP
                });
            }
            );
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
            document.getElementById("myimg").src = snapshot.val().Link;
            document.getElementById("id").value = snapshot.val().id;
            document.getElementById("name").value = snapshot.val().libelle;
            document.getElementById("legend_P1").value = snapshot.val().texte;
            document.getElementById("short_legend").short_legend = snapshot.val().short_legend;
            document.getElementById("descriptive").value = snapshot.val().descriptive;
            document.getElementById("price").value = snapshot.val().prix;
            document.getElementById("quantity").value = snapshot.val().quantity;
            document.getElementById("categ").value = snapshot.val().category;
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
            var uploadTask = firebase.storage().ref('images/' + idP + ".png").put(files[0]);
            uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                ImgUrl = url;
                firebase.database().ref('products/' + idP).set({
                    Link: ImgUrl,
                    id: idP,
                    libelle: libelleP,
                    texte: legend_P1P,
                    short_legend: short_legendP,
                    descriptive: descriptiveP,
                    prix: priceP,
                    quantity: quantityP,
                    category: categorieP
                });
                swalWithBootstrapButtons.fire(
                    'Modifié !',
                    'Les modifications sont enregistrées !',
                    'success'
                )
            });
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