var _0x4c7598=_0x42c1;(function(_0x909e59,_0xde9542){var _0x96e882=_0x42c1,_0x56882a=_0x909e59();while(!![]){try{var _0x153649=parseInt(_0x96e882(0x1d8))/0x1*(-parseInt(_0x96e882(0x1c7))/0x2)+parseInt(_0x96e882(0x1ca))/0x3+-parseInt(_0x96e882(0x1eb))/0x4*(-parseInt(_0x96e882(0x1c4))/0x5)+parseInt(_0x96e882(0x1e5))/0x6*(parseInt(_0x96e882(0x1d9))/0x7)+parseInt(_0x96e882(0x1c9))/0x8+parseInt(_0x96e882(0x1e4))/0x9+-parseInt(_0x96e882(0x1c5))/0xa*(parseInt(_0x96e882(0x1e7))/0xb);if(_0x153649===_0xde9542)break;else _0x56882a['push'](_0x56882a['shift']());}catch(_0x1986ab){_0x56882a['push'](_0x56882a['shift']());}}}(_0x58b4,0x9d083));function _0x42c1(_0x24c2fa,_0x230029){var _0x58b4d3=_0x58b4();return _0x42c1=function(_0x42c16d,_0x51410b){_0x42c16d=_0x42c16d-0x1c2;var _0x5e4138=_0x58b4d3[_0x42c16d];return _0x5e4138;},_0x42c1(_0x24c2fa,_0x230029);}function _0x58b4(){var _0x484de3=['6947744QilUmc','1685094gmIbMi','onload','type','attable-51633','createElement','getElementById','innerHTML','once','https://attable-51633-default-rtdb.europe-west1.firebasedatabase.app','setAttribute','authentification.html','reload','attable-51633.firebaseapp.com','text-center','176917xhGeUh','12271FUbpIx','255390814899','libelle','forEach','1:255390814899:web:714ec5ace61cd6479796c6','database','ref','input','prix','Remove','javascript:void(0)','3256713XzYxba','2718xYwbmL','href','11080927jVAvOC','auth','G-2DZWXDMSY6','initializeApp','8oOpksO','quantity','val','appendChild','title','className','onAuthStateChanged','replace','621755ExhqtV','20cLGxCT','tbody1','2vzkYvn','products'];_0x58b4=function(){return _0x484de3;};return _0x58b4();}const firebaseConfig={'apiKey':'AIzaSyBojMuKZJSJBC-O6JRkI9UmbjErGka1b1E','authDomain':_0x4c7598(0x1d6),'projectId':_0x4c7598(0x1cd),'databaseURL':_0x4c7598(0x1d2),'storageBucket':'attable-51633.appspot.com','messagingSenderId':_0x4c7598(0x1da),'appId':_0x4c7598(0x1dd),'measurementId':_0x4c7598(0x1e9)};firebase[_0x4c7598(0x1ea)](firebaseConfig);var ref,nom,price,quantities;function SelectAllData(){var _0x304faa=_0x4c7598;firebase[_0x304faa(0x1de)]()[_0x304faa(0x1df)](_0x304faa(0x1c8))[_0x304faa(0x1d1)]('value',function(_0x2be3e0){var _0x275554=_0x304faa;_0x2be3e0[_0x275554(0x1dc)](function(_0x10ce74){var _0x58acc2=_0x275554;ref=_0x10ce74[_0x58acc2(0x1ed)]()['id'],nom=_0x10ce74[_0x58acc2(0x1ed)]()[_0x58acc2(0x1db)],price=_0x10ce74[_0x58acc2(0x1ed)]()[_0x58acc2(0x1e1)],quantities=_0x10ce74['val']()[_0x58acc2(0x1ec)],AddItemsToTable(ref,nom,price,quantities);});});}window[_0x4c7598(0x1cb)]=SelectAllData;function AddItemsToTable(_0x5a272f,_0x2515c0,_0x12f8c6,_0xdd55d0){var _0x4eddc5=_0x4c7598,_0x21e94c=document[_0x4eddc5(0x1cf)](_0x4eddc5(0x1c6)),_0x50d009=document['createElement']('tr'),_0xd3d114=document['createElement'](_0x4eddc5(0x1e0));_0xd3d114[_0x4eddc5(0x1d3)](_0x4eddc5(0x1cc),'checkbox');var _0x5702c4=document[_0x4eddc5(0x1ce)]('td');_0x5702c4[_0x4eddc5(0x1f0)]=_0x4eddc5(0x1d7);var _0x4c7877=document[_0x4eddc5(0x1ce)]('td'),_0x53ae94=document[_0x4eddc5(0x1ce)]('td');_0x53ae94[_0x4eddc5(0x1f0)]='text-center';var _0x5cddae=document[_0x4eddc5(0x1ce)]('td');_0x5cddae['className']=_0x4eddc5(0x1d7);var _0x367a06=document[_0x4eddc5(0x1ce)]('td');_0x367a06[_0x4eddc5(0x1f0)]=_0x4eddc5(0x1d7);var _0x3cec80=document[_0x4eddc5(0x1ce)]('td'),_0x285a26=document[_0x4eddc5(0x1ce)]('a');_0x285a26[_0x4eddc5(0x1f0)]='text-center\x20remove',_0x285a26[_0x4eddc5(0x1ef)]=_0x4eddc5(0x1e2),_0x3cec80[_0x4eddc5(0x1ee)](_0x285a26);var _0x365371=document[_0x4eddc5(0x1ce)]('i');_0x3cec80[_0x4eddc5(0x1f0)]='fa\x20fa-trash',_0x3cec80[_0x4eddc5(0x1e6)]=_0x4eddc5(0x1e3),_0x285a26['appendChild'](_0x365371),_0x5702c4['innerHTML']=_0x5a272f,_0x4c7877[_0x4eddc5(0x1d0)]=_0x2515c0,_0x53ae94['innerHTML']=_0x12f8c6,_0x5cddae[_0x4eddc5(0x1d0)]=_0xdd55d0,_0x50d009[_0x4eddc5(0x1ee)](_0xd3d114),_0x50d009[_0x4eddc5(0x1ee)](_0x5702c4),_0x50d009[_0x4eddc5(0x1ee)](_0x4c7877),_0x50d009['appendChild'](_0x53ae94),_0x50d009[_0x4eddc5(0x1ee)](_0x5cddae),_0x50d009[_0x4eddc5(0x1ee)](_0x367a06),_0x50d009['appendChild'](_0x3cec80),_0x21e94c[_0x4eddc5(0x1ee)](_0x50d009);}firebase[_0x4c7598(0x1e8)]()[_0x4c7598(0x1c2)](_0x31f41e=>{var _0x216bb1=_0x4c7598;!_0x31f41e&&location[_0x216bb1(0x1c3)](_0x216bb1(0x1d4));});function Maj(){var _0xb176e0=_0x4c7598;location[_0xb176e0(0x1d5)]();}