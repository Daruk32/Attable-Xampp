function add() {
    //Prise des datas du produit
    var id = document.getElementById("id").value;
    var libelle = document.getElementById("libelle").value;
    var legP1 = document.getElementById("legP1").value;
    var sleg = document.getElementById("sleg").value;
    var descrip = document.getElementById("descrip").value;
    var price = document.getElementById("price").value;
    var quantity = document.getElementById("quantity").value;
    //var categorie = document.getElementById("categ").value;

    //Mise des datas dans un array
    var new_product = {
        id: id,
        libelle: libelle,
        legP1: legP1,
        sleg: sleg,
        descrip: descrip,
        price: price,
        quantity: quantity
    };

    //Ajout à la Base de données
    var storage = JSON.parse(localStorage.bddproducts);
    storage.push(new_product);
    var str_json = JSON.stringify(storage);
    localStorage.setItem("bddproducts", str_json);
}