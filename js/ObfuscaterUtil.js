var fs = require('fs');
var jsObfuscator = require('javascript-obfuscator');


fs.readFile("./js/valid.js", "utf-8", function(error, code){
    if(error) {
        throw error;
    }

    var obfuscateResult = jsObfuscator.obfuscate(code);

    fs.writeFile("./js/valid-obf.js", obfuscateResult.getObfuscatedCode(), function(fsError){
        if(fsError) {
            return console.log(fsError);
        }

        console.log("Your obfuscated file is ready !");
    })
})

/*
Commande pour lancer le process dans le terminal
node js/ObfuscaterUtil.js

Pour chaque fichier js :
./js/addproduct.js
./js/addproduct-obf.js

./js/article.js
./js/article-obf.js

./js/captcha.js
./js/captcha-obf.js

./js/cookie.js
./js/cookie-obf.js

./js/data.js
./js/data-obf.js

./js/gen_dyna.js
./js/gen_dyna-obf.js

./js/panier.js
./js/panier-obf.js

./js/valid.js
./js/valid-obf.js
*/