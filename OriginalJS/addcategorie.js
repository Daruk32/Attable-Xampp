/*
Auteur : Johan GIROUX
2020-2021
Dernière MAJ : 30/10/2021
V2.9
*/


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

var categoryArray = new Array;
//Process valeurs catégories
firebase.database().ref("categories/").on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var item_id = childSnapshot.val().idC;
        var item_name = childSnapshot.val().nom;
        categoryArray[item_id] = item_name;
    });
    var select = document.getElementById("categ");
    for (index in categoryArray) {
        select.options[select.options.length] = new Option(categoryArray[index], index);
    }
});



document.getElementById("categ").onclick = function () {
    if (document.getElementById("categ").options[document.getElementById("categ").selectedIndex] != undefined) {
        document.getElementById("nameCategorie").value = document.getElementById("categ").options[document.getElementById("categ").selectedIndex].text;
        firebase.database().ref("categories/" + document.getElementById("categ").options[document.getElementById("categ").selectedIndex].text).on('value', function (snapshot) {
            document.getElementById("myimg").src = snapshot.val().Link;
            document.getElementById("idCategorie").value = snapshot.val().idC;
            document.getElementById("categorieValue").value = snapshot.val().valeur;
        });
    }
    else {
        categorieP = "";
    }
}




// Récupération des datas de la catégorie renseignée
var ImgName, idCategorieC, nameCategorieC, categorieValueC;
function Ready() {
    ImgName = document.getElementById('namebox').value;
    idCategorieC = document.getElementById("idCategorie").value;
    nameCategorieC = document.getElementById("nameCategorie").value;
    categorieValueC = document.getElementById("categorieValue").value;
}

// Clear
function Clear() {
    document.getElementById('namebox').value = "";
    document.getElementById('myimg').src = 'images/promo.png';
    document.getElementById("UpProgress").innerHTML = "";
    document.getElementById("idCategorie").value = "";
    document.getElementById("nameCategorie").value = "";
    document.getElementById("categorieValue").value = "";
}

// Ajout d'une catégorie
document.getElementById("AddCategorie").onclick = function () {
    Ready();

    //Process de l'image
    var uploadTask = firebase.storage().ref('images/' + nameCategorieC + ".png").put(files[0]);
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

                firebase.database().ref('categories/' + nameCategorieC).set({
                    Link : ImgUrl,
                    idC: idCategorieC,
                    nom: nameCategorieC,
                    valeur: categorieValueC
                });
            }
            );
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
    firebase.database().ref("categories/" + nameCategorieC).on('value', function (snapshot) {
        if (snapshot.val() == null || nameCategorieC == "") {
            Swal.fire({
                title: '???',
                text: "Cette catégorie n'existe pas !",
                icon: 'error',
                confirmButtonText: 'Où me suis-je trompé ?'
            });
        }
        else {
            document.getElementById("myimg").src = snapshot.val().Link;
            document.getElementById("idCategorie").value = snapshot.val().idC;
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
            var uploadTask = firebase.storage().ref('images/' + nameCategorieC + ".png").put(files[0]);
            uploadTask.snapshot.ref.getDownloadURL().then(function (url) {
                ImgUrl = url;
                firebase.database().ref('categories/' + nameCategorieC).set({
                    Link: ImgUrl,
                    idC: idCategorieC,
                    nom: nameCategorieC,
                    valeur: categorieValueC
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
            firebase.database().ref("categories/" + nameCategorieC).remove();
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