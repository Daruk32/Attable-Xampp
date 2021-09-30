var fs = require('fs');
var jsObfuscator = require('javascript-obfuscator');


fs.readFile("./js/addproduct.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/addproduct-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated addproduct is ready !");
    })
})

fs.readFile("./js/article.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/article-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated article is ready !");
    })
})

fs.readFile("./js/captcha.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/captcha-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated captcha is ready !");
    })
})

fs.readFile("./js/cookie.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/cookie-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated cookie is ready !");
    })
})

fs.readFile("./js/data.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/data-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated data is ready !");
    })
})

fs.readFile("./js/gen_dyna.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/gen_dyna-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated gen_dyna is ready !");
    })
})

fs.readFile("./js/panier.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/panier-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated panier is ready !");
    })
})

fs.readFile("./js/valid.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/valid-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated valid is ready !");
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
