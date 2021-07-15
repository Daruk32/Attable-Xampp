import {tab_categorie} from '../js/gen_dyna.js'
import {tabtitre} from '../js/gen_dyna.js'


//Création de la classe article pour appliquer une pure méthode objet à tous les produits enregistrés
class article {
    constructor (id, url, libelle, prix, texte, quantity, category) {
        article.id= id;
        article.url= url;
        article.libelle= libelle;
        article.prix= prix;
        article.texte= texte;
        article.quantity= quantity;
        article.category= category;
    }

}

//Génération des produits depuis le tableau tab_categorie en format objet avec ajout de la quantité et de la catégorie
var total_cat = tab_categorie.length;
for (let categ = 0; categ < total_cat; categ++) {
    for (let i = 0; i < tab_categorie[categ].length; i++) {
        var identit = categ*1000+i;
        console.log(identit);
        var quantity = 0;
        new article (identit, tab_categorie[categ][i].url, tab_categorie[categ][i].libelle, tab_categorie[categ][i].prix, tab_categorie[categ][i].texte, quantity, tabtitre[categ]);
        console.log(article);
        

    }
}



article.prototype.newcategory = function() {


}