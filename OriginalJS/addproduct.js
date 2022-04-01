/*
Auteur : Johan GIROUX
2020-2021
Dernière MAJ : 30/10/2021
V2.9
*/


//Insertion de la date de la MAJ de la BDD
// function BddMaj() {
//     var today = new Date();
//     var idD = today.getFullYear().toString() + (today.getMonth() + 1).toString() + today.getDate().toString() + today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();
//     var dateMaj = today.toString();
//     firebase.database().ref('DateMaj/' + idD).set({
//         IDD: idD,
//         Date: dateMaj
//     });
// }


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


//Process valeurs catégories
var select = document.getElementById("categ");
var categoryArray = new Array;
firebase.database().ref("categories/").on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
        var item_id = childSnapshot.val().idC;
        var item_name = childSnapshot.val().nom;
        categoryArray[item_id] = item_name;
    });
    for (index in categoryArray) {
        select.options[select.options.length] = new Option(categoryArray[index], index);
    }
});


//Process valeurs des références produits
select.addEventListener("change", function () {
    // Récupération de la valeur sélectionnée de la catégorie
    const referenceSelected = this.options[this.selectedIndex].innerHTML;

    // Tableau des références de la catégorie
    var referenceProductArray = [];
    // Initialisation de l'index du même tableau
    var indexreferenceProductArray = 0;

    // Insertion des références de la catégorie sélectionnée dans le tableau
    firebase.database().ref("products/").on('value', function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            if (childSnapshot.val().category == referenceSelected) {
                var itemReferenceSelected = childSnapshot.val().id;
                var nameReferenceSelected = childSnapshot.val().libelle;
                referenceProductArray[indexreferenceProductArray] = itemReferenceSelected + " - " + nameReferenceSelected;
                indexreferenceProductArray++;

                document.getElementById("myimg").src = childSnapshot.val().Link;
                document.getElementById("name").value = childSnapshot.val().libelle;
                document.getElementById("legend_P1").value = childSnapshot.val().texte;
                document.getElementById("short_legend").value = childSnapshot.val().short_legend;
                document.getElementById("descriptive").value = childSnapshot.val().descriptive;
                document.getElementById("price").value = childSnapshot.val().prix;
                document.getElementById("quantity").value = childSnapshot.val().quantity;
                for (let i = 0; i < select.length; i++) {
                    if (childSnapshot.val().category == select[i].text) {
                        select.selectedIndex = i;
                    }
                }
            }
        });

        // Insertion des valeurs du tableau de la catégorie sélectionnée dans le dropdown
        let selectProductDropDown = document.getElementById("dropdownRefProduct");
        selectProductDropDown.length = 0;
        for (index in referenceProductArray) {
            selectProductDropDown.options[selectProductDropDown.options.length] = new Option(referenceProductArray[index], index);
        }

        // Information de la référence libre suivante pour la catégorie sélectionnée
        document.getElementById("id").placeholder = parseFloat(referenceProductArray.at(-1)) + 1;
        document.getElementById("id").value = "";
    });
});




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
    if (document.getElementById("categ").options[document.getElementById("categ").selectedIndex] != undefined) {
        categorieP = document.getElementById("categ").options[document.getElementById("categ").selectedIndex].text;
    }
    else {
        categorieP = "";
    }
}


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
    document.getElementById("categ").value = "test";
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
            });
        });


    Swal.fire({
        title: 'Bravo !',
        text: 'Votre produit a été ajouté !',
        icon: 'success',
        confirmButtonText: 'Cool'
    });
    // BddMaj();
    Clear();
}



//Sélection d'un produit à partir du bouton
document.getElementById("SelectProduct").onclick = function () {
    Ready();
    firebase.database().ref("products/" + idP).on('value', function (snapshot) {
        // Message d'erreur si problème avec référence produit
        if (snapshot.val() == null || idP == "") {
            Swal.fire({
                title: '???',
                text: "Ce produit n'existe pas !",
                icon: 'error',
                confirmButtonText: 'Où me suis-je trompé ?'
            });
        }
        // Affichage des informations du produit dans les champs
        else {
            document.getElementById("myimg").src = snapshot.val().Link;
            document.getElementById("id").value = snapshot.val().id;
            document.getElementById("name").value = snapshot.val().libelle;
            document.getElementById("legend_P1").value = snapshot.val().texte;
            document.getElementById("short_legend").value = snapshot.val().short_legend;
            document.getElementById("descriptive").value = snapshot.val().descriptive;
            document.getElementById("price").value = snapshot.val().prix;
            document.getElementById("quantity").value = snapshot.val().quantity;
            for (let i = 0; i < select.length; i++) {
                if (snapshot.val().category == select[i].text) {
                    select.selectedIndex = i;
                }
            }

            // Insertion des listes de références existantes
            const referenceSelected2 = select.options[select.selectedIndex].innerHTML;
            // Tableau des références de la catégorie
            var referenceProductArray = [];
            // Initialisation de l'index du même tableau
            var indexreferenceProductArray = 0;
            // Insertion des références de la catégorie sélectionnée dans le tableau
            firebase.database().ref("products/").on('value', function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    if (childSnapshot.val().category == referenceSelected2) {
                        var itemReferenceSelected = childSnapshot.val().id;
                        referenceProductArray[indexreferenceProductArray] = itemReferenceSelected;
                        indexreferenceProductArray++;
                    }
                });
                // Insertion des valeurs du tableau de la catégorie sélectionnée dans le dropdown
                let selectProductDropDown = document.getElementById("dropdownRefProduct");
                selectProductDropDown.length = 0;
                for (index in referenceProductArray) {
                    selectProductDropDown.options[selectProductDropDown.options.length] = new Option(referenceProductArray[index], index);
                }
            });

            // Message de confirmation
            Swal.fire({
                title: 'Voilà !',
                text: 'Votre produit',
                icon: 'info',
                confirmButtonText: 'Continuer'
            });
        }
    });
}
//Sélection d'un produit à partir du dropdown des références
var dropdownReferences = document.getElementById("dropdownRefProduct");
dropdownReferences.addEventListener("change", function () {
    const valueReference = parseFloat(this.options[this.selectedIndex].innerHTML);
    document.getElementById("id").value = valueReference;
    Ready();
    firebase.database().ref("products/" + valueReference).on('value', function (snapshot) {
        // Message d'erreur si problème avec référence produit
        if (snapshot.val() == null || idP == "") {
            Swal.fire({
                title: '???',
                text: "Ce produit n'existe pas !",
                icon: 'error',
                confirmButtonText: 'Où me suis-je trompé ?'
            });
        }
        // Affichage des informations du produit dans les champs
        else {
            document.getElementById("myimg").src = snapshot.val().Link;
            document.getElementById("id").value = valueReference;
            document.getElementById("name").value = snapshot.val().libelle;
            document.getElementById("legend_P1").value = snapshot.val().texte;
            document.getElementById("short_legend").value = snapshot.val().short_legend;
            document.getElementById("descriptive").value = snapshot.val().descriptive;
            document.getElementById("price").value = snapshot.val().prix;
            document.getElementById("quantity").value = snapshot.val().quantity;
            for (let i = 0; i < select.length; i++) {
                if (snapshot.val().category == select[i].text) {
                    select.selectedIndex = i;
                }
            };

            // Message de confirmation
            Swal.fire({
                title: 'Voilà !',
                text: 'Votre produit',
                icon: 'info',
                confirmButtonText: 'Continuer'
            });
        }
    });
});


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
    });
    // BddMaj();
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
    });
    // BddMaj();
}
