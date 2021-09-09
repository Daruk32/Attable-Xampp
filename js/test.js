var test = 2;
var tab_test = new Array();

for (let i=0; i<4; i++) {
    var entre = test+i;
    tab_test.push(entre);
}
console.log(tab_test);

window.test = function test() {
    var divtest = document.getElementById('gentest');
    for (let i=0; i<4; i++) {
        var acat = document.createElement('div');
        acat.innerHTML = tab_test[i];
        divtest.appendChild(acat);
    }
}