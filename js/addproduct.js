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