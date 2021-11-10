var fs = require('fs');
var jsObfuscator = require('javascript-obfuscator');

/*
Commande pour lancer le process dans le terminal
node js/ObfuscaterUtil.js

Pour chaque fichier js :
./OriginalJS/addproduct.js
./js/addproduct-obf.js

./OriginalJS/addcategorie.js
./js/addcategorie-obf.js

./OriginalJS/addsupplier.js
./js/addsupplier-obf.js

./OriginalJS/bddproduct.js
./js/bddproduct-obf.js

./OriginalJS/bddcategorie.js
./js/bddcategorie-obf.js

./OriginalJS/bddsupplier.js
./js/bddsupplier-obf.js

./OriginalJS/captcha.js
./js/captcha-obf.js

./OriginalJS/cookie.js
./js/cookie-obf.js

./OriginalJS/data.js
./js/data-obf.js

./OriginalJS/gen_dyna.js
./js/gen_dyna-obf.js

./OriginalJS/panier.js
./js/panier-obf.js

./OriginalJS/valid.js
./js/valid-obf.js
*/


fs.readFile("./OriginalJS/addproduct.js", "utf-8", function (error, code) {
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

fs.readFile("./OriginalJS/captcha.js", "utf-8", function (error, code) {
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

fs.readFile("./OriginalJS/cookie.js", "utf-8", function (error, code) {
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

fs.readFile("./OriginalJS/data.js", "utf-8", function (error, code) {
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

fs.readFile("./OriginalJS/gen_dyna.js", "utf-8", function (error, code) {
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

fs.readFile("./OriginalJS/panier.js", "utf-8", function (error, code) {
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

fs.readFile("./OriginalJS/valid.js", "utf-8", function (error, code) {
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

fs.readFile("./OriginalJS/bddproduct.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/bddproduct-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated bddproduct is ready !");
    })
})

fs.readFile("./OriginalJS/addsupplier.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/addsupplier-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated addsupplier is ready !");
    })
})

fs.readFile("./OriginalJS/bddsupplier.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/bddsupplier-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated bddsupplier is ready !");
    })
})

fs.readFile("./OriginalJS/addcategorie.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/addcategorie-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated addcategorie is ready !");
    })
})

fs.readFile("./OriginalJS/bddcategorie.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/bddcategorie-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated bddcategorie is ready !");
    })
})

fs.readFile("./OriginalJS/cryptoJS.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/cryptoJS-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated cryptoJS is ready !");
    })
})

fs.readFile("./OriginalJS/crypto.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/crypto-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated crypto is ready !");
    })
})

fs.readFile("./OriginalJS/index.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/index-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated index is ready !");
    })
})

fs.readFile("./OriginalJS/categorie.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/categorie-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated categorie is ready !");
    })
})

fs.readFile("./OriginalJS/firesrc.js", "utf-8", function (error, code) {
    if (error) {
        throw error;
    }
    var obfuscateResult = jsObfuscator.obfuscate(code);
    fs.writeFile("./js/firesrc-obf.js", obfuscateResult.getObfuscatedCode(), function (fsError) {
        if (fsError) {
            return console.log(fsError);
        }
        console.log("Your obfuscated firesrc is ready !");
    })
})